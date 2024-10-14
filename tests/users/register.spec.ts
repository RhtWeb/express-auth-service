import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/config/data-source";
import { DataSource } from "typeorm";
import { truncateTables } from "../utils";
import { User } from "../../src/entity/User";
import { Role } from "../../src/constants";

// describe is used for grouping and also sub grouping
describe("POST /auth/register", () => {
    let connection: DataSource;
    // Before the test suits (all test)
    beforeAll(async () => {
        // Initiallize a DB
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        // truncate the database
        // await truncateTables(connection);
        await connection.dropDatabase();
        await connection.synchronize();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    // happy Path (if all fields are available)
    describe("Given all fields", () => {
        // test("", () => {})
        it("should return the 201 status code", async () => {
            // AAA

            // Arrange
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret",
            };

            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // Assert
            expect(response.statusCode).toBe(201);
        });

        it("should return valid json response", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret",
            };

            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            // to campare objects
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json"),
            );
        });

        it("should persist user data", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret",
            };

            await request(app).post("/auth/register").send(userData);

            const userRepository = connection.getRepository(User);

            const users = await userRepository.find();

            expect(users).toHaveLength(1);
            // ideally one for one test, use anather expect only went highly related
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
        });

        it("should return ID of created user", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret",
            };

            const res = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(res.body.id).toBeDefined();
        });

        it("should assign a customer role", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret",
            };

            await request(app).post("/auth/register").send(userData);

            const userRepository = connection.getRepository(User);

            const users = await userRepository.find();

            expect(users[0]).toHaveProperty("role");
            expect(users[0].role).toBe(Role.CUSTOMER);
        });

        it("should store the hashed password in to the database", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret",
            };

            await request(app).post("/auth/register").send(userData);

            const userRepository = connection.getRepository(User);

            const users = await userRepository.find();

            expect(users[0].password).not.toBe(userData.password);
            expect(users[0].password).toMatch(/^\$2b\$\d+\$/);
        });

        it("should have unique user email", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret",
            };

            const userRepository = connection.getRepository(User);

            await userRepository.save({ ...userData, role: Role.CUSTOMER });

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            const users = await userRepository.find();

            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(1);
        });
    });

    // Sad Path (if fields are missing)
    describe("Fields are missing", () => {
        // validation
        it("should return 400 if email dont exists", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "",
                password: "secret",
            };

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(response.statusCode).toBe(400);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });

        it.todo("should return 400 status code if firstName is missing");
        it.todo("should return 400 status code if lastName is missing");
        it.todo("should return 400 status code if password is missing");
    });

    describe("Fields are not in proper format", () => {
        // Sanitization
        it("should trim the email field", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: " rht@gmail.com ",
                password: "secret",
            };

            await request(app).post("/auth/register").send(userData);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users[0].email).toBe("rht@gmail.com");
        });

        it.todo("should return 400 status code if email is not valid email");
        it.todo(
            "should return 400 status code if password lenght is less than 8 chars",
        );
        it.todo("should return an error array message if email is missing");
    });
});

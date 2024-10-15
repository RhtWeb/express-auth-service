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
                password: "secret1234",
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
                password: "secret1234",
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
                password: "secret1234",
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
                password: "secret1234",
            };

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // expect(response.body.id).toBeDefined();
            expect(response.body).toHaveProperty("id");
            const repository = connection.getRepository(User);
            const users = await repository.find();
            expect(response.body.id).toBe(users[0].id);
        });

        it("should assign a customer role", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret1234",
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
                password: "secret1234",
            };

            await request(app).post("/auth/register").send(userData);

            const userRepository = connection.getRepository(User);

            const users = await userRepository.find({ select: ["password"] });

            expect(users[0].password).not.toBe(userData.password);
            expect(users[0].password).toHaveLength(60);
            expect(users[0].password).toMatch(/^\$2b\$\d+\$/);
        });

        it("should have unique user email", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret1234",
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
                email: "", // email is empty
                password: "secret1234",
            };

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(response.statusCode).toBe(400);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });

        it("should return 400 status code if firstName is missing", async () => {
            const userData = {
                firstName: "", // first name is empty
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret1234",
            };

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(response.statusCode).toBe(400);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });

        it("should return 400 status code if lastName is missing", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "", // lastname is empty
                email: "rht@gmail.com",
                password: "secret1234",
            };

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(response.statusCode).toBe(400);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });

        it("should return 400 status code if password is missing", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "", // password is empty
            };

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(response.statusCode).toBe(400);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });
    });

    describe("Fields are not in proper format", () => {
        // Sanitization
        it("should trim the email field", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: " rht@gmail.com ", // email is not trim
                password: "secret1234",
            };

            await request(app).post("/auth/register").send(userData);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users[0].email).toBe("rht@gmail.com");
        });

        it("should return 400 status code if email is not valid email", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rhtgmail.com", // not valid email
                password: "secret1234",
            };

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(response.statusCode).toBe(400);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });

        it("should return 400 status code if password lenght is less than 8 chars", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                email: "rht@gmail.com",
                password: "secret", // less than 8 chars
            };

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(response.statusCode).toBe(400);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });
        it("should return an error array message if email is missing", async () => {
            const userData = {
                firstName: "Rohit",
                lastName: "Singh",
                password: "secret1234",
            }; // email property is missing

            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            expect(response.body).toHaveProperty("errors");
            expect(
                (response.body as Record<string, string>).errors.length,
            ).toBeGreaterThan(0);
        });
    });
});

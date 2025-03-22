import request from "supertest";
import { DataSource } from "typeorm";
import bcrypt from "bcrypt";

import app from "../../src/app";
import { AppDataSource } from "../../src/config/data-source";
import { User } from "../../src/entity/User";
import { isJwt } from "../utils";
import { Role } from "../../src/constants";

describe("POST /auth/login", () => {
    let connection: DataSource;

    // Initialize the data DB
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        await connection.dropDatabase();
        await connection.synchronize();

        // Registering a user
        const userData = {
            firstName: "Rohit",
            lastName: "Singh",
            email: "rht@gmail.com",
            password: "password",
        };

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const userRepository = connection.getRepository(User);
        await userRepository.save({
            ...userData,
            password: hashedPassword,
            role: Role.CUSTOMER,
        });
        // const userData = {
        //   firstName: "Rohit",
        //   lastName: "Singh",
        //   email: "rht@gmail.com",
        //   password: "password",
        // };

        // // Act
        // await request(app)
        //     .post("/auth/register")
        //     .send(userData);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    describe("Given all fields", () => {
        it("should return 200 status on sucessful login", async () => {
            // Arrange
            const user = {
                email: "rht@gmail.com",
                password: "password",
            };
            // Act
            const response = await request(app).post("/auth/login").send(user);

            const userRepository = AppDataSource.getRepository(User);
            const usersResponse = await userRepository.find();
            // Assert
            expect(response.statusCode).toBe(200);
            // expect(usersResponse).toHaveLength(1);
            expect(usersResponse[0].id).toBe(response.body.id);
        });

        it("should contain valid json", async () => {
            // Arrange
            const user = {
                email: "rht@gmail.com",
                password: "password",
            };
            // Act
            const response = await request(app).post("/auth/login").send(user);

            // Assert
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json"),
            );
        });

        it("should return the 400 if email is incorrect", async () => {
            // Arrange
            const user = {
                email: "wrongEmail@gmail.com",
                password: "password",
            };
            // Act
            const response = await request(app).post("/auth/login").send(user);

            expect(response.statusCode).toBe(400);
        });

        it("should return the 400 if password don't match", async () => {
            // Arrange
            const user = {
                email: "rht@gmail.com",
                password: "wrongPassword",
            };
            // Act
            const response = await request(app).post("/auth/login").send(user);

            expect(response.statusCode).toBe(400);
        });

        it("should return the access token and refresh token inside a cookie", async () => {
            // Arrange
            const user = {
                email: "rht@gmail.com",
                password: "password",
            };
            // Act
            const response = await request(app).post("/auth/login").send(user);

            let accessToken = "";
            let refreshToken = "";
            const cookies = response.get("Set-Cookie") || [];

            cookies.forEach((cookie) => {
                if (cookie.startsWith("accessToken=")) {
                    accessToken = cookie.split(" ")[0].split("=")[1];
                }
                if (cookie.startsWith("refreshToken=")) {
                    refreshToken = cookie.split(" ")[0].split("=")[1];
                }
            });

            expect(accessToken).not.toBe("");
            expect(refreshToken).not.toBe("");

            expect(isJwt(accessToken)).toBeTruthy();
            expect(isJwt(refreshToken)).toBeTruthy();
        });
    });

    describe("fields are missing", () => {
        it("should return 400 status code if email missing or not valid", async () => {
            // Arrange
            const user = {
                email: "",
                password: "password",
            };
            // Act
            const response = await request(app).post("/auth/login").send(user);

            expect(response.statusCode).toBe(400);
        });
        it("should return 400 status code if password missing", async () => {
            // Arrange
            const user = {
                email: "rht@gmail.com",
                password: "",
            };
            // Act
            const response = await request(app).post("/auth/login").send(user);

            expect(response.statusCode).toBe(400);
        });
    });

    describe("Fields are not in proper format", () => {
        // Sanitization
        it("should trim the email field", async () => {
            // Arrange
            const user = {
                email: " rht@gmail.com ",
                password: " password ",
            };
            // Act
            const response = await request(app).post("/auth/login").send(user);

            expect(response.statusCode).toBe(200);
        });
    });
});

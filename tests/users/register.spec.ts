import request from "supertest";
import app from "../../src/app";

// describe is used for grouping and also sub grouping
describe("POST /auth/register", () => {
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
    });

    // Sad Path (if fields are missing)
    // describe("Fields are missing", () => {

    // })
});

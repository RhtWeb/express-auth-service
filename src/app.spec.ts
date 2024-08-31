import request from "supertest";
import app from "./app";

describe("App", () => {
    it("should send status 200", async () => {
        const result = await request(app).get("/").send();

        expect(result.statusCode).toBe(200);
    });
});

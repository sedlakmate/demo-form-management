import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import { createServer } from "../server";

describe("server", () => {
  it("status check returns 200", async () => {
    await supertest(createServer())
      .get("/status")
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });
});

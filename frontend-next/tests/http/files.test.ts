import { getFiles } from "@/app/lib/http/files";
import { server } from "../mocks/server";

describe("Files tests", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("getFiles test", async () => {
    const files = await getFiles("testToken");
    console.log({ files });
  });
});

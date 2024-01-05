import {
  getFiles,
  getFilePreview,
  upload,
  deleteFile,
  updateFilename,
} from "@/app/lib/http/files";
import { server } from "../mocks/server";
import { failHandlers, successHandlers } from "../mocks/handlers";
import { SetupServer } from "msw/node";

describe("Files tests", () => {
  describe("Success files", () => {
    let mockServer: SetupServer;
    beforeAll(() => {
      mockServer = server(successHandlers);
      mockServer.listen();
    });

    afterEach(() => {
      mockServer.resetHandlers();
    });

    afterAll(() => {
      mockServer.close();
    });

    describe("getFiles", () => {
      it("should return empty array", async () => {
        const files = await getFiles("testToken");
        expect(files).not.toBeNull();
        expect(files).toHaveLength(0);
      });
    });

    describe("getFilePreview", () => {
      it("should return dataUrl to file", async () => {
        const dataUrl = await getFilePreview("testToken", "1");
        expect(dataUrl).toContain("blob:nodedata");
      });
    });

    describe("upload", () => {
      beforeAll(() => {
        Object.defineProperty(global, "FileReader", {
          writable: true,
          value: function () {
            return {
              readAsArrayBuffer: function () {
                this.onload({
                  target: {
                    result: new ArrayBuffer(3),
                  },
                });
              },
              onload: jest.fn(),
            };
          },
        });
      });

      it("should return dataUrl to file", async () => {
        const file = new File(["foo"], "foo.txt", {
          type: "text/plain",
        });
        const uploadResult = await upload("testToken", file);
        expect(uploadResult).toBe(true);
      });
    });

    describe("delete", () => {
      it("should return not null", async () => {
        const deleteResult = await deleteFile("testToken", "42");
        expect(deleteResult).not.toBeNull();
      });
    });

    describe("updateFilename", () => {
      it(`shouldn't throw an error`, async () => {
        const updateResult = await updateFilename(
          "testToken",
          "42",
          "foobar.txt"
        );
        expect(updateResult).not.toBe(null);
      });
    });
  });

  describe("Fail files", () => {
    let mockServer: SetupServer;
    beforeAll(() => {
      mockServer = server(failHandlers);
      mockServer.listen();
    });

    afterEach(() => {
      mockServer.resetHandlers();
    });

    afterAll(() => {
      mockServer.close();
    });

    describe("getFiles", () => {
      it("should return null on not 200 status code", async () => {
        const files = await getFiles("testToken");
        expect(files).toBeNull();
      });
    });

    describe("getFilePreview", () => {
      it("should return null on not 200 status code", async () => {
        const dataURL = await getFilePreview("testToken", "1");
        expect(dataURL).toBeNull();
      });
    });

    describe("upload", () => {
      beforeAll(() => {
        Object.defineProperty(global, "FileReader", {
          writable: true,
          value: function () {
            return {
              readAsArrayBuffer: function () {
                this.onload({
                  target: {
                    result: new ArrayBuffer(3),
                  },
                });
              },
              onload: jest.fn(),
            };
          },
        });
      });
      it("should return false on not 200 status code", async () => {
        const file = new File(["bar"], "bar.txt", {
          type: "text/plain",
        });
        expect(upload("testToken", file)).rejects.toBe(false);
      });
    });

    describe("updateFilename", () => {
      let consoleErrorSpy: any;
      beforeAll(() => {
        consoleErrorSpy = jest.spyOn(global.console, "error");
      });

      it("should console.error on error", async () => {
        await updateFilename(
          "testToken",
          "42",
          "foobar.txt"
        );
        expect(consoleErrorSpy).toHaveBeenCalled();
      });
    });
  });
});

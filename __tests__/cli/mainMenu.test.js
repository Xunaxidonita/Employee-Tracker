var stdin = require("mock-stdin").stdin();
const { mainMenu, OPTIONS } = require("../../cli/mainMenu");

describe("mainMenu", () => {
  test("select first option", (done) => {
    mainMenu().then((selected) => {
      expect(selected).toEqual(OPTIONS[0]);
      done();
    });

    stdin.send("\n", "ascii");
  });

  test("select second option", (done) => {
    mainMenu().then((selected) => {
      expect(selected).toEqual(OPTIONS[1]);
      done();
    });

    stdin.send("\u001b[B\n", "ascii");
  });
});

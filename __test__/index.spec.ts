import Main from '../src';

test("version is 0.0.1?", () => {
  const test = Main;
  expect(test()).toBe("this version is 0.0.1");
})
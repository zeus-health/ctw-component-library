import { formatPhoneNumber } from "./formatters";

describe("formatters", () => {
  test("formatPhoneNumber correctly formats phone number", () => {
    const phoneNumber = "1234567890";
    expect(formatPhoneNumber(phoneNumber)).toEqual("123-456-78901");
  });
});

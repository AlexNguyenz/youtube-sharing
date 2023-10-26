import { formatNumber } from "~/utils/formatNumber";

describe("formatNumber", () => {
  test("formats a number with commas", () => {
    const input = "1234567890";
    const result = formatNumber(input);
    expect(result).toBe("1,234,567,890");
  });

  test("handles edge cases", () => {
    const input = "0";
    const result = formatNumber(input);
    expect(result).toBe("0");
  });

  test("handles negative numbers", () => {
    const input = "-1234567890";
    const result = formatNumber(input);
    expect(result).toBe("-1,234,567,890");
  });

  test("handles decimal numbers", () => {
    const input = "1234567.89";
    const result = formatNumber(input);
    expect(result).toBe("1,234,567.89");
  });

  test("handles large numbers", () => {
    const input = "12345678901234567890";
    const result = formatNumber(input);
    expect(result).toBe("12,345,678,901,234,567,890");
  });
});

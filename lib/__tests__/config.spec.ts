import { appendRentalAPIParams } from "@/lib/591House/utils";

test("Should insert additional query params", () => {
  const search = "";

  const result = appendRentalAPIParams(search);

  const params = new URLSearchParams(result);

  expect(params.get("is_format_data")).toBe("1");
  expect(params.get("is_new_list")).toBe("1");
  expect(params.get("type")).toBe("1");

  expect(result).toBe("is_format_data=1&is_new_list=1&type=1");
});

test("Should append additional query params", () => {
  const search = "my_param=1";

  const result = appendRentalAPIParams(search);

  const params = new URLSearchParams(result);

  expect(params.get("is_format_data")).toBe("1");
  expect(params.get("is_new_list")).toBe("1");
  expect(params.get("type")).toBe("1");

  expect(result).toBe("my_param=1&is_format_data=1&is_new_list=1&type=1");
});

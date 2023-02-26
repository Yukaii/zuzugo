import { z } from "zod";

import { rListAPISchema, dataItemSchema, detailItemSchema, baseChildrenItemSchema } from "./zod";

export type RListAPI = z.infer<typeof rListAPISchema>;

export type DataItem = z.infer<typeof dataItemSchema>;

// GET https://bff.591.com.tw/v1/house/rent/detail?id=13959742
export type DetailItem = z.infer<typeof detailItemSchema>;

export type ChildrenItem = z.infer<typeof baseChildrenItemSchema> & {
  children?: ChildrenItem[];
};

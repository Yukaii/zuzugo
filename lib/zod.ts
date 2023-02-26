// Generated by ts-to-zod
import { z } from "zod";

import { ChildrenItem } from "./types";

const bluekaiDataSchema = z.object({
  region_id: z.string(),
  section_id: z.string(),
  sale_price: z.number(),
  rental_price: z.number(),
  unit_price_per_ping: z.string(),
  room: z.string(),
  shape: z.string(),
  mrt_city: z.string(),
  mrt_line: z.string(),
  tag: z.number(),
  type: z.string(),
  kind: z.string(),
  page: z.string(),
});

const seoSchema = z.object({
  title: z.string(),
  keywords: z.string(),
  description: z.string(),
});

const surroundingSchema = z.object({
  type: z.string(),
  desc: z.string(),
  distance: z.string(),
});

const rentTagItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const dataItemSchema = z.object({
  title: z.string(),
  type: z.string(),
  post_id: z.number(),
  kind_name: z.string(),
  room_str: z.string(),
  floor_str: z.string(),
  community: z.string(),
  price: z.string(),
  price_unit: z.string(),
  photo_list: z.array(z.string()),
  section_name: z.string(),
  street_name: z.string(),
  location: z.string(),
  rent_tag: z.array(rentTagItemSchema),
  area: z.string(),
  role_name: z.string(),
  contact: z.string(),
  refresh_time: z.string(),
  yesterday_hit: z.number(),
  is_vip: z.number(),
  is_combine: z.number(),
  hurry: z.number(),
  is_socail: z.number(),
  surrounding: surroundingSchema,
  discount_price_str: z.string(),
  cases_id: z.number(),
  is_video: z.number(),
  preferred: z.number(),
  cid: z.number(),
});

const shareInfoSchema = z.object({
  url: z.string(),
  from: z.string(),
  title: z.string(),
});

const browseSchema = z.object({
  pc: z.number(),
  mobile: z.number(),
});

const publishSchema = z.object({
  id: z.number(),
  name: z.string(),
  key: z.string(),
  postTime: z.string(),
  updateTime: z.string(),
});

const roomsSchema = z.object({
  title: z.string(),
  key: z.string(),
  active: z.number(),
  data: z.array(z.any()),
});

const preferenceSchema = z.object({
  title: z.string(),
  active: z.number(),
  footnote: z.string(),
  data: z.array(dataItemSchema),
});

const remarkSchema = z.object({
  title: z.string(),
  key: z.string(),
  active: z.number(),
  content: z.string(),
});

const houseDetailSchema = z.object({
  title: z.string(),
  key: z.string(),
  active: z.number(),
});

const costDataSchema = z.object({
  title: z.string(),
  active: z.number(),
  data: z.array(dataItemSchema),
});

const infoDataSchema = z.object({
  title: z.string(),
  active: z.number(),
  data: z.array(dataItemSchema),
  hasCertificate: z.number(),
});

const questionDataSchema = z.object({
  title: z.string(),
  key: z.string(),
  active: z.number(),
});

const linkInfoSchema = z.object({
  avatar: z.string(),
  chargeTxt: z.string(),
  name: z.string(),
  role: z.number(),
  roleName: z.string(),
  roleTxt: z.string(),
  certificateStatus: z.number(),
  certificateTxt: z.string(),
  line: z.string(),
  imUid: z.number(),
  imName: z.string(),
  isTransferTel: z.number(),
  mobile: z.string(),
  phone: z.string(),
  uid: z.number(),
  warnmsg: z.number(),
  tips: z.string(),
  shopVolume: z.number(),
  shopStatus: z.number(),
  shopId: z.number(),
  rentNum: z.number(),
  saleNum: z.number(),
  skillCases: z.array(z.any()),
  skillWork: z.array(z.any()),
});

const favDataSchema = z.object({
  thumb: z.string(),
  title: z.string(),
  layout: z.string(),
  address: z.string(),
  price: z.number(),
  area: z.string(),
  kindTxt: z.string(),
  posttime: z.number(),
  count: z.number(),
});

const breadcrumbItemSchema = z.object({
  name: z.string(),
  id: z.number(),
  query: z.string(),
  link: z.string(),
});

const tagsItemSchema = z.object({
  id: z.number(),
  value: z.string(),
});

const navDataItemSchema = z.object({
  title: z.string(),
  key: z.string(),
  active: z.number(),
});

const infoItemSchema = z.object({
  name: z.string(),
  value: z.string(),
  key: z.string(),
});

export const baseChildrenItemSchema = z.object({
  type: z.string().optional(),
  name: z.string(),
  distance: z.number().optional(),
  distanceTxt: z.string().optional(),
  key: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  trading_area_id: z.number().optional(),
  trading_area_distance: z.number().optional(),
});

// https://github.com/colinhacks/zod#recursive-types
const childrenItemSchema: z.ZodType<ChildrenItem> = baseChildrenItemSchema.extend({
  children: z.lazy(() => childrenItemSchema.array().optional()),
});

const mapDataItemSchema = z.object({
  name: z.string(),
  key: z.string(),
  children: z.array(childrenItemSchema),
});

const facilityItemSchema = z.object({
  key: z.string(),
  active: z.number(),
  name: z.string(),
});

const topDataItemSchema = z.object({
  title: z.string(),
  type: z.number(),
  post_id: z.number(),
  price: z.string(),
  price_unit: z.string(),
  photo_list: z.array(z.string()).optional(),
  section_name: z.string(),
  street_name: z.string(),
  rent_tag: z.array(rentTagItemSchema),
  area: z.string(),
  surrounding: surroundingSchema,
  community: z.string(),
  room_str: z.string(),
  is_video: z.number(),
  preferred: z.number(),
});

const serviceSchema = z.object({
  title: z.string(),
  key: z.string(),
  active: z.number(),
  facility: z.array(facilityItemSchema),
  desc: z.string(),
  rule: z.string(),
});

const positionRoundDataItemSchema = z.object({
  name: z.string(),
  key: z.string().optional(),
  children: z.array(childrenItemSchema).optional(),
  id: z.number().optional(),
  text: z.string().optional(),
  icon: z.string().optional(),
  value: z.string().optional(),
  alias: z.string().optional(),
  cate: z.number().optional(),
});

const dataSchema = z.object({
  topData: z.array(topDataItemSchema),
  biddings: z.array(z.any()),
  data: z.array(dataItemSchema),
  page: z.string(),
});

const positionRoundSchema = z.object({
  title: z.string(),
  key: z.string(),
  active: z.number(),
  communityName: z.string(),
  communityId: z.number(),
  address: z.string(),
  lat: z.string(),
  lng: z.string(),
  data: z.array(positionRoundDataItemSchema),
  mapData: z.array(mapDataItemSchema),
});

export const rListAPISchema = z.object({
  status: z.number(),
  data: dataSchema,
  records: z.string(),
  is_recom: z.number(),
  deal_recom: z.array(z.any()),
  online_social_user: z.number(),
  bluekai_data: bluekaiDataSchema,
  recommend: z.array(z.any()),
  seo: seoSchema,
});

export const detailItemSchema = z.object({
  breadcrumb: z.array(breadcrumbItemSchema),
  title: z.string(),
  deposit: z.string(),
  kind: z.number(),
  relieved: z.number(),
  regionId: z.number(),
  sectionId: z.number(),
  shareInfo: shareInfoSchema,
  dealText: z.string(),
  dealTime: z.number(),
  browse: browseSchema,
  tags: z.array(tagsItemSchema),
  price: z.string(),
  priceUnit: z.string(),
  navData: z.array(navDataItemSchema),
  priceCacheTxt: z.string(),
  priceCache: z.array(z.any()),
  info: z.array(infoItemSchema),
  publish: publishSchema,
  rooms: roomsSchema,
  positionRound: positionRoundSchema,
  service: serviceSchema,
  preference: preferenceSchema,
  remark: remarkSchema,
  houseDetail: houseDetailSchema,
  costData: costDataSchema,
  infoData: infoDataSchema,
  questionData: questionDataSchema,
  linkInfo: linkInfoSchema,
  favData: favDataSchema,
});

export interface JSONResponse {
  status: number;
  data: Data;
  records: string;
  is_recom: number;
  deal_recom: any[];
  online_social_user: number;
  bluekai_data: Bluekai_data;
  recommend: any[];
  seo: Seo;
}

interface Data {
  topData: TopDataItem[];
  biddings: any[];
  data: DataItem[];
  page: string;
}

interface TopDataItem {
  title: string;
  type: number;
  post_id: number;
  price: string;
  price_unit: string;
  photo_list: string[];
  section_name: string;
  street_name: string;
  rent_tag: RentTagItem[];
  area: string;
  surrounding: Surrounding;
  community: string;
  room_str: string;
  is_video: number;
  preferred: number;
}

interface RentTagItem {
  id: string;
  name: string;
}

interface Surrounding {
  type: string;
  desc: string;
  distance: string;
}

export interface DataItem {
  title: string;
  type: string;
  post_id: number;
  kind_name: string;
  room_str: string;
  floor_str: string;
  community: string;
  price: string;
  price_unit: string;
  photo_list: any[];
  section_name: string;
  street_name: string;
  location: string;
  rent_tag: RentTagItem[];
  area: string;
  role_name: string;
  contact: string;
  refresh_time: string;
  yesterday_hit: number;
  is_vip: number;
  is_combine: number;
  hurry: number;
  is_socail: number;
  surrounding: Surrounding;
  discount_price_str: string;
  cases_id: number;
  is_video: number;
  preferred: number;
}

interface Bluekai_data {
  region_id: string;
  section_id: string;
  sale_price: number;
  rental_price: number;
  unit_price_per_ping: string;
  room: string;
  shape: string;
  mrt_city: string;
  mrt_line: string;
  tag: number;
  type: string;
  kind: string;
  page: string;
}

interface Seo {
  title: string;
  keywords: string;
  description: string;
}

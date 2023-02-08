export interface RListAPI {
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
  photo_list?: string[];
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
  id: number;
  user_id: number;
  address: string;
  type: string;
  post_id: number;
  regionid: number;
  sectionid: number;
  streetid: number;
  room: number;
  area: number;
  price: string;
  storeprice: number;
  comment_total: number;
  comment_unread: number;
  comment_ltime: number;
  hasimg: number;
  kind: number;
  shape: number;
  houseage: number;
  posttime: string;
  updatetime: number;
  refreshtime: number;
  checkstatus: number;
  status: string;
  closed: number;
  living: string;
  condition: string;
  isvip: number;
  mvip: number;
  is_combine: number;
  cover: string;
  browsenum: number;
  browsenum_all: number;
  floor2: number;
  floor: number;
  ltime: string;
  cases_id: string;
  social_house: number;
  distance: number;
  search_name: string;
  mainarea: null;
  balcony_area: null;
  groundarea: null;
  linkman: string;
  housetype: number;
  street_name: string;
  alley_name: string;
  lane_name: string;
  addr_number_name: string;
  kind_name_img: string;
  address_img: string;
  cases_name: string;
  layout: string;
  layout_str: string;
  roomStr: string;
  allfloor: number;
  floorInfo: string;
  floorStr: string;
  discountPriceStr: string;
  house_img: string;
  houseimg: null;
  cartplace: string;
  space_type_str: string;
  photo_alt: string;
  addition4: number;
  addition2: number;
  addition3: number;
  vipimg: string;
  vipstyle: string;
  vipBorder: string;
  new_list_comment_total: number;
  comment_class: string;
  price_hide: string;
  kind_name: string;
  photoNum: string;
  filename: string;
  nick_name: string;
  role_name: string;
  new_img: string;
  regionname: string;
  sectionname: string;
  icon_name: string;
  icon_class: string;
  fulladdress: string;
  title: string;
  browsenum_name: string;
  unit: string;
  houseid: number;
  region_name: string;
  section_name: string;
  location: string;
  addInfo: string;
  surrounding: Surrounding;
  onepxImg: string;
  is_video: number;
  rentTag?: RentTagItem[];
  preferred: number;
  photoList?: string[];
}

interface Surrounding {
  type: string;
  desc: string;
  distance: string;
}
interface RentTagItem {
  id: string;
  name: string;
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

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
  title: string;
  type: string;
  post_id: number;
  kind_name: string;
  room_str: string;
  floor_str: string;
  community: string;
  price: string;
  price_unit: string;
  photo_list: string[];
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
  cid: number;
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

// GET https://bff.591.com.tw/v1/house/rent/detail?id=13959742

export interface DetailItem {
  breadcrumb: BreadcrumbItem[];
  title: string;
  deposit: string;
  kind: number;
  relieved: number;
  regionId: number;
  sectionId: number;
  shareInfo: ShareInfo;
  dealText: string;
  dealTime: number;
  browse: Browse;
  tags: TagsItem[];
  price: string;
  priceUnit: string;
  navData: NavDataItem[];
  priceCacheTxt: string;
  priceCache: any[];
  info: InfoItem[];
  publish: Publish;
  rooms: Rooms;
  positionRound: PositionRound;
  service: Service;
  preference: Preference;
  remark: Remark;
  houseDetail: HouseDetail;
  costData: CostData;
  infoData: InfoData;
  questionData: QuestionData;
  linkInfo: LinkInfo;
  favData: FavData;
}

interface BreadcrumbItem {
  name: string;
  id: number;
  query: string;
  link: string;
}

interface ShareInfo {
  url: string;
  from: string;
  title: string;
}
interface Browse {
  pc: number;
  mobile: number;
}
interface TagsItem {
  id: number;
  value: string;
}
interface NavDataItem {
  title: string;
  key: string;
  active: number;
}
interface InfoItem {
  name: string;
  value: string;
  key: string;
}
interface Publish {
  id: number;
  name: string;
  key: string;
  postTime: string;
  updateTime: string;
}
interface Rooms {
  title: string;
  key: string;
  active: number;
  data: any[];
}
interface PositionRound {
  title: string;
  key: string;
  active: number;
  communityName: string;
  communityId: number;
  address: string;
  lat: string;
  lng: string;
  data: PositionRoundDataItem[];
  mapData: MapDataItem[];
}
interface PositionRoundDataItem {
  name: string;
  key?: string;
  children?: ChildrenItem[];
  id?: number;
  text?: string;
  icon?: string;
  value?: string;
  alias?: string;
  cate?: number;
}
export interface ChildrenItem {
  type?: string;
  name: string;
  distance?: number;
  distanceTxt?: string;
  key?: string;
  children?: ChildrenItem[];
  lat?: string;
  lng?: string;
  trading_area_id?: number;
  trading_area_distance?: number;
}
interface MapDataItem {
  name: string;
  key: string;
  children: ChildrenItem[];
}
interface Service {
  title: string;
  key: string;
  active: number;
  facility: FacilityItem[];
  desc: string;
  rule: string;
}
interface FacilityItem {
  key: string;
  active: number;
  name: string;
}
interface Preference {
  title: string;
  active: number;
  footnote: string;
  data: DataItem[];
}
interface Remark {
  title: string;
  key: string;
  active: number;
  content: string;
}
interface HouseDetail {
  title: string;
  key: string;
  active: number;
}
interface CostData {
  title: string;
  active: number;
  data: DataItem[];
}
interface InfoData {
  title: string;
  active: number;
  data: DataItem[];
  hasCertificate: number;
}
interface QuestionData {
  title: string;
  key: string;
  active: number;
}
interface LinkInfo {
  avatar: string;
  chargeTxt: string;
  name: string;
  role: number;
  roleName: string;
  roleTxt: string;
  certificateStatus: number;
  certificateTxt: string;
  line: string;
  imUid: number;
  imName: string;
  isTransferTel: number;
  mobile: string;
  phone: string;
  uid: number;
  warnmsg: number;
  tips: string;
  shopVolume: number;
  shopStatus: number;
  shopId: number;
  rentNum: number;
  saleNum: number;
  skillCases: any[];
  skillWork: any[];
}
interface FavData {
  thumb: string;
  title: string;
  layout: string;
  address: string;
  price: number;
  area: string;
  kindTxt: string;
  posttime: number;
  count: number;
}

export interface FacebookGroupPostData {
  qid: string;
  mf_story_key: string;
  top_level_post_id: string;
  tl_objid: string;
  content_owner_id_new: string;
  original_content_id: string;
  original_content_owner_id: string;
  page_id: string;
  src: number;
  photo_id: string;
  story_location: number;
  attached_story_attachment_style: string;
  filter: string;
  ott: string;
  sty: number;
  attached_story_type: string;
  attached_story_attachment_type: string;
  page_insights: Page_insights;
  actrs: string;
  tds_flgs: number;
  ftmd_400706: string;
  tn: string;
}

interface Page_insights {
  [key: string]: PageInsight | GroupInsight;
}

export interface PageInsight {
  page_id: string;
  page_id_type: string;
  actor_id: string;
  attached_story: Attached_story;
  dm: Dm;
  psn: string;
  role: number;
  sl: number;
  targets: TargetsItem[];
}
interface Attached_story {
  page_id: string;
  page_id_type: string;
  actor_id: string;
  dm: Dm;
  psn: string;
  post_context: Post_context;
  role: number;
  sl: number;
}
interface Dm {
  isShare: number;
  originalPostOwnerID: number;
}
interface Post_context {
  object_fbtype: number;
  publish_time: number;
  story_name: string;
  story_fbid: string[];
}
interface TargetsItem {
  actor_id: string;
  page_id: string;
  post_id: string;
  role: number;
  share_id: number;
}

export interface GroupInsight {
  page_id: string;
  page_id_type: string;
  actor_id: string;
  dm: Dm;
  psn: string;
  post_context: Group_Post_context;
  role: number;
  sl: number;
}

interface Group_Post_context {
  object_fbtype: number;
  publish_time: number;
  story_name: string;
  story_fbid: string[];
}

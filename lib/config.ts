import url from "url";

function extractSearchParams(urlString: string) {
  const parsedUrl = url.parse(urlString);
  return parsedUrl.search || "";
}

const targetURL = process.env.TARGET_URL || "";
const search = extractSearchParams(targetURL);
const houseListURL = `https://rent.591.com.tw/home/search/rsList?${search}`;

const apiSecret = process.env.ZUZUGO_API_SECRET;

// const isSubwayStationFilterEnabled = process.env.ENABLE_SUBWAY_STATION_FILTER === "true";
// const subwayStation = JSON.parse(process.env.SUBWAY_STATION_FILTER);
// const subwayStationDistance = parseInt(process.env.SUBWAY_STATION_FILTER_DISTANCE, 10) || 1000;

const slackWebhook = process.env.SLACK_WEBHOOK;

export const config = {
  houseListURL,
  // subwayStationFilter: {
  //   enable: isSubwayStationFilterEnabled,
  //   station: subwayStation,
  //   distance: subwayStationDistance,
  // },
  slackWebhook,
  apiSecret,
  production: process.env.NODE_ENV === "production",
};

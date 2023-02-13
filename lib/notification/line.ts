import { config } from "../config";
import { sendLineNotify } from "../sendLineNotify";
import { DataItem } from "../types";

const HouseBlock = ({ house }: { house: DataItem; key?: string | number | undefined }) => {
  const mobileUrl = `https://house591.page.link/?link=https://m.591.com.tw/v2/rent/${house.post_id}&apn=com.addcn.android.house591&amv=147&afl=https://www.591.com.tw/home/tools/app/android?id=com.addcn.android.house591&ifl=https://www.591.com.tw/home/tools/app/ios&isi=448156496&ibi=com.Addcn.house591&ipbi=com.Addcn.house591&efr=1`;

  const coverPhoto = house.photo_list[0];

  return `
🏠 ${house.title || ""}

- ${house.price} / ${house.price_unit}
- ${house.kind_name} | ${house.area} 坪 | ${house.floor_str}
- ${house.community} ${house.location}

${house.rent_tag?.map((tag) => tag.name)}

${house.title || ""} (${coverPhoto})

- ${house.refresh_time} 更新
- 昨天有 ${house.yesterday_hit} 人瀏覽

[在網頁版打開](https://rent.591.com.tw/home/${house.post_id})
[在 Google Maps 打開](https://www.google.com/maps/search/?api=1&query=${house.location})
[在手機 App 打開](${mobileUrl})`;
};

const HouseMessages = ({ houses }: { houses: DataItem[] }) => {
  return `
# 找到新租房資訊
  ${houses.map((house) => `${house} key=${house.post_id}`)}
`;
};

export async function LineNotify(newHouses: DataItem[]) {
  const blocks = HouseMessages({ houses: newHouses.reverse() }) as unknown as any[];

  if (!config.tokenLine) {
    return;
  }

  if (!config.production) {
    console.log(`Sending line message: ${JSON.stringify(blocks)}`);
  }

  await blocks;
}

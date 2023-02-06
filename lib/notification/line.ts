/** @jsxImportSource jsx-line */
import { config } from "../config";
import { DataItem } from "../types";

const HouseBlock = ({ house }: { house: DataItem; key?: string | number | undefined }) => {
  const updatedTime = new Date(house.updatetime * 1000);
  const mobileUrl = `https://house591.page.link/?link=https://m.591.com.tw/v2/rent/${house.post_id}&apn=com.addcn.android.house591&amv=147&afl=https://www.591.com.tw/home/tools/app/android?id=com.addcn.android.house591&ifl=https://www.591.com.tw/home/tools/app/ios&isi=448156496&ibi=com.Addcn.house591&ipbi=com.Addcn.house591&efr=1`;

  return `
    # 🏠 ${house.address_img_title || ""}
    
    ## 
    - ${house.price} / ${house.unit}
    - ${house.layout} | ${house.area}坪 | ${house.floorStr}
    - ${house.cases_name} ${house.fulladdress}
    
    ${house.rentTag.map((tag) => `\`${tag.name}\` `)}
    
    ${house.cover ? `![${house.photo_alt || ""}](${house.cover})` : ""}
    
    ## 
    - ${house.posttime} 更新（${updatedTime.toLocaleString()}）
    - 瀏覽次數：${house.browsenum_all}
    
    ## 
    [在網頁版打開](https://rent.591.com.tw/home/${house.post_id})
    
    [在 Google Maps 打開](https://www.google.com/maps/search/?api=1&query=${house.location})
    
    [在手機 App 打開](${mobileUrl})
    
    ---
    `;
};

const HouseMessages = ({ houses }: { houses: DataItem[] }) => {
  return `
      # 找到新租房資訊
      ${houses.map((house) => `${house} key=${house.post_id}`)}
  `;
};

export async function notify(newHouses: DataItem[]) {
  const blocks = HouseMessages({ houses: newHouses }) as unknown as any[];

  if (!config.production) {
    console.log(`Sending line message: ${JSON.stringify(blocks)}`);
  }
}

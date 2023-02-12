import { houseFactory } from "../../tests/factory";

import { config } from "@/lib/config";
import { sendLineNotify } from "@/lib/sendLineNotify";

test("Send Line Notify", async () => {
  const randomHouse = houseFactory();
  const mobileUrl = `https://house591.page.link/?link=https://m.591.com.tw/v2/rent/${randomHouse.post_id}&apn=com.addcn.android.house591&amv=147&afl=https://www.591.com.tw/home/tools/app/android?id=com.addcn.android.house591&ifl=https://www.591.com.tw/home/tools/app/ios&isi=448156496&ibi=com.Addcn.house591&ipbi=com.Addcn.house591&efr=1`;

  const resp = await sendLineNotify(
    `🏠 ${randomHouse.title || ""}

- ${randomHouse.price} ${randomHouse.unit}
- ${randomHouse.layout} 格局| ${randomHouse.area} 坪 | ${randomHouse.floorStr}
- ${randomHouse.cases_name} 
- ${randomHouse.fulladdress}
- ${randomHouse.rentTag.map((tag: { name: any }) => `\`${tag.name}\` `)}
- 照片：${randomHouse.cover ? `![${randomHouse.photo_alt || ""}](${randomHouse.cover})` : ""}
- ${randomHouse.posttime} 更新（${randomHouse.updateTime}）
- 瀏覽次數：${randomHouse.browsenum_all}

  在網頁版打開 (https://rent.591.com.tw/home/${randomHouse.post_id})
  在 Google Maps 打開 (https://www.google.com/maps/search/?api=1&query=${randomHouse.location})
  在手機 App 打開 (${mobileUrl})
  `,
    config.tokenLine
  );
});

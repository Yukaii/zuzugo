import { houseFactory } from "../../tests/factory";

import { config } from "@/lib/config";
import { sendLineNotify } from "@/lib/sendLineNotify";

test("Send Line Notify", async () => {
  const randomHouse = houseFactory();

  const resp = await sendLineNotify(
    `
  🏠 ${randomHouse.title || ""}

  ${randomHouse.price} ${randomHouse.unit}
  - ${randomHouse.layout} 格局| ${randomHouse.area} 坪 | ${randomHouse.floorStr}

  - ${randomHouse.cases_name} 
  ${randomHouse.fulladdress}

  ${randomHouse.rentTag.map((tag: { name: any }) => `\`${tag.name}\` `)}
  
  照片：${randomHouse.cover ? `![${randomHouse.photo_alt || ""}](${randomHouse.cover})` : ""}

  ${randomHouse.posttime} 更新（${randomHouse.updateTime}）
  瀏覽次數：${randomHouse.browsenum_all}

  在網頁版打開 (https://rent.591.com.tw/home/${randomHouse.post_id})
  在 Google Maps 打開 (https://www.google.com/maps/search/?api=1&query=${randomHouse.location})
  在手機 App 打開 (${randomHouse.mobileUrl})
  `,
    config.tokenLine
  );
});

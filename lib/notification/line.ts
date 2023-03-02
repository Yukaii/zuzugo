import { config } from "../config";
import { sendLineNotify } from "../sendLineNotify";
import { DataItem } from "../types";

const getCoverPhoto = (house: DataItem) => {
  return house.photo_list[0];
};

const generateHouseMessage = (house: DataItem) => {
  const mobileUrl = `https://house591.page.link/?link=https://m.591.com.tw/v2/rent/${house.post_id}&apn=com.addcn.android.house591&amv=147&afl=https://www.591.com.tw/home/tools/app/android?id=com.addcn.android.house591&ifl=https://www.591.com.tw/home/tools/app/ios&isi=448156496&ibi=com.Addcn.house591&ipbi=com.Addcn.house591&efr=1`;

  const rentTag = house.rent_tag ? `\`${house.rent_tag?.map((tag) => tag.name)}\`` : "";

  return `
新房源來了！ 🏠 \`${house.title || ""}\`

💰 \`${house.price}\` ${house.price_unit}
類型：${house.kind_name} 📐 ${house.area} 坪 🦶 在 ${house.floor_str}
${house.community} 🗺️ ${house.location}

*📌Google Map*
https://www.google.com/maps/search/?api=1&query=${house.location}

💡 ${house.refresh_time}更新

==打開 🌍 網站==
https://rent.591.com.tw/home/${house.post_id}

📱手機 App：${mobileUrl}

${rentTag}

*👀 昨天有 ${house.yesterday_hit} 人瀏覽*
`;
};

export async function notify(newHouses: DataItem[]) {
  const messages = newHouses.reverse().map((house) => ({
    message: generateHouseMessage(house),
    cover: getCoverPhoto(house),
  }));

  if (!config.tokenLine) {
    return;
  }

  if (!config.production) {
    console.log(`Sending line message: ${JSON.stringify(messages)}`);
  }

  for (const message of messages) {
    await sendLineNotify(message.message, message.cover);
  }
}

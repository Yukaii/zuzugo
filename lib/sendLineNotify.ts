import { got } from "got";

import { config } from "./config";

export async function sendLineNotify(message: string, msgImg?: string) {
  console.log("sendLineNotify");

  try {
    const form = msgImg
      ? {
          imageThumbnail: msgImg,
          imageFullsize: msgImg,
          message,
        }
      : {
          message,
        };
    const resp = await got.post({
      url: "https://notify-api.line.me/api/notify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${config.tokenLine}`,
      },
      form,
    });

    return resp;
  } catch (error) {
    console.error(error as any);
    console.error((error as any)?.response?.body);

    throw `Line Token 可能過期了或 Message API 有問題`;
  }
}

import { got } from "got";

export async function sendLineNotify(
  messageContent: string,
  msgImg: string,
  lineNotifyToken: string | undefined
) {
  console.log("sendLineNotify");

  try {
    const resp = await got.post({
      url: "https://notify-api.line.me/api/notify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${lineNotifyToken}`,
      },
      form: {
        imageThumbnail: msgImg,
        imageFullsize: msgImg,
        message: messageContent,
      },
    });

    // const resp = await got.post({
    //   url: "https://notify-api.line.me/api/notify",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: `Bearer ${lineNotifyToken}`,
    //   },
    //   body: new URLSearchParams({
    //     imageThumbnail: msgImg,
    //     imageFullsize: msgImg,
    //     // message: messageContent,
    //   }).toString(),
    //   // form: {
    //   //   message: messageContent,
    //   //   // stickerPackageId: 6136,
    //   //   // stickerId: 10551386,
    //   //   imageThumbnail: msgImg,
    //   //   imageFullsize: msgImg,
    //   // },
    // });
    return resp;
  } catch (error) {
    console.error(error as any);
    console.error((error as any)?.response?.body);

    throw `Line Token 可能過期了`;
  }
}

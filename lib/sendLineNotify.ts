import { got } from "got";

export const sendLineNotify = async (
  messageContent: string,
  lineNotifyToken: string | undefined
) => {
  console.log("送提醒喔");

  try {
    const resp = await got.post({
      url: "https://notify-api.line.me/api/notify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${lineNotifyToken}`,
      },

      body: new URLSearchParams({
        message: messageContent,
      }).toString(),
    });
    return resp;
  } catch (error) {
    console.error((error as any).response.body);

    throw `Line Token 可能過期了`;
  }
};

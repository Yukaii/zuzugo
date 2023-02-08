/** @jsxImportSource jsx-slack */
import { IncomingWebhook } from "@slack/webhook";
import {
  Blocks,
  Section,
  Divider,
  Image,
  Fragment,
  Button,
  Header,
  Actions,
  Context,
} from "jsx-slack";

import { config } from "../config";
import { DataItem } from "../types";

const HouseBlock = ({ house }: { house: DataItem; key?: string | number | undefined }) => {
  const mobileUrl = `https://house591.page.link/?link=https://m.591.com.tw/v2/rent/${house.post_id}&apn=com.addcn.android.house591&amv=147&afl=https://www.591.com.tw/home/tools/app/android?id=com.addcn.android.house591&ifl=https://www.591.com.tw/home/tools/app/ios&isi=448156496&ibi=com.Addcn.house591&ipbi=com.Addcn.house591&efr=1`;

  const coverPhoto = house.photo_list[0];

  return (
    <Fragment>
      <Header>{house.title || ""}</Header>
      <Section>
        <b>{house.price}</b> {house.price_unit}
        <br />
        {house.kind_name} | {house.area}坪 | {house.floor_str}
        <br />
        {house.community} {house.location}
        <br />
        <br />
        {house.rent_tag?.map((tag) => (
          <Fragment key={tag.id}>`{tag.name}` </Fragment>
        ))}
        {coverPhoto && <Image src={coverPhoto} alt={house.title || ""} title={house.title || ""} />}
      </Section>

      <Context>
        {house.refresh_time} 更新
        <br />
        昨日 {house.yesterday_hit} 人瀏覽
      </Context>

      <Actions>
        <Button url={`https://rent.591.com.tw/home/${house.post_id}`} style="primary">
          在網頁版打開
        </Button>

        <Button url={`https://www.google.com/maps/search/?api=1&query=${house.location}`}>
          在 Google Maps 打開
        </Button>

        <Button url={mobileUrl} style="danger">
          在手機 App 打開
        </Button>
      </Actions>

      <Divider />
    </Fragment>
  );
};

const HouseMessages = ({ houses }: { houses: DataItem[] }) => {
  return (
    <Blocks>
      <Section>找到新租房資訊</Section>

      <Divider />

      {houses.map((house) => (
        <HouseBlock house={house} key={house.post_id} />
      ))}
    </Blocks>
  );
};

export async function notify(newHouses: DataItem[]) {
  if (!config.slackWebhook) {
    return;
  }

  console.debug(`Sending slack message: ${JSON.stringify(newHouses.length)}`);

  const webhook = new IncomingWebhook(config.slackWebhook);
  const blocks = HouseMessages({ houses: newHouses.reverse() }) as unknown as any[];

  if (!config.production) {
    console.log(`Sending slack message: ${JSON.stringify(blocks)}`);
  }

  await webhook.send({
    blocks,
  });
}

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

const HouseBlock = ({ house }: { house: DataItem }) => {
  const updatedTime = new Date(house.updatetime * 1000);
  const refreshTime = new Date(house.refreshtime * 1000);

  return (
    <Fragment>
      <Header>{house.address_img_title || ""}</Header>
      <Section>
        <b>{house.price}</b>
        {house.unit}
        <br />
        {house.layout} | {house.area}坪 | {house.floorStr}
        <br />
        {house.cases_name} {house.fulladdress}
        <br />
        <br />
        {house.rentTag.map((tag) => (
          <Fragment key={tag.id}>`{tag.name}` </Fragment>
        ))}
        {house.cover && (
          <Image src={house.cover} alt={house.photo_alt || ""} title={house.photo_alt || ""} />
        )}
      </Section>

      <Context>
        {house.posttime} 內更新（{updatedTime.toLocaleString()}）<br />
        瀏覽次數：{house.browsenum_all}
      </Context>

      <Actions>
        <Button url={`https://rent.591.com.tw/home/${house.post_id}`} style="primary">
          在網頁版打開
        </Button>

        <Button url={`https://www.google.com/maps/search/?api=1&query=${house.location}`}>
          在 Google Maps 打開
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

  const webhook = new IncomingWebhook(config.slackWebhook);
  const blocks = HouseMessages({ houses: newHouses }) as unknown as any[];

  if (!config.production) {
    console.log(`Sending slack message: ${JSON.stringify(blocks)}`);
  }

  await webhook.send({
    blocks,
  });
}

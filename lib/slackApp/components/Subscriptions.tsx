/** @jsxImportSource jsx-slack */
import { HouseSubscription } from "@prisma/client";
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

export const Subscriptions = ({
  subscriptions,
  sectionMessage,
}: {
  subscriptions: HouseSubscription[];
  sectionMessage?: string;
}) => {
  return (
    <Blocks>
      {sectionMessage ? <Section>{sectionMessage}</Section> : null}

      {subscriptions.map((subscription) => (
        <Fragment key={subscription.id}>
          <Section>
            <b>Subscription ID:</b> <br />
            {subscription.id}
            <br />
            <br />
            <b>Raw Query:</b>
            <br />
            <br />
            <pre>{subscription.query}</pre>
            <Button style="primary" url={`https://rent.591.com.tw/?${subscription.query}`}>
              Preview
            </Button>
          </Section>
          <Divider />
        </Fragment>
      ))}
    </Blocks>
  );
};

import { Inngest } from "inngest";

type DispatchAll = {
  name: "notification/dispatchAll";
  data: {
    houseIds: number[];
  };
};

type NotifyLine = {
  name: "notification/notifyLine";
  data: {
    houseIds: number[];
  };
};

type NotifySlack = {
  name: "notification/notifySlack";
  data: {
    houseIds: number[];
  };
};

type Events = {
  "notification/dispatchAll": DispatchAll;
  "notification/notifyLine": NotifyLine;
  "notification/notifySlack": NotifySlack;
};

export const inngest = new Inngest<Events>({
  name: "Zuzugo",
});

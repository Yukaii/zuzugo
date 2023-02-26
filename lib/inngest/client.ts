import { Inngest } from "inngest";

type DispatchAll = {
  name: "notification/dispatchAll";
  data: {
    houseIds: string[];
  };
};

type NotifyLine = {
  name: "notification/notifyLine";
  data: {
    houseIds: string[];
  };
};

type NotifySlack = {
  name: "notification/notifySlack";
  data: {
    houseIds: string[];
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

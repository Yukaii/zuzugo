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

type FetchNewHouses = {
  name: "tasks/fetchNewHouses";
  data: {};
};

type Events = {
  "notification/dispatchAll": DispatchAll;
  "notification/notifyLine": NotifyLine;
  "notification/notifySlack": NotifySlack;
  "tasks/fetchNewHouses": FetchNewHouses;
};

export const inngest = new Inngest<Events>({
  name: "Zuzugo",
});

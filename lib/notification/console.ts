import { DataItem } from "../types";

export function notify(newHouses: DataItem[]) {
  const message = newHouses.map((house) => house.post_id).join(", ");
  console.log(message);
}

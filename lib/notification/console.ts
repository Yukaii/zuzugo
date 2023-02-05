import { DataItem } from "../types";

export function notify(newHouses: DataItem[]) {
  if (newHouses.length) {
    const message = newHouses.map((house) => house.post_id).join(", ");

    console.log(message);
  }
}

import { faker } from "@faker-js/faker";

import { DataItem } from "@/lib/types";

export function houseFactory(props: Partial<DataItem> = {}): DataItem {
  const house: Partial<DataItem> = {
    post_id: Math.floor(Math.random() * 100000),
    title: faker.lorem.sentence(),
    type: faker.random.words(),
    price: faker.finance.amount(),
    price_unit: "元/月",
    area: faker.finance.amount(),
    floor_str: faker.random.words(),
    rent_tag: [{ id: "1", name: faker.random.words() }],
    yesterday_hit: Math.floor(Math.random() * 100),
    refresh_time: faker.date.past().toString(),
    location: faker.address.streetAddress(),
    photo_list: [faker.image.imageUrl()],
    ...props,
  };

  return house as DataItem;
}

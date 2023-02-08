import { faker } from "@faker-js/faker";

import { DataItem } from "@/lib/types";

export function houseFactory(props: Partial<DataItem> = {}): DataItem {
  return {
    post_id: Math.floor(Math.random() * 100000),
    title: faker.lorem.sentence(),
    type: faker.random.words(),
    price: faker.finance.amount(),
    unit: "元/月",
    layout: faker.random.words(),
    area: faker.finance.amount(),
    floorStr: faker.random.words(),
    cases_name: faker.random.words(),
    fulladdress: faker.address.streetAddress(),
    rentTag: [{ id: 1, name: faker.random.words() }],
    cover: faker.image.imageUrl(),
    photo_alt: faker.lorem.sentence(),
    posttime: faker.date.past(),
    updatetime: Date.now().valueOf() / 1000,
    browsenum_all: Math.floor(Math.random() * 100000),
    location: faker.address.streetAddress(),
    mobileURL: faker.internet.url(),
    ...props,
  } as DataItem;
}

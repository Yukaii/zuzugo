# Zuzugo 租租狗

抓取 591 最新租屋資訊，並提供聊天機器人通知（可簡易的擴充）

![slack-bot](./docs/assets/slack-bot.png)

## Roadmap

- [x] 591 租屋爬蟲
- Slack 通知系統
  - [x] 基本 Slack Webhook 通知
  - 用 [phelia](https://github.com/maxchehab/phelia) 寫更多互動的 Slack 功能，比如：建立關注清單、價格變更、是否已出租
- [ ] Line Notify 通知 (WIP)
- [ ] Telegram Bot 通知 (Planned)

## Development

1. Clone 專案，然後

```bash
  pnpm install
  cp .env.example .env.local
```

## Previous Works

- [zuzugo-legacy](https://github.com/Yukaii/zuzugo-legacy)：舊版租租狗，那時候只寫完爬蟲部分（現已失效，於是重寫），去參加 g0v 的 rentea 小聚，得知[豬豬快租](https://www.facebook.com/zuzutw/)因為~~大人的理由~~[下架了](https://www.facebook.com/zuzutw/posts/pfbid0Jiys6uatCsuhS76q3DSz7Atk3XuUQbKmwah8Q9trNbYVpXW8moDk4N5VJhjfmH46l)，剛好那時程式還沒寫完就找到房子，結果儘管 README 洋洋灑灑一堆，仍舊棄坑爛尾怪 XD
- [https://github.com/aiyu666/rentHouse](https://github.com/aiyu666/rentHouse) 以及各種 forks：這次重寫 zuzugo 想說也不要重造太多輪子，GitHub 搜尋 591 前幾名又是 JavaScript 就直接拿來改了。
  - [https://github.com/uier/rentHouse](https://github.com/uier/rentHouse) (AppLink 網址參考)
  - [https://github.com/zephyrxvxx7/rentHouse](https://github.com/zephyrxvxx7/rentHouse) (591 API 修正參考)

## License

MIT

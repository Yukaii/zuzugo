# Zuzugo 租租狗

<p align="center">
  <img src="./docs/assets/zuzugo_logo.png" width="300" alt="logo">
</p>

抓取 591 最新租屋資訊，並提供聊天機器人通知（可簡易的擴充）

## Screenshots

|                  Line Notify                  |                 Slack Bot                 |
| :-------------------------------------------: | :---------------------------------------: |
| ![line-notify](./docs/assets/line-notify.png) | ![slack-bot](./docs/assets/slack-bot.png) |

## Roadmap

[參見 GitHub Project](https://github.com/users/Yukaii/projects/5/views/2)

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

## Misc：關於命名

- 豬豬快租 -> zuzu.com.tw
- [bbgo](https://github.com/c9s/bbgo) -> BB 狗，雖然本專案沒有半行 Go...

![yeah](https://1.bp.blogspot.com/-h-sB7bTbyDo/XmerCeUWoCI/AAAAAAAALSU/3DmKLm3ZXh8NUecPNKHB0YCVrUd51MbRQCK4BGAYYCw/s1600/noname.png)

## License

MIT

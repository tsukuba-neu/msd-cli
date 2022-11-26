# MSD CLI (α)

<p align="center">
  <img src="./docs/img/msd.png" width="300" height="300">
</p>

SlackからDiscordに移行するためのnode.js製のCLI  
MSDは「Migrate from Slack to Discord」の略称  

> **Warning**  
> **Privateチャンネルの移行はできません**  
> このCLIはまだ十分なテストがされていません、動作の保証ができないので、利用する際は自己責任でお願いします  
> 将来的にSlackやDiscordのAPIの仕様変更によって、使用できなくなる可能性があります  

<p align="center">
  <img src="./docs/img/example.png" min-width="600" min-height="540">
</p>

SlackのエクスポートデータをDiscordに出力できるデータに変換し、DiscordBot経由でチャンネルの作成とメッセージの出力を行うことで移行を実現します  

<p align="center">
  <img src="./docs/img/architecture.png" min-width="850" min-height="350">
</p>

## ドキュメント

- [移行できる項目と移行できない項目](./docs/migration.md)
- [仕様](./docs/specification.md)
- [初回設定](./docs/setting.md)
- [参考リンク](./docs/reference.md)

## 使用方法

[初回設定](./docs/setting.md)を完了後、下記のコマンドを実行することで移行します  
クライアント作成時に処理が止まる場合があります、その際には止まった箇所のコマンドを再実行してください  

```zsh
npm run deploy
# or
npm run init
npm run migrate:channel
npm run deploy:channel
npm run migrate:user
npm run deploy:user
npm run migrate:message
npm run deploy:message
```

移行完了後は、`#msd-file`チャンネルは不要になるので削除しても問題ありません  
移行をリセットしたい場合は、下記のコマンドを実行することでリセットできます  

```zsh
npm run destroy
# or
npm run destroy:message
npm run destroy:channel
```

## 既知の問題

### [デプロイ速度が遅い](https://github.com/revoltage-inc/msd-cli/issues/37)

現在はDBにSQLiteを利用しているため、同時書き込みができない制限があります  
そのため直列処理でデプロイをしており、デプロイ速度が遅いです  
DBを変更し、並列処理でデプロイをできるようにしたいと考えています  

### [最大ファイルアップロードサイズを超えるファイル](https://github.com/revoltage-inc/msd-cli/issues/38)

[Slackにアップロードできる最大ファイルサイズは最大1GB](https://slack.com/intl/ja-jp/help/articles/201330736-%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92-Slack-%E3%81%AB%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B)ですが、[Discordにアップロードできる最大ファイルサイズは最大100MB(※サーバーのブースト最大時)](https://support.discord.com/hc/ja/articles/360028038352-%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%83%96%E3%83%BC%E3%82%B9%E3%83%88-)です  

そのため、Slackのメッセージの添付ファイルのサイズによっては、Discordにアップロードできない可能性があります  
現在、最大ファイルアップロードサイズを超えるファイルはアップロードをスキップする暫定仕様となっています  
別ストレージサービスへのアップロードなどのオプション機能は現在ありません  

より多くの添付ファイルを移行したい場合は、Discordにアップロードできる最大ファイルアップロードサイズを解放するために、[サーバーのブースト](https://support.discord.com/hc/ja/articles/360028038352-%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%83%96%E3%83%BC%E3%82%B9%E3%83%88-)を検討してください  

## License

[MIT](https://opensource.org/licenses/MIT)

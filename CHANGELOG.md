# Changelog

## [1.6.0](https://github.com/tsukuba-neu/msd-cli/compare/v1.5.5...v1.6.0) (2023-07-14)


### Features

* 特殊文字（HTML entities）をパースする ([4bc1dfd](https://github.com/tsukuba-neu/msd-cli/commit/4bc1dfd6630958c55b535b7d5767bc308ae0e74d))


### Bug Fixes

* 1 channelの変換処理をmessageから分離 ([8fec4ac](https://github.com/tsukuba-neu/msd-cli/commit/8fec4acd654bb035ae118cdffc06d8909f47d602))
* 1 convert:channelコマンドのdescriptionを修正 ([ad03977](https://github.com/tsukuba-neu/msd-cli/commit/ad03977d5c16b76a07c605d20a7c2fe9c72a6fc0))
* 1 convertコマンドを細分化 ([057bec7](https://github.com/tsukuba-neu/msd-cli/commit/057bec7158b3ac7e5cbe3eeab823fe2d2aa680f6))
* 1 Convertの不要な処理を削除 ([0bae80b](https://github.com/tsukuba-neu/msd-cli/commit/0bae80b78d84bba32a03ea3e6689db4776cb61fa))
* 1 Discordのチャンネルを作成する処理を追加 ([203c7f6](https://github.com/tsukuba-neu/msd-cli/commit/203c7f64d9370888f7f958298e2ca0613ad44345))
* 1 doc stringから日本語の文を削除 ([b05fff3](https://github.com/tsukuba-neu/msd-cli/commit/b05fff3ab44d33f4c2c6e9f8a318f77f8d47abf7))
* 1 doc stringを追加 ([eabcfbd](https://github.com/tsukuba-neu/msd-cli/commit/eabcfbd659c8a36a3c0aa2dc1e2c3e0de824a2a8))
* 1 READMEを更新 ([7684dff](https://github.com/tsukuba-neu/msd-cli/commit/7684dffab89fa8347f271344e9251260d025ccd6))
* 1 READMEを更新 ([4e761f8](https://github.com/tsukuba-neu/msd-cli/commit/4e761f813b5155db2e6681cfc8aa102aeb1f5de5))
* 1 カテゴリーを作成する処理を別ファイルに移動 ([bb07064](https://github.com/tsukuba-neu/msd-cli/commit/bb070644401eb3c179eb27cd0a9a8346088a874f))
* 1 チャンネル情報・カテゴリー情報を作成・更新するように修正 ([1f56421](https://github.com/tsukuba-neu/msd-cli/commit/1f564215208fa92cdd71811b6f5717bc013eaddf))
* 1 デプロイしたチャンネル・カテゴリーを削除できるコマンドを追加 ([1d64d6f](https://github.com/tsukuba-neu/msd-cli/commit/1d64d6fa48be96415da12aa57e3f962e48f1563d))
* 1 パッケージを更新 ([3ffeb68](https://github.com/tsukuba-neu/msd-cli/commit/3ffeb68a8aa3e270ddbf3d9b048cd2ecda513cc6))
* 1 メッセージにユーザーの状態を示す絵文字を表記するように修正 ([0c8f6b5](https://github.com/tsukuba-neu/msd-cli/commit/0c8f6b5f08472d6d4886a62227f439340b90a949))
* 1 既知の問題を追加 ([a93bd68](https://github.com/tsukuba-neu/msd-cli/commit/a93bd68d0c5a00ab16eb86e000fb2a9de9cb6ae8))
* 106 メッセージのデプロイ対象・削除対象の取得がずれる問題を修正 ([91915a4](https://github.com/tsukuba-neu/msd-cli/commit/91915a4876f745fc8d35cf6a16777cd27124a2e0))
* 106 リファクタリング ([bcb0117](https://github.com/tsukuba-neu/msd-cli/commit/bcb0117225f05b0edd65f1d37cbc9080cbee9175))
* 106 改行を挿入 ([a9ea67e](https://github.com/tsukuba-neu/msd-cli/commit/a9ea67e80361bd9c6fe1f0ad42ac11874a084525))
* 11 DiscordのクライアントをGuildからClientにリネーム ([c84495f](https://github.com/tsukuba-neu/msd-cli/commit/c84495f03731ae0f668c4dbe78b66baa0136722d))
* 11 DiscordのクライアントをGuildからClientにリネーム ([bcff887](https://github.com/tsukuba-neu/msd-cli/commit/bcff887f4be6dd4b5c2936c8fc10323166347a22))
* 11 カテゴリー削除時にIDを空にしないように修正 ([038c1ff](https://github.com/tsukuba-neu/msd-cli/commit/038c1ffa67cdbd4462a27ee0b94141673fad8360))
* 11 ドキュメントを更新 ([cf6cf18](https://github.com/tsukuba-neu/msd-cli/commit/cf6cf18ca1c547532016e8335d036108b68a6072))
* 11 ドキュメントを更新 ([34a87e6](https://github.com/tsukuba-neu/msd-cli/commit/34a87e6295ab4c6742946e553294e57346a73c91))
* 11 メッセージにファイル情報を追加するように修正 ([36732e2](https://github.com/tsukuba-neu/msd-cli/commit/36732e2f3c75465ccf697834e8d998255b5e71ac))
* 11 メッセージの形式を修正 ([358c1b2](https://github.com/tsukuba-neu/msd-cli/commit/358c1b247980053997f6952f07ebb68ace7c2aa2))
* 11 メッセージの情報にcolorを含めるように修正 ([1eca15c](https://github.com/tsukuba-neu/msd-cli/commit/1eca15c4bea28aa30473b736bab218f485fd87c0))
* 11 メッセージの送信順序がばらついている問題を修正 ([eb57755](https://github.com/tsukuba-neu/msd-cli/commit/eb577552fd15c1566f59a70ee6e5a325f544ba00))
* 11 メッセージビルド時に埋め込み内容を生成するように修正 ([f4cc67e](https://github.com/tsukuba-neu/msd-cli/commit/f4cc67efdfa5f412bfa150165869cbff474d7287))
* 11 メッセージを埋め込みに変更 ([6fbc66a](https://github.com/tsukuba-neu/msd-cli/commit/6fbc66a8b4caeb7557707e25241fc6af26ddfd94))
* 11 メッセージ作成時にファイルを添付できるように修正 ([4065e01](https://github.com/tsukuba-neu/msd-cli/commit/4065e01390d03ec2dd9bdc9b5cd2c51a1aa47493))
* 11 メッセージ内の置換処理を追加 ([67afb24](https://github.com/tsukuba-neu/msd-cli/commit/67afb240be514cbe229a69831041d55122d704db))
* 11 メッセージ送信時にメッセージ内容にメッセージの情報を追加するように修正 ([4bb5307](https://github.com/tsukuba-neu/msd-cli/commit/4bb5307941fcf9905c6b15b430528ff5c8b0260b))
* 11 ユーザー情報にBot情報を追加 ([e7e72b7](https://github.com/tsukuba-neu/msd-cli/commit/e7e72b76af689942b883f86be262f9ea1573b9ae))
* 11 ユーザー情報にアイコンURLを追加 ([f206e49](https://github.com/tsukuba-neu/msd-cli/commit/f206e4930719b350795e4689ae6a2f8c3ab46e65))
* 14 deployとdestroyコマンドが直列実行になるように修正 ([f55aaf4](https://github.com/tsukuba-neu/msd-cli/commit/f55aaf4dee09b53116cfa7fef07c476a77749981))
* 14 destroyコマンドで削除対象がない場合の例外を握りつぶすように修正 ([2ab2351](https://github.com/tsukuba-neu/msd-cli/commit/2ab2351440ce7c19cb82377039dd1ff17804ffb8))
* 14 destroyコマンドの実行に確認を挟むように修正 ([b77c859](https://github.com/tsukuba-neu/msd-cli/commit/b77c8599fe47a4bf37309a21ae60bd995e7cb373))
* 14 direnvが不要になるように修正 ([e05388d](https://github.com/tsukuba-neu/msd-cli/commit/e05388df1ad5a0313556e2bfddacfa942b56ec60))
* 14 doc stringの不要な引数を削除 ([b5f660d](https://github.com/tsukuba-neu/msd-cli/commit/b5f660d8f1c70b4c10365a745b7e81f67b56a9b7))
* 14 message_idをidにリネーム ([335c270](https://github.com/tsukuba-neu/msd-cli/commit/335c27093af7b1dca021c2385074668272dc2468))
* 14 Slackのメッセージのタイムスタンプを文字列として扱うように修正 ([2e98965](https://github.com/tsukuba-neu/msd-cli/commit/2e98965830ebd157b00e988d4f5b1721e528f8df))
* 14 Userの値を変更 ([45fb970](https://github.com/tsukuba-neu/msd-cli/commit/45fb9708b86d9ee044bef016a0e9f51ad8f227c5))
* 14 アーカイブされたチャンネルを移行しない場合は、チャンネルファイルをビルド時に除外するように修正 ([617befd](https://github.com/tsukuba-neu/msd-cli/commit/617befd2f052ad81335554c879f4b3b3d13f4359))
* 14 チャンネルとカテゴリー削除時にファイルを更新しないように修正 ([91203ff](https://github.com/tsukuba-neu/msd-cli/commit/91203ffaf6286ee02c672f0c57880b785fdc2bf8))
* 14 チャンネルとカテゴリー削除時にファイルを更新しないように修正 ([28a2252](https://github.com/tsukuba-neu/msd-cli/commit/28a225275a3fcd442f9cca2b79f9479b295842a0))
* 14 チャンネルの不要な情報を削除 ([0615e11](https://github.com/tsukuba-neu/msd-cli/commit/0615e11ed471504dba01dd13c7672d8521316b7f))
* 14 パッケージの一括アップデートコマンドを追加 ([51dc0c6](https://github.com/tsukuba-neu/msd-cli/commit/51dc0c68569f888061e8308a30e21a32e34bb543))
* 14 パッケージを更新 ([d984e81](https://github.com/tsukuba-neu/msd-cli/commit/d984e8123d97f4498917cccb661ef20ffb62e944))
* 14 ピン留めを追加したメッセージのピン留めフラグがfalseになるように修正 ([c7b988d](https://github.com/tsukuba-neu/msd-cli/commit/c7b988d1a9dd87ce032574589acdceb94feddf64))
* 14 ピン留め機能を実装 ([bc1a731](https://github.com/tsukuba-neu/msd-cli/commit/bc1a731b149bc1128114f3e8033630d2c0d53587))
* 14 ピン留め追加のメッセージがピン留めされたメッセージの下にデータが並ぶように修正 ([f9e97d2](https://github.com/tsukuba-neu/msd-cli/commit/f9e97d27e91817261cacf37b58ec88890ebae3dc))
* 14 ファイルに必須項目がない場合は例外を発生させるように修正 ([f34aa3d](https://github.com/tsukuba-neu/msd-cli/commit/f34aa3d996be4eecaa0203b76ba2587995df4f51))
* 14 メッセージの送信者情報が取得できない問題を修正 ([28e386d](https://github.com/tsukuba-neu/msd-cli/commit/28e386d8b924f0831bb88687162f31732fa84e79))
* 14 メッセージを再度デプロイした際にピン留め追加メッセージをデプロイしないように修正 ([ab12ae2](https://github.com/tsukuba-neu/msd-cli/commit/ab12ae27498974d7b2559fa0cccbe6919d635b22))
* 14 ユーザーファイルビルド時にエラーが発生した場合、エラーメッセージが表示されない問題を修正 ([62ff0f9](https://github.com/tsukuba-neu/msd-cli/commit/62ff0f9febb76537a316a8a356eefc61c69a8509))
* 14 ユーザー名もしくはメンションが正しく置換されない問題を修正 ([cd288bf](https://github.com/tsukuba-neu/msd-cli/commit/cd288bf171dff93b794dbc336a0d3aacd4f953c1))
* 14 不要なレスポンスを削除 ([fc5049b](https://github.com/tsukuba-neu/msd-cli/commit/fc5049b275c29f796c91c86bf58ebee22ac572bd))
* 14 不要な処理を削除 ([62960da](https://github.com/tsukuba-neu/msd-cli/commit/62960daf52514376ff5a0032eca681c01b31121a))
* 14 並列化できる処理は並列処理に修正 ([de84af1](https://github.com/tsukuba-neu/msd-cli/commit/de84af1f963df7064688424221d9d7b0b04077ce))
* 14 仕様を更新 ([a511abd](https://github.com/tsukuba-neu/msd-cli/commit/a511abd5443a01125ed2d928e4c8b7b91b15b318))
* 14 図を更新 ([c5fbd50](https://github.com/tsukuba-neu/msd-cli/commit/c5fbd5060083994bb53daf1222517ec07fa809c1))
* 14 移行項目を更新 ([b405772](https://github.com/tsukuba-neu/msd-cli/commit/b40577217279427677e88e5a49813dda3238615f))
* 14 関数名をリネーム ([f99451b](https://github.com/tsukuba-neu/msd-cli/commit/f99451b1630c0c69a80d72474d289f921df43c94))
* 144 パッケージを更新 ([21976e6](https://github.com/tsukuba-neu/msd-cli/commit/21976e6acc599e7ad988911858fce606de9baa63))
* 144 初期設定のリンクを修正 ([9c135a8](https://github.com/tsukuba-neu/msd-cli/commit/9c135a80fafd535cffd82bdb0e44337baed3a3ce))
* 147 コマンドのディレクトリをリネーム ([445e4fd](https://github.com/tsukuba-neu/msd-cli/commit/445e4fd7fc9f85e8653da552cc35872342d10a5d))
* 147 コマンド実行時に警告が出ないように修正 ([c62ee92](https://github.com/tsukuba-neu/msd-cli/commit/c62ee921d721dd77cefeebc09bec870c45753996))
* 15 URLタグをDiscordで表示される形式に置換するように修正 ([1792717](https://github.com/tsukuba-neu/msd-cli/commit/17927178bf5e77c48d439669339af8c9b6657f21))
* 15 パッケージ名変更 ([c4c963f](https://github.com/tsukuba-neu/msd-cli/commit/c4c963fcd5e30ed5ef5996e56e16da0bace13c82))
* 15 添付ファイルを別メッセージにするように修正 ([a44aebc](https://github.com/tsukuba-neu/msd-cli/commit/a44aebc3b233b35c829903893af72409b7fa8a5f))
* 150 json5の脆弱性のあるバージョンをオーバーライド ([ecf4ce7](https://github.com/tsukuba-neu/msd-cli/commit/ecf4ce7b416b1e93c900c8f00ca555e0beb906e8))
* 150 パッケージを更新 ([a0af6c0](https://github.com/tsukuba-neu/msd-cli/commit/a0af6c039e4bc94bd69ad7fdb9090c46a3230c1a))
* 154 パッケージの更新を自動マージするworkflowを追加 ([cf05e63](https://github.com/tsukuba-neu/msd-cli/commit/cf05e631a4828019e2775ba0a6dd0d2ebdc51bbb))
* 154 パッケージを更新 ([88dd78f](https://github.com/tsukuba-neu/msd-cli/commit/88dd78fb7467ab3fc4be24f5beb9e2c42ab15a0c))
* 154 リネーム ([79159ba](https://github.com/tsukuba-neu/msd-cli/commit/79159bac9a3d9af6970c4b8d44bfb2adf8d80381))
* 16 async-retryを削除 ([88850e7](https://github.com/tsukuba-neu/msd-cli/commit/88850e7ccf367fee28ca4f4f2e3ef29dc64a0c8c))
* 16 build関連のコマンドを削除 ([19cddbf](https://github.com/tsukuba-neu/msd-cli/commit/19cddbfdacdb347f207426a197c7a7bddbda0876))
* 16 Channelテーブルを統合 ([edc7c86](https://github.com/tsukuba-neu/msd-cli/commit/edc7c867d5734978bb14e47c0498802ed5cc5e68))
* 16 createdAtとupdatedAtを手動で挿入させないように修正 ([cb0bc02](https://github.com/tsukuba-neu/msd-cli/commit/cb0bc0294edfbe6b6f36086d85b22ed3f5c02d6a))
* 16 DATABASE_URLのパスを修正 ([50c841c](https://github.com/tsukuba-neu/msd-cli/commit/50c841c16740374854327da6ca19d6100b5d9168))
* 16 DBのマイグレーションファイルを含めるように修正 ([118614b](https://github.com/tsukuba-neu/msd-cli/commit/118614bc983e9dfd1b00fa8be391e440db8282dc))
* 16 destroyコマンドでカラムを削除せずにdeployIDだけを削除するように修正 ([5667c20](https://github.com/tsukuba-neu/msd-cli/commit/5667c202d812543c318ef9f0a1028ab63be3d0c8))
* 16 Messageテーブルをリネーム ([5424b23](https://github.com/tsukuba-neu/msd-cli/commit/5424b238e5654100eb7e2bb6eabe014f57b18185))
* 16 Prismaを追加 ([187edf5](https://github.com/tsukuba-neu/msd-cli/commit/187edf5b99a36962f954fe74682a26e70ff996fe))
* 16 SlackChannelの構造を修正 ([903e4e8](https://github.com/tsukuba-neu/msd-cli/commit/903e4e85a27001b90fd2698fc6963b9f6ecb506f))
* 16 SQLiteのチャンネルデータからチャンネルをデプロイできるように修正 ([7ff527f](https://github.com/tsukuba-neu/msd-cli/commit/7ff527ffede092ab1190518b57126adbfc823174))
* 16 SQLiteのチャンネルデータからデプロイしたチャンネルを削除できるように修正 ([af3efec](https://github.com/tsukuba-neu/msd-cli/commit/af3efec12005aab9d8c43814c21af55bf7ca2f6d))
* 16 SQLiteのメッセージデータからメッセージをデプロイできるように修正(WIP) ([2916ddf](https://github.com/tsukuba-neu/msd-cli/commit/2916ddf4c074413ac894e8cbfb8a2955257b7d1a))
* 16 SQLiteのユーザーデータからユーザーの画像をデプロイしたチャンネルを削除できるように修正 ([7db0832](https://github.com/tsukuba-neu/msd-cli/commit/7db0832a78d4b4093694e2d01a0b4c01375da2fc))
* 16 SQLiteのユーザーデータからユーザーの画像をデプロイできるように修正 ([9ef69b8](https://github.com/tsukuba-neu/msd-cli/commit/9ef69b87d770bd62e1a49bed2a442cee87fd4b2d))
* 16 timestampの浮動小数点を丸めないように修正 ([acd513e](https://github.com/tsukuba-neu/msd-cli/commit/acd513ea1cf2e3c3aeead4633608fff5488329a9))
* 16 Userテーブルを統合 ([3042cc6](https://github.com/tsukuba-neu/msd-cli/commit/3042cc6740f4dc6942764fe48571e66537271dbb))
* 16 アーカイブされたチャンネルを移行しないオプションを削除 ([096b742](https://github.com/tsukuba-neu/msd-cli/commit/096b7428ca8d411295c35464ff1c802a38df229b))
* 16 コマンドの記載を修正 ([a668e23](https://github.com/tsukuba-neu/msd-cli/commit/a668e23323e5d9ffe8c1ed9c80d19617ff07d066))
* 16 コメントをリファクタリング ([12100d6](https://github.com/tsukuba-neu/msd-cli/commit/12100d61c169992a44e0d613a02e2a3e2b08104f))
* 16 コメントを修正 ([c69c3ca](https://github.com/tsukuba-neu/msd-cli/commit/c69c3ca030ca0f9989b22aa97194d13e7bf76bb9))
* 16 チャンネルデータをSQLiteに作成できるように修正 ([58e53e7](https://github.com/tsukuba-neu/msd-cli/commit/58e53e7820734ad75f17d9460a5c57dc25493e55))
* 16 ドキュメントを更新 ([3fd823f](https://github.com/tsukuba-neu/msd-cli/commit/3fd823f23cb17c6a0b2325604e9358d1bdd6b2d6))
* 16 ドキュメントを更新 ([63c0058](https://github.com/tsukuba-neu/msd-cli/commit/63c0058488aa3f006e15e8b6606d8638d000e6af))
* 16 パッケージを更新 ([99b5d83](https://github.com/tsukuba-neu/msd-cli/commit/99b5d831d4e76cb7c0462bf1e57924e999cce895))
* 16 パッケージを更新 ([2ab29dd](https://github.com/tsukuba-neu/msd-cli/commit/2ab29dde81399a0b903e7fa4d62fb0bdad4b92af))
* 16 ピン留めアイテムを実装 ([13b605f](https://github.com/tsukuba-neu/msd-cli/commit/13b605faa95a3e225ff9e3cc3efe13157d332db3))
* 16 メッセージデータをSQLiteに作成できるように修正 ([71db812](https://github.com/tsukuba-neu/msd-cli/commit/71db8127801179f739bd8e984f5f355293ebf9e4))
* 16 メッセージにファイルを添付できるように修正 ([42a4698](https://github.com/tsukuba-neu/msd-cli/commit/42a4698982846d04c0b3e44bd09d39f5732427c3))
* 16 メッセージの1回の取得処理を1000件に拡大 ([ccbe279](https://github.com/tsukuba-neu/msd-cli/commit/ccbe279d8f4a7c3df25e2cf42228d2fe491efa27))
* 16 メッセージの1回の取得処理を100件に縮小 ([2176b7a](https://github.com/tsukuba-neu/msd-cli/commit/2176b7aeda30a55c60119bc03da7ad657778b1e5))
* 16 メッセージのリプライ情報を保存するように修正 ([3920f39](https://github.com/tsukuba-neu/msd-cli/commit/3920f39c0c7e6c98ef0160c9a13626c987e881d2))
* 16 メッセージの投稿日時が正しく表示されない問題を修正 ([373fb20](https://github.com/tsukuba-neu/msd-cli/commit/373fb20cf52ee36abb7c86dfeeed626c20282147))
* 16 メッセージをリプライできるように実装 ([0c92565](https://github.com/tsukuba-neu/msd-cli/commit/0c925656457ae8a88f1c9dfb4eb327911ed5bf49))
* 16 メッセージを途中から再デプロイできるように修正 ([2916c63](https://github.com/tsukuba-neu/msd-cli/commit/2916c63e91aa6a1f5236cceeb68c044f0d965a58))
* 16 ユーザータイプを変更 ([e840a7a](https://github.com/tsukuba-neu/msd-cli/commit/e840a7ab469ddbce732e0b52d26c1e75cc766814))
* 16 ユーザーデータをSQLiteに作成できるように修正 ([7561a51](https://github.com/tsukuba-neu/msd-cli/commit/7561a51e5f5cfb7af012540f53ce64b754eed772))
* 16 ユーザー画像がデプロイできない問題を修正 ([58ca323](https://github.com/tsukuba-neu/msd-cli/commit/58ca3239732a855c6abc1be0a4e0ae40702b8d90))
* 16 リファクタリング ([8c742ce](https://github.com/tsukuba-neu/msd-cli/commit/8c742ce91fea5080f5a94d5e1117470cfdcf76d7))
* 16 一部Bot情報が取得できない問題を修正 ([1053867](https://github.com/tsukuba-neu/msd-cli/commit/1053867b7db23f44d218707126c0b985ff059030))
* 16 不要なライブラリを削除 ([2e5b05b](https://github.com/tsukuba-neu/msd-cli/commit/2e5b05b4682ce95693938f6f9079d5c177674435))
* 16 全てのテーブルにcreatedAtとupdatedAtを追加 ([a8b5dee](https://github.com/tsukuba-neu/msd-cli/commit/a8b5dee9209df7aa02a4966b9d2378d2de7445e9))
* 16 削除されたファイルを無視するように修正 ([d41ddfd](https://github.com/tsukuba-neu/msd-cli/commit/d41ddfdae7b5e91569e1ffe75315e6103262b594))
* 16 新ライブラリと新コマンドを昇格するためにリネーム ([0c2ffa4](https://github.com/tsukuba-neu/msd-cli/commit/0c2ffa449287ca6f9ba2b01868f7b8d1d278256a))
* 16 旧コマンドを削除 ([804f9aa](https://github.com/tsukuba-neu/msd-cli/commit/804f9aaa5eb0254f90b64673f4e81e5ed47a9214))
* 16 旧ライブラリを削除 ([a023236](https://github.com/tsukuba-neu/msd-cli/commit/a0232368da578bdd620733ac9bbf6687a054c16d))
* 16 暫定対応としてEmbedsの制限を超えるメッセージは丸めるように修正 ([b8f30a4](https://github.com/tsukuba-neu/msd-cli/commit/b8f30a43a46d033bf0b0bd7ba7e6a02184fc3867))
* 16 添付ファイルがない場合でもアップロードしようとする問題を修正 ([8640e39](https://github.com/tsukuba-neu/msd-cli/commit/8640e39c3c0166eedabdd66310fd3b4bf7927f20))
* 16 添付ファイルのみのメッセージを出力した際にエラーが出る問題を修正 ([5d4c7ad](https://github.com/tsukuba-neu/msd-cli/commit/5d4c7ad9dc8d5fd9d179ab103f3c62999d3bab32))
* 16 添付ファイルのメッセージのタイムスタンプが重複してしまう問題を修正 ([98410b3](https://github.com/tsukuba-neu/msd-cli/commit/98410b3942d810aae6f1ff2eae6b13e2358b9044))
* 16 環境変数を分離 ([c6d8ba0](https://github.com/tsukuba-neu/msd-cli/commit/c6d8ba07336e133dbff17ba54ee741d3d454dd18))
* 17 メッセージを削除できない問題を修正 ([bf3ca7e](https://github.com/tsukuba-neu/msd-cli/commit/bf3ca7ef08d32df8b6feb1371c0d9c6f738c5003))
* 20 データ構造を変更 ([213f69d](https://github.com/tsukuba-neu/msd-cli/commit/213f69dde3d2f93354c8f96f80a27a4672e0e3ae))
* 20 パッケージを更新 ([5410aa6](https://github.com/tsukuba-neu/msd-cli/commit/5410aa66d0639260d371f31a65853f867658c693))
* 20 ユーザーの画像ファイルがDiscordのチャンネルでホストされるように実装 ([1f12065](https://github.com/tsukuba-neu/msd-cli/commit/1f12065e99ccf795a8e8db3dd65d048da99c5601))
* 23 関数名をリネーム ([643762c](https://github.com/tsukuba-neu/msd-cli/commit/643762c8a47d2630795e950b6bd5079327b89c7b))
* 24 destroyの一括実行コマンドは確認をスキップするように修正 ([3508d2b](https://github.com/tsukuba-neu/msd-cli/commit/3508d2b0e04d5cad3e9c7f77b60532b3b1356399))
* 24 コマンドの不要なエスケープを削除 ([3a75f2f](https://github.com/tsukuba-neu/msd-cli/commit/3a75f2f257ab1e142434d0334f45693e2ce2422e))
* 24 チャンネルギルドの不要な作成をしないように修正 ([76eaf20](https://github.com/tsukuba-neu/msd-cli/commit/76eaf2057a00ba47c21a570717d69d87279b47bf))
* 24 関数がstatusを返す必要がないように修正 ([99e8084](https://github.com/tsukuba-neu/msd-cli/commit/99e808427ce433a825500427970be4faf453346f))
* 3 @types/nodeにfsPromises.constantsが無い問題が解消されたので修正 ([768d795](https://github.com/tsukuba-neu/msd-cli/commit/768d795989318cb0ba35e92c41924447c8f20b86))
* 3 Bot Idを照合するように修正 ([d328e45](https://github.com/tsukuba-neu/msd-cli/commit/d328e45187e4da9537e036bd1f2934013dc781a4))
* 3 clientのパスを変更 ([caac68c](https://github.com/tsukuba-neu/msd-cli/commit/caac68c1966471401a8a888a120422fe6f17b064))
* 3 DiscordとSlackのクライアントを別ファイルに分けるように修正 ([3d520c6](https://github.com/tsukuba-neu/msd-cli/commit/3d520c6f0b2f38c579dad4c78ca4d174d9169ed9))
* 3 doc stringを微修正 ([a176db2](https://github.com/tsukuba-neu/msd-cli/commit/a176db2e05033db4fd637bbc9e62963669e23257))
* 3 MIGRATE_ARCHIVEオプションのエラーメッセージ漏れを修正 ([8084356](https://github.com/tsukuba-neu/msd-cli/commit/80843562d143be7249f46e0b1775828b5afe61a7))
* 3 READMEの文言を微修正 ([a6ce1c3](https://github.com/tsukuba-neu/msd-cli/commit/a6ce1c31acad95364df972967fff788c7dd11a94))
* 3 READMEを細分化 ([c34cb82](https://github.com/tsukuba-neu/msd-cli/commit/c34cb8298c501885c2bac4ab3ce4242778e58aad))
* 3 spinnerをシンプルに修正 ([c1c8ea7](https://github.com/tsukuba-neu/msd-cli/commit/c1c8ea7b6b1ac26e779c4a63addf15a82d146b90))
* 3 エイリアスを追加 ([31109ca](https://github.com/tsukuba-neu/msd-cli/commit/31109caa08c190780ff513d15837a877896663b2))
* 3 コマンド1つでbuildとdeploy可能なstartコマンドを追加 ([3d53185](https://github.com/tsukuba-neu/msd-cli/commit/3d53185a9faab5dca493433bfe4451b540cd8872))
* 3 チャンネルファイルに削除フラグを追加 ([b9e918b](https://github.com/tsukuba-neu/msd-cli/commit/b9e918b6c240dd926008a1b1dd1f7c687f1e1e59))
* 3 テキストの最初に切り取り線を入れるように修正 ([f9f75f0](https://github.com/tsukuba-neu/msd-cli/commit/f9f75f0ddad3d0d930eba47e097581beceb7b0de))
* 3 ドキュメントの文言を微修正 ([0006ab5](https://github.com/tsukuba-neu/msd-cli/commit/0006ab54a2d0dba3a74d0891380c667d4d51df21))
* 3 パッケージを更新 ([dc5d463](https://github.com/tsukuba-neu/msd-cli/commit/dc5d463ad7589449c631b8df896007de73cbde92))
* 3 パラメーターの取得処理のエラーメッセージ出力をシンプルに修正 ([a39f2ef](https://github.com/tsukuba-neu/msd-cli/commit/a39f2efbbc659d16cb478b4445e1742e8d57e5dc))
* 3 メッセージをデプロイできる機能を追加(WIP) ([e38bd7a](https://github.com/tsukuba-neu/msd-cli/commit/e38bd7a57c7a55ad00fce92c86a94846bc7eac23))
* 3 メッセージを作成する処理をリファクタリング ([a7d5f33](https://github.com/tsukuba-neu/msd-cli/commit/a7d5f3387c701e398e18e9751c0511474c3c1e38))
* 3 メッセージを削除するコマンドを追加 ([37c25f5](https://github.com/tsukuba-neu/msd-cli/commit/37c25f5e7f8228cf512d4b420d14803d8aea3f8b))
* 3 リネーム ([115d846](https://github.com/tsukuba-neu/msd-cli/commit/115d846c4173d4147eb988891cbf51f92f73cc6e))
* 3 リネーム ([5ca1d2b](https://github.com/tsukuba-neu/msd-cli/commit/5ca1d2bbf4c9de4ab6e21b83ba13ebe0ae3e1830))
* 3 リネーム ([aa099fb](https://github.com/tsukuba-neu/msd-cli/commit/aa099fb41c012ad5751584e7e720767245ce199e))
* 3 リネーム ([d07a50c](https://github.com/tsukuba-neu/msd-cli/commit/d07a50ceab4b4262df92ae5d81ebd6c1494ad854))
* 3 リネーム ([ee9431e](https://github.com/tsukuba-neu/msd-cli/commit/ee9431e831a7a69780c950077f306f761f7414a2))
* 3 リネーム ([bcf92b8](https://github.com/tsukuba-neu/msd-cli/commit/bcf92b8e5f6d2574dd61e22d7be4a73ac50aa990))
* 3 リネーム ([803bc32](https://github.com/tsukuba-neu/msd-cli/commit/803bc32ea7fefeeae42e66937d6930dc2727a284))
* 3 リファクタリング ([9c40ce8](https://github.com/tsukuba-neu/msd-cli/commit/9c40ce863fb0ef3c25894dc3aa0a247cbe8a09a9))
* 3 リファクタリング ([0259a46](https://github.com/tsukuba-neu/msd-cli/commit/0259a46d8644303d527b98d4775f3a430cad37d4))
* 3 リファクタリング ([3f8d633](https://github.com/tsukuba-neu/msd-cli/commit/3f8d63345779e4271a38099033d5d63ed1468016))
* 3 リファクタリング ([e58ac52](https://github.com/tsukuba-neu/msd-cli/commit/e58ac52d9d61f0933c604c9370abcf3c5d8b0c7b))
* 3 リファクタリング ([9eaf6b9](https://github.com/tsukuba-neu/msd-cli/commit/9eaf6b9f5a493dfe25915aba335cce9444b1d70a))
* 3 不要なパッケージを削除 ([042735a](https://github.com/tsukuba-neu/msd-cli/commit/042735ac86174b623cf0d2672e888c421d3797e6))
* 3 不要な処理を削除 ([211dfd7](https://github.com/tsukuba-neu/msd-cli/commit/211dfd7e7876f20b9d10ef7a345abd958ea47873))
* 3 切り取り線の表示オプションを.encrc.sampleファイルに追加 ([aeb2443](https://github.com/tsukuba-neu/msd-cli/commit/aeb24433904206e14b5ed56cb557906a219ba6f6))
* 3 切り取り線の表示をオプション選択に修正 ([29dd3b5](https://github.com/tsukuba-neu/msd-cli/commit/29dd3b50683163ae5e90fdf8973f2002c5720b1b))
* 3 複数のスクリプトを並列または順次実行できるように修正 ([73ae288](https://github.com/tsukuba-neu/msd-cli/commit/73ae288d34c4837b75b734c6af05f6b83c3e7c8b))
* 57 Discordのクライアントがプロパティにアクセスできるまで待機する処理を追加 ([0d94c85](https://github.com/tsukuba-neu/msd-cli/commit/0d94c854f70cce2811076d301c9c4205baf9362b))
* 58 is_botの値を参照しないように修正 ([5e2e261](https://github.com/tsukuba-neu/msd-cli/commit/5e2e26157b3e1212d9f710fde4032b3ad8d39fb7))
* 60 タイポを修正 ([0f0dca0](https://github.com/tsukuba-neu/msd-cli/commit/0f0dca031d2387908acb284009cda26e72442924))
* 64 envのコメントを削除 ([b04fb3f](https://github.com/tsukuba-neu/msd-cli/commit/b04fb3f74be4800393509aad8eebc7ede8676c13))
* 64 footerにタイムスタンプを表示するように修正 ([82d82cc](https://github.com/tsukuba-neu/msd-cli/commit/82d82cc14a400aeb77d1d63b493487c06326e01b))
* 64 Prismaのmigrationsを含めないように修正 ([b650b68](https://github.com/tsukuba-neu/msd-cli/commit/b650b68210d52abf972399f730add68d95cf67e0))
* 64 メッセージをEmbedのdescriptionに入れるように修正 ([a1832c7](https://github.com/tsukuba-neu/msd-cli/commit/a1832c7431105401fefbbc69cb034f92f0d14a35))
* 64 ユーザー名の横の投稿時刻を削除 ([18e780d](https://github.com/tsukuba-neu/msd-cli/commit/18e780d54adfa880180cfdea29a48614c7a286ec))
* 64 リネーム ([15ad963](https://github.com/tsukuba-neu/msd-cli/commit/15ad963dd22a190dcf045b235a292c47b9c3bb3f))
* 64 稀にクライアント作成からコマンドが止まるためコメントアウト ([d7354db](https://github.com/tsukuba-neu/msd-cli/commit/d7354db3bf3804ae0a1f7e1f940010fde248a36d))
* 70 ドキュメントを修正 ([dd856cb](https://github.com/tsukuba-neu/msd-cli/commit/dd856cb05ed5e50f8f090e6f404f823e5540a41c))
* 75 Node.jsとnpmをバージョンアップ ([199952f](https://github.com/tsukuba-neu/msd-cli/commit/199952ffd3605d229a53611616211d361d1acf71))
* 75 パッケージを更新 ([eb694fd](https://github.com/tsukuba-neu/msd-cli/commit/eb694fdb14ecb1d826242e1d64807871d8eb44dd))
* 75 リプライメッセージがデプロイできない問題を修正 ([dcde598](https://github.com/tsukuba-neu/msd-cli/commit/dcde59874bbb44e324d116ba7388d4ff8731d903))
* 77 Todo TreeのFIXMEのタグをFIXにリネーム ([8acef03](https://github.com/tsukuba-neu/msd-cli/commit/8acef033f1c9bdc21ad550eb3a409f20264113fa))
* 77 クライアントの作成処理が止まる問題を修正 ([29e3369](https://github.com/tsukuba-neu/msd-cli/commit/29e3369c5f3186556ab886ecef55668f2e592124))
* 8 カテゴリーファイルが正常に作成されない問題を修正 ([a97ce09](https://github.com/tsukuba-neu/msd-cli/commit/a97ce09398b47f5fa57c62105375939ba5b31c4d))
* 80 メッセージのデプロイ失敗時のエラーメッセージを修正 ([57c7808](https://github.com/tsukuba-neu/msd-cli/commit/57c7808b4fb36f6657d7ecee0223a5e40b6ca890))
* 83 fileのライブラリの処理をuserとchannelのライブラリに分離 ([adeb4a2](https://github.com/tsukuba-neu/msd-cli/commit/adeb4a2d932b6088b7bd7fc88e306cf7c8bfad0e))
* 83 node修飾子をつけるように修正 ([23dd91a](https://github.com/tsukuba-neu/msd-cli/commit/23dd91a0142443c9bef2e37f836c43e571fe4ae3))
* 83 クライアント作成時にリトライ処理を追加 ([f642f1b](https://github.com/tsukuba-neu/msd-cli/commit/f642f1b785e156eac1834ab7bb2704d76a810461))
* 83 パッケージを更新 ([a1bf3d5](https://github.com/tsukuba-neu/msd-cli/commit/a1bf3d59d5d61aa29fd72ec5f40cf541e9e49c29))
* 83 メッセージの添付ファイルをmsd-fileチャンネルでホスティングするように修正 ([3cfa365](https://github.com/tsukuba-neu/msd-cli/commit/3cfa3659e24fc90922124d7f636ccda2c5652bbf))
* 83 ユーザーの画像をデプロイするコマンドを、ファイルをデプロイするコマンドに拡大修正 ([e1b0010](https://github.com/tsukuba-neu/msd-cli/commit/e1b001066f51af4b1498f740f8074a7f87f219f8))
* 83 リンク付き文字列を別のEmbedに表示するように修正 ([60ce48a](https://github.com/tsukuba-neu/msd-cli/commit/60ce48a0ed356f2aa4aa652965c04ed619ee77ae))
* 83 不要なファイルデプロイ関数を削除 ([53738c5](https://github.com/tsukuba-neu/msd-cli/commit/53738c52c3dc2178bd4e9fd99e66dcd5221ed306))
* 83 切り取り線を廃止 ([a2e3b65](https://github.com/tsukuba-neu/msd-cli/commit/a2e3b65538d3205696329d3d5cb6820bbc6991da))
* 83 添付ファイルがない場合にnullが入る問題を修正 ([c4b6c13](https://github.com/tsukuba-neu/msd-cli/commit/c4b6c13f6b10280880f8d279584ca6bb39664f37))
* 83 確認処理を修正 ([53f4782](https://github.com/tsukuba-neu/msd-cli/commit/53f4782e96eb9eeb8b8593a74b92e3de2de1f0f1))
* 92 Prettierでフォーマット ([a795cf4](https://github.com/tsukuba-neu/msd-cli/commit/a795cf40cd1e21e28d84f59e4669ea850c57224f))
* embedsが10件を超えないよう制限する ([46201f0](https://github.com/tsukuba-neu/msd-cli/commit/46201f041e2ef2c5e7b94c76790ec52366890fe4))
* Slackbotの情報はダミーデータを使用する ([c683911](https://github.com/tsukuba-neu/msd-cli/commit/c683911e2f06ad4823a65a6324d7c3bf3a7e8213))
* URLの検出に最短マッチを使用する ([db95779](https://github.com/tsukuba-neu/msd-cli/commit/db957797b18e2d75dfea7382ca9db47697a8fd9a))
* ユーザIDの桁数が10以外のメンションに対応する ([c1cbc29](https://github.com/tsukuba-neu/msd-cli/commit/c1cbc295631b943d17303496303df53b46da9fef))

## [1.5.5](https://github.com/revoltage-inc/msd-cli/compare/v1.5.4...v1.5.5) (2023-02-18)


### Bug Fixes

* 154 パッケージの更新を自動マージするworkflowを追加 ([cf05e63](https://github.com/revoltage-inc/msd-cli/commit/cf05e631a4828019e2775ba0a6dd0d2ebdc51bbb))
* 154 パッケージを更新 ([88dd78f](https://github.com/revoltage-inc/msd-cli/commit/88dd78fb7467ab3fc4be24f5beb9e2c42ab15a0c))
* 154 リネーム ([79159ba](https://github.com/revoltage-inc/msd-cli/commit/79159bac9a3d9af6970c4b8d44bfb2adf8d80381))

## [1.5.4](https://github.com/revoltage-inc/msd-cli/compare/v1.5.3...v1.5.4) (2023-01-28)


### Bug Fixes

* 150 json5の脆弱性のあるバージョンをオーバーライド ([ecf4ce7](https://github.com/revoltage-inc/msd-cli/commit/ecf4ce7b416b1e93c900c8f00ca555e0beb906e8))
* 150 パッケージを更新 ([a0af6c0](https://github.com/revoltage-inc/msd-cli/commit/a0af6c039e4bc94bd69ad7fdb9090c46a3230c1a))

## [1.5.3](https://github.com/revoltage-inc/msd-cli/compare/v1.5.2...v1.5.3) (2022-11-26)


### Bug Fixes

* 147 コマンドのディレクトリをリネーム ([445e4fd](https://github.com/revoltage-inc/msd-cli/commit/445e4fd7fc9f85e8653da552cc35872342d10a5d))
* 147 コマンド実行時に警告が出ないように修正 ([c62ee92](https://github.com/revoltage-inc/msd-cli/commit/c62ee921d721dd77cefeebc09bec870c45753996))

## [1.5.2](https://github.com/revoltage-inc/msd-cli/compare/v1.5.1...v1.5.2) (2022-11-26)


### Bug Fixes

* 144 パッケージを更新 ([21976e6](https://github.com/revoltage-inc/msd-cli/commit/21976e6acc599e7ad988911858fce606de9baa63))
* 144 初期設定のリンクを修正 ([9c135a8](https://github.com/revoltage-inc/msd-cli/commit/9c135a80fafd535cffd82bdb0e44337baed3a3ce))

## [1.5.1](https://github.com/revoltage-inc/msd-cli/compare/v1.5.0...v1.5.1) (2022-11-15)


### Bug Fixes

* Slackbotの情報はダミーデータを使用する ([c683911](https://github.com/revoltage-inc/msd-cli/commit/c683911e2f06ad4823a65a6324d7c3bf3a7e8213))
* ユーザIDの桁数が10以外のメンションに対応する ([c1cbc29](https://github.com/revoltage-inc/msd-cli/commit/c1cbc295631b943d17303496303df53b46da9fef))

## [1.3.1](https://github.com/revoltage-inc/msd-cli/compare/v1.3.0...v1.3.1) (2022-10-04)


### Bug Fixes

* 106 メッセージのデプロイ対象・削除対象の取得がずれる問題を修正 ([91915a4](https://github.com/revoltage-inc/msd-cli/commit/91915a4876f745fc8d35cf6a16777cd27124a2e0))
* 106 リファクタリング ([bcb0117](https://github.com/revoltage-inc/msd-cli/commit/bcb0117225f05b0edd65f1d37cbc9080cbee9175))
* 106 改行を挿入 ([a9ea67e](https://github.com/revoltage-inc/msd-cli/commit/a9ea67e80361bd9c6fe1f0ad42ac11874a084525))

## [1.2.2](https://github.com/revoltage-inc/msd-cli/compare/v1.2.1...v1.2.2) (2022-09-24)


### Bug Fixes

* 92 Prettierでフォーマット ([a795cf4](https://github.com/revoltage-inc/msd-cli/commit/a795cf40cd1e21e28d84f59e4669ea850c57224f))

## [1.2.1](https://github.com/revoltage-inc/msd-cli/compare/v1.2.0...v1.2.1) (2022-09-24)


### Bug Fixes

* 83 fileのライブラリの処理をuserとchannelのライブラリに分離 ([adeb4a2](https://github.com/revoltage-inc/msd-cli/commit/adeb4a2d932b6088b7bd7fc88e306cf7c8bfad0e))
* 83 node修飾子をつけるように修正 ([23dd91a](https://github.com/revoltage-inc/msd-cli/commit/23dd91a0142443c9bef2e37f836c43e571fe4ae3))
* 83 クライアント作成時にリトライ処理を追加 ([f642f1b](https://github.com/revoltage-inc/msd-cli/commit/f642f1b785e156eac1834ab7bb2704d76a810461))
* 83 パッケージを更新 ([a1bf3d5](https://github.com/revoltage-inc/msd-cli/commit/a1bf3d59d5d61aa29fd72ec5f40cf541e9e49c29))
* 83 メッセージの添付ファイルをmsd-fileチャンネルでホスティングするように修正 ([3cfa365](https://github.com/revoltage-inc/msd-cli/commit/3cfa3659e24fc90922124d7f636ccda2c5652bbf))
* 83 ユーザーの画像をデプロイするコマンドを、ファイルをデプロイするコマンドに拡大修正 ([e1b0010](https://github.com/revoltage-inc/msd-cli/commit/e1b001066f51af4b1498f740f8074a7f87f219f8))
* 83 リンク付き文字列を別のEmbedに表示するように修正 ([60ce48a](https://github.com/revoltage-inc/msd-cli/commit/60ce48a0ed356f2aa4aa652965c04ed619ee77ae))
* 83 不要なファイルデプロイ関数を削除 ([53738c5](https://github.com/revoltage-inc/msd-cli/commit/53738c52c3dc2178bd4e9fd99e66dcd5221ed306))
* 83 切り取り線を廃止 ([a2e3b65](https://github.com/revoltage-inc/msd-cli/commit/a2e3b65538d3205696329d3d5cb6820bbc6991da))
* 83 添付ファイルがない場合にnullが入る問題を修正 ([c4b6c13](https://github.com/revoltage-inc/msd-cli/commit/c4b6c13f6b10280880f8d279584ca6bb39664f37))
* 83 確認処理を修正 ([53f4782](https://github.com/revoltage-inc/msd-cli/commit/53f4782e96eb9eeb8b8593a74b92e3de2de1f0f1))

## [1.1.3](https://github.com/revoltage-inc/msd-cli/compare/v1.1.2...v1.1.3) (2022-09-23)


### Bug Fixes

* 75 Node.jsとnpmをバージョンアップ ([199952f](https://github.com/revoltage-inc/msd-cli/commit/199952ffd3605d229a53611616211d361d1acf71))
* 75 パッケージを更新 ([eb694fd](https://github.com/revoltage-inc/msd-cli/commit/eb694fdb14ecb1d826242e1d64807871d8eb44dd))
* 75 リプライメッセージがデプロイできない問題を修正 ([dcde598](https://github.com/revoltage-inc/msd-cli/commit/dcde59874bbb44e324d116ba7388d4ff8731d903))

## [1.1.2](https://github.com/revoltage-inc/msd-cli/compare/v1.1.1...v1.1.2) (2022-09-21)


### Bug Fixes

* 77 Todo TreeのFIXMEのタグをFIXにリネーム ([8acef03](https://github.com/revoltage-inc/msd-cli/commit/8acef033f1c9bdc21ad550eb3a409f20264113fa))
* 77 クライアントの作成処理が止まる問題を修正 ([29e3369](https://github.com/revoltage-inc/msd-cli/commit/29e3369c5f3186556ab886ecef55668f2e592124))

## [1.1.1](https://github.com/revoltage-inc/msd-cli/compare/v1.1.0...v1.1.1) (2022-09-20)


### Bug Fixes

* 80 メッセージのデプロイ失敗時のエラーメッセージを修正 ([57c7808](https://github.com/revoltage-inc/msd-cli/commit/57c7808b4fb36f6657d7ecee0223a5e40b6ca890))

## [1.0.8](https://github.com/revoltage-inc/msd-cli/compare/v1.0.7...v1.0.8) (2022-09-05)


### Bug Fixes

* 70 ドキュメントを修正 ([dd856cb](https://github.com/revoltage-inc/msd-cli/commit/dd856cb05ed5e50f8f090e6f404f823e5540a41c))

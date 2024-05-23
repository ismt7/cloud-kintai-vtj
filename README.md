# クラウド勤怠

社内向けシステムとして開発した勤怠管理システムです。

## 準備

[Hashicorp Vault](https://www.vaultproject.io/)を使ってシークレット管理を行っています。

```sh
.devcontainer/setup.sh
```

<!-- このプロジェクトでは、`.env`ファイルの情報を使用しており、`.env`ファイルの管理には、dotenvのクラウドサービスを利用しています。\
次のコマンドを実行して`.env`ファイルを取得します。\
このコマンドを使用する前にdotenvのアカウントを作成し、オーガナイゼーションに招待されている必要があります。\
アカウントが配布された覚えがない場合は、開発責任者に問い合わせてください。

```sh
npx dotenv-vault login
npx dotenv-vault pull
``` -->

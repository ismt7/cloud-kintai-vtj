# クラウド勤怠

社内向けシステムとして開発した勤怠管理システムです。

## 準備

このプロジェクトでは、`.env`ファイルの情報を使用しており、`.env`ファイルの管理には、dotenvのクラウドサービスを利用しています。\
次のコマンドを実行して`.env`ファイルを取得します。\
このコマンドを使用する前にdotenvのアカウントを作成し、オーガナイゼーションに招待されている必要があります。\
アカウントが配布された覚えがない場合は、開発責任者に問い合わせてください。

```sh
npx dotenv-vault login
npx dotenv-vault pull
```

## E2Eテスト

### 準備

ドライバーなどの必要なパッケージをインストールします。

```sh
npx playwright install
```

`playwright/.auth/user.json`は、テスト中に使用する認証情報を保持します。\
ファイルが存在しないとエラーが発生するため、ファイルが存在しない場合は作成します。

```sh
FILE_PATH=playwright/.auth;mkdir -p $FILE_PATH && [ ! -f $FILE_PATH/user.json ] && touch $FILE_PATH/user.json && echo "{}" > $FILE_PATH/user.json
```

## UIツールを起動

UIツールを起動します。

```sh
npx playwright test --ui
```

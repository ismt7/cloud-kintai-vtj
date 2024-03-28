# クラウド勤怠

勤怠を管理するためのシステムです。

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

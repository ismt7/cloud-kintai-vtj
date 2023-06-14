# クラウド勤怠

勤怠を管理するためのシステムです。

## 目次(Index)

- [目次(Index)](#目次index)
- [準備(Preparation)](#準備preparation)
- [Available Scripts](#available-scripts)

## 準備(Preparation)

- [Dev container向けのSSHキーを作成](https://github.com/vtj-devops/garaku-frontend/wiki/SSH%E3%82%AD%E3%83%BC%E3%82%92%E4%BD%9C%E6%88%90)
- [Dev containerの環境変数を作成](https://github.com/vtj-devops/garaku-frontend/wiki/%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E4%BD%9C%E6%88%90)

## Available Scripts

プロジェクト内で次のコマンドを実行することができます。

| Script | Description |
| --- | --- |
| `make storybook` | Storybookを起動します。 |
| `make openapi-codegen` | APIクライアントを自動生成する。<br>実行時には、バックグラウンドのAPIサーバーが起動されている必要があります。 |
| `npm start` | 開発モードでアプリケーションを起動します。<br>Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>The page will reload if you make edits.<br>You will also see any lint errors in the console. |
| `npm test` | テストランナーをインタラクティブウォッチモードで起動します。<br>詳細は[running tests](https://facebook.github.io/create-react-app/docs/running-tests)を参照してください。 |
| `npm run build` | プロダクションモードでアプリケーションをビルドします。<br>ビルドされたアプリケーションは`build`フォルダに保存されます。<br>詳細は[deployment](https://facebook.github.io/create-react-app/docs/deployment)を参照してください。 |

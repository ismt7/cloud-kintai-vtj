# クラウド勤怠

勤怠を管理するためのシステムです。

## 準備チェックリスト

- [ ] `.devcontainer/devcontainer.env`ファイルに必要なキー情報を記載
  - [AWS CLIの初期設定](https://github.com/vtj-devops/garaku-general/wiki/AWS-CLI%E3%81%AE%E5%88%9D%E6%9C%9F%E8%A8%AD%E5%AE%9A)
  - [OpeAIの初期設定](https://github.com/vtj-devops/garaku-general/wiki/OpenAI%E3%81%AE%E5%88%9D%E6%9C%9F%E8%A8%AD%E5%AE%9A)
- [ ] Gitのユーザ名とメールアドレスを設定
  - [Gitの初期設定](https://github.com/vtj-devops/garaku-general/wiki/Git%E3%81%AE%E5%88%9D%E6%9C%9F%E8%A8%AD%E5%AE%9A)

## Available Scripts

プロジェクト内で次のコマンドを実行することができます。

| Script | Description |
| --- | --- |
| `make storybook` | Storybookを起動します。 |
| `make openapi-codegen` | APIクライアントを自動生成する。<br>実行時には、バックグラウンドのAPIサーバーが起動されている必要があります。 |
| `npm start` | 開発モードでアプリケーションを起動します。<br>Open [http://localhost:5173](http://localhost:5173) to view it in the browser.<br>The page will reload if you make edits.<br>You will also see any lint errors in the console. |
| `npm test` | テストランナーをインタラクティブウォッチモードで起動します。<br>詳細は[running tests](https://facebook.github.io/create-react-app/docs/running-tests)を参照してください。 |
| `npm run build` | プロダクションモードでアプリケーションをビルドします。<br>ビルドされたアプリケーションは`build`フォルダに保存されます。<br>詳細は[deployment](https://facebook.github.io/create-react-app/docs/deployment)を参照してください。 |

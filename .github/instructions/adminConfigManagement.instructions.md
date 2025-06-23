---
applyTo: "src/pages/admin/AdminConfigManagement/AdminConfigManagement.tsx"
---

# 管理者設定管理ページ

このページは、管理者がアプリケーションの設定を管理するためのインターフェースを提供します。

設定の追加、編集、削除が可能です。

**備考:**
このページの設定データは

- `amplify/backend/api/garakufrontend/schema.graphql` の `AppConfig` モデル
- `src/hooks/useAppConfig/useAppConfig.ts`
  と連動しています。

バックエンドのスキーマやフックの仕様変更時は、このページの連携もご注意ください。

**注意:**
`amplify/backend/api/garakufrontend/schema.graphql` を変更した場合は、必ず `amplify push` を実行してください。
ただし、実行するかどうかの最終的な判断は開発者が行ってください。

**実装ルール:**
新しく設定項目を追加する場合は、必ず新しいファイルにコンポーネントを定義し、そのコンポーネントをこのページから参照する形で実装してください。

また、`src/hooks/useAppConfig/useAppConfig.tsx` に新しい関数を追加する場合は、必要に応じて `src/Layout.tsx` にも処理を追加してください。

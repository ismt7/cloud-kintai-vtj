---
to: src/components/<%= h.changeCase.snake(name) %>/<%= h.changeCase.pascal(name) %>.mdx
---
<%
ComponentName = h.changeCase.pascal(name)
DirectoryName = h.changeCase.snake(name)
-%>
import {
  Canvas,
  Meta,
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
  Source,
  Story,
} from "@storybook/blocks";

import * as <%= ComponentName %>Stories from "./<%= ComponentName %>.stories";

<Meta of={<%= ComponentName %>Stories} />

# <%= ComponentName %>

アプリケーション内で使用するコンポーネントです。\
具体的なユースケースが決まっているものは、ストーリーに記載されています。

<Primary />

# パラメーター

コンポーネント内で使用できるパラメーターです。\
パラメーターを変更することで上にあるコンポーネントが変化します。

<Controls />

# ストーリー

コンポーネントのユースケースを記載しています。\
既存のコンポーネントを使用する際に参考にしてください。

---
to: src/__tests__/components/<%= h.changeCase.snake(name) %>/<%= h.changeCase.pascal(name) %>.test.tsx
---
<%
ComponentName = h.changeCase.pascal(name)
DirectoryName = h.changeCase.snake(name)
-%>
import { render } from "@testing-library/react";

import <%= ComponentName %> from "../../../components/<%= DirectoryName %>/<%= ComponentName %>";

describe("<%= ComponentName %> Component(", () => {
  test.concurrent("レイアウト崩れが発生していないか(ビジュアルリグレッション)", () => {
    const { asFragment } = render(<<%= ComponentName %> />);
    expect(asFragment()).toMatchSnapshot();
  });
});

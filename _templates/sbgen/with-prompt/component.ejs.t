---
to: src/components/<%= h.changeCase.snake(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
<%
ComponentName = h.changeCase.pascal(name)
DirectoryName = h.changeCase.snake(name)
-%>
export default function <%= ComponentName %>() {
  return <div>This is <%= ComponentName %> component.</div>;
}

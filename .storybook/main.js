module.exports = {
  // "stories": ["../src/stories/**/*.stories.mdx", "../src/stories/**/*.stories.@(js|jsx|ts|tsx)", "../src/components/**/*.stories.mdx", "../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  "stories": ["../src"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app", "@storybook/addon-a11y", "@storybook/addon-mdx-gfm"],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  features: {
    previewMdx2: true
  },
  staticDirs: ["../public"],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript'
  },
  docs: {
    autodocs: true
  }
};
import { configure, addParameters, addDecorator } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { muiTheme } from 'storybook-addon-material-ui';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
addDecorator(muiTheme)
//TODO: Automatically load themes from @phoenix-ui/theme here
//addDecorator(muiTheme([{...}]))

const req = require.context('../packages', true, 
  /^((?![\\/]node_modules[\\/]).)*\.stories\.(js|mdx)$/
);
const load = filename =>  req(filename);

function loadStories() {
  req.keys()
    .filter(filename => !filename.match(/packages\/.*\/node_modules/))
    .forEach(load);
}

configure(loadStories, module);

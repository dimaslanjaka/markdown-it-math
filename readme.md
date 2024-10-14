# markdown-it-mathemathics
markdown-it mathemathics plugin

## Features

- **katex** engine

## Samples

### KaTeX

render markdown with **KaTeX**

```js
import MarkdownIt from 'markdown-it';
import { fs } from 'sbg-utility';
import MarkdownItMathematics from '../src';

const markdown = fs.readFileSync('test/fixtures/sample.md', 'utf-8');

const md = new MarkdownIt('default', { linkify: false });
// `KaTeX` options can be supplied with the second argument to use.
md.use(MarkdownItMathematics(md, { parser: 'katex', skipDelimitersCheck: true, throwOnError: false, errorColor: '#cc0000' }));
const result = md.render(markdown, {});
console.log(result);
```

Include the **KaTeX** stylesheet in your html:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css"
/>
```

const MarkdownIt = require('markdown-it');
const { fs } = require('sbg-utility');
const markdownItKatexPlugin = require('../dist/index.cjs');

const markdown = fs.readFileSync('test/fixtures/sample.md', 'utf-8');

const md = new MarkdownIt('default', { linkify: false });
md.use(markdownItKatexPlugin);
// double backslash is required for javascript strings, but not html input
const result = md.render(markdown, {});
console.log(result);

import MarkdownIt from 'markdown-it';
import { fs } from 'sbg-utility';
import MarkdownItMathematics from '../src';

const markdown = fs.readFileSync('test/fixtures/sample.md', 'utf-8');

const md = new MarkdownIt('default', { linkify: false });
md.use(MarkdownItMathematics(md, { parser: 'katex', skipDelimitersCheck: true }));
const result = md.render(markdown, {});
console.log(result);

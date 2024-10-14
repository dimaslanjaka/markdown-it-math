import MarkdownIt from 'markdown-it';
import { fs } from 'sbg-utility';
import markdownItKatexPlugin from '../src/markdown-it-katex';

const markdown = fs.readFileSync('test/fixtures/sample.md', 'utf-8');

const md = new MarkdownIt('default', { linkify: false });
md.use(markdownItKatexPlugin);
// double backslash is required for javascript strings, but not html input
const result = md.render(markdown, {});
console.log(result);

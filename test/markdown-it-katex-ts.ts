import MarkdownIt from 'markdown-it';
import path from 'path';
import { fs } from 'sbg-utility';
import { fileURLToPath } from 'url';
import markdownItKatexPlugin from '../src/markdown-it-katex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const markdown = fs.readFileSync(path.join(__dirname, 'fixtures/sample.md'), 'utf-8');

const md = new MarkdownIt('default', { linkify: false });
md.use(markdownItKatexPlugin);
// double backslash is required for javascript strings, but not html input
const result = md.render(markdown, {});
console.log(result);

import MarkdownIt from 'markdown-it';
import markdown_it_katex, { KatexPluginOptions } from './markdown-it-katex/index.js';

type MergedOptions = Partial<KatexPluginOptions>;

interface Options extends MergedOptions {
  [key: string]: any;
  parser?: 'katex';
}

const defaultConfig: Options = {
  parser: 'katex'
};

/**
 * @param md MarkdownIt instance
 * @param options
 * @returns
 */
export default function MarkdownItMathematics(md: MarkdownIt, options: Options) {
  const { parser = 'katex' } = Object.assign(defaultConfig, options);
  if (parser === 'katex') {
    return () => markdown_it_katex(md, options);
  }
}

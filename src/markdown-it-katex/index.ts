'use strict';

import katex from 'katex';
import MarkdownIt from 'markdown-it';
import block from './block.js';
import inline from './inline.js';

export interface KatexPluginOptions {
  throwOnError?: boolean;
  skipDelimitersCheck?: boolean;
  [key: string]: any; // Other optional properties for KaTeX options
}

export default function markdownItKatexPlugin(md: MarkdownIt, options: KatexPluginOptions = {}): void {
  const render = (latex: string, displayMode: boolean = false): string => {
    try {
      return katex.renderToString(latex, { ...options, displayMode });
    } catch (error) {
      if (options.throwOnError) {
        console.log(error);
      }

      return latex;
    }
  };

  // md.inline.ruler.after('escape', 'math_inline', (state: any, silent: boolean) =>
  //   inline(state, silent, options.skipDelimitersCheck)
  // );
  md.inline.ruler.after(
    'text',
    'my_rule',
    function replace(state) {
      return inline(state, false, options.skipDelimitersCheck);
    },
    { alt: options.alt || [] }
  );
  // md.block.ruler.after('blockquote', 'math_block', block, {
  //   alt: ['paragraph', 'reference', 'blockquote', 'list']
  // });
  md.block.ruler.after(
    'blockquote',
    'math_block',
    function (state) {
      return block(state, 0, 0, false);
    },
    {
      alt: ['paragraph', 'reference', 'blockquote', 'list']
    }
  );

  md.renderer.rules.math_inline = (tokens: any, idx: number) => render(tokens[idx].content);
  md.renderer.rules.math_block = (tokens: any, idx: number) => '<p>' + render(tokens[idx].content, true) + '</p>\n';
}

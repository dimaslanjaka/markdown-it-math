import { expect, test } from '@jest/globals';
import MarkdownIt from 'markdown-it';
import { load } from 'markdown-it-testgen';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
   this uses the markdown-it-testgen module to automatically generate tests
   based on an easy to read text file
 */
load(join(__dirname, 'fixtures/default.txt'), (data) => {
  data.fixtures.forEach((fixture) => {
    const md = new MarkdownIt();
    md.use(require('../index'), {
      skipDelimitersCheck: fixture.header === '`skipDelimitersCheck` option'
    });

    test(fixture.header, function () {
      var expected = fixture.second.text,
        actual = md.render(fixture.first.text);

      expect(actual).toEqual(expected);
    });
  });
});

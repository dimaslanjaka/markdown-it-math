'use strict';

import { isValidDelim } from './util.js';

/**
 * Handles inline math parsing.
 *
 * @param state - The state object containing the source string and position data
 * @param silent - Whether to perform actions silently (e.g., not adding tokens)
 * @param skipDelimitersCheck - Whether to skip the delimiter check
 * @returns True if inline math was successfully parsed, otherwise false
 */
export default function math_inline(state: any, silent: boolean, skipDelimitersCheck: boolean = false) {
  let match: number;
  let token: any;
  let res: { can_open: boolean; can_close: boolean };
  let pos: number;

  if (state.src[state.pos] !== '$') {
    return false;
  }

  res = isValidDelim(state, state.pos, skipDelimitersCheck);

  if (!res.can_open) {
    if (!silent) {
      state.pending += '$';
    }

    state.pos += 1;
    return true;
  }

  // First check for and bypass all properly escaped delimiters
  const start = state.pos + 1;
  match = start;

  while ((match = state.src.indexOf('$', match)) !== -1) {
    pos = match - 1;

    // Look for escapes, pos will point to the first non-escape when complete
    while (state.src[pos] === '\\') {
      pos -= 1;
    }

    // Even number of escapes means a valid closing delimiter is found
    if ((match - pos) % 2 === 1) {
      break;
    }

    match += 1;
  }

  // No closing delimiter found. Consume $ and continue.
  if (match === -1) {
    if (!silent) {
      state.pending += '$';
    }
    state.pos = start;
    return true;
  }

  // Check if we have empty content (e.g., $$). Do not parse.
  if (match - start === 0) {
    if (!silent) {
      state.pending += '$$';
    }
    state.pos = start + 1;
    return true;
  }

  // Check for valid closing delimiter
  res = isValidDelim(state, match, skipDelimitersCheck);
  if (!res.can_close) {
    if (!silent) {
      state.pending += '$';
    }
    state.pos = start;
    return true;
  }

  if (!silent) {
    token = state.push('math_inline', 'math', 0);
    token.markup = '$';
    token.content = state.src.slice(start, match);
  }

  state.pos = match + 1;
  return true;
}

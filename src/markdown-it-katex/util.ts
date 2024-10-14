'use strict';

interface DelimiterCheckResult {
  can_open: boolean;
  can_close: boolean;
}

/**
 * Test if potential opening or closing delimiter.
 * Assumes that there is a "$" at state.src[pos]
 *
 * @param state - The state object containing the source string and position data
 * @param pos - The current position in the source string
 * @param skip - Whether to skip certain checks
 * @returns Object indicating if it can open or close
 */
export function isValidDelim(
  state: { src: string; posMax: number },
  pos: number,
  skip: boolean = false
): DelimiterCheckResult {
  if (skip) {
    return {
      can_open: true,
      can_close: true
    };
  }

  let can_open = true;
  let can_close = true;

  const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
  const nextChar = pos + 1 <= state.posMax ? state.src.charCodeAt(pos + 1) : -1;

  // Check non-whitespace conditions for opening and closing,
  // and check that closing delimiter isn't followed by a number
  if (
    prevChar === 0x20 /* " " */ ||
    prevChar === 0x09 /* \t */ ||
    (nextChar >= 0x30 /* "0" */ && nextChar <= 0x39) /* "9" */
  ) {
    can_close = false;
  }
  if (nextChar === 0x20 /* " " */ || nextChar === 0x09 /* \t */) {
    can_open = false;
  }

  return {
    can_open,
    can_close
  };
}

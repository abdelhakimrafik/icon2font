export const DEFAULT_FONT_NAME = 'fonticon';
export const DEFAULT_PREFIX = 'ico';
export const DEFAULT_DELIMITER = '-';

/**
 * Unicode Private Use Area start.
 * https://en.wikipedia.org/wiki/Private_Use_Areas
 */
export const START_UNICODE = 0xea01;
export const COPYRIGHT = 'Create by icon2font <Abdelhakim RAFIK>';

export const SUPPORTED_FONTS = [
  { name: 'truetype', ext: 'ttf' },
  { name: 'embedded-opentype', ext: 'eot' },
  { name: 'woff', ext: 'woff' }
];

export enum request {
  CREATE_BUNDLE = 1,
  NOTIFY
}

export enum response {
  UPDATE_ICONS_NUMBER = 1,
  SAVE,
  ERROR,
  DUPLICATED_NAMES,
  NO_SELECTION
}

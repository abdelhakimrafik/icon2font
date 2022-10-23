export const DEFAULT_FONT_NAME = 'fonticon';

/**
 * Unicode Private Use Area start.
 * https://en.wikipedia.org/wiki/Private_Use_Areas
 */
export const START_UNICODE = 0xea01;

export enum request {
  CREATE_BUNDLE = 1
}

export enum response {
  UPDATE_ICONS_NUMBER = 1,
  SAVE,
  ERROR,
  DUPLICATED_NAMES,
  NO_SELECTION
}

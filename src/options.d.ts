export interface Options {
  // whether or not to clean meta props,
  // keeps only value, description, type by default, but can also be custom string array of keys.
  cleanMeta?: boolean | string[];
  defaultTokenset?: boolean | string;
}

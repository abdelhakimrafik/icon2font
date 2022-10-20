// necessary to make scss module work.
declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

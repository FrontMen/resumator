declare module "docxtemplater" {
  export = Docxtemplater;
}
declare class Docxtemplater {
  constructor();

  // Suggested usage v3.17 onwards
  constructor(zip: PizZip, options?: Docxtemplater.Options);

  // Setup prior to v3.17
  loadZip(zip: PizZip): this;
  setOptions(options: Docxtemplater.Options): this;

  setData(tags: { [key: string]: any }): this;

  render(): this;

  getZip(): PizZip;
}

declare namespace Docxtemplater {
  interface Options {
    modules?: any[];
    delimiters?: {
      start: string;
      end: string;
    };
  }
}

declare module "mammoth" {
  export interface input {
    arrayBuffer?: ArrayBuffer;
    buffer?: Buffer;
    path?: string;
  }
  export interface options {
    ignoreEmptyParagraphs?: boolean;
    includeDefaultStyleMap?: boolean;
    includeEmbeddedStyleMap?: boolean;
    styleMap?: styleMap;
  }
  export interface result {
    value: string;
    messages: message[];
  }
  export interface message {
    type: "warning" | "error";
    message: string;
    error?: Error;
  }
  export interface docx {
    toBuffer: () => Buffer;
  }

  export type styleMap = string[];

  function extractRawText(input: input): Promise<result>;
  function embedStyleMap(input: input, styleMap: styleMap);
}

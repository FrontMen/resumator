import ReactPDF from "@react-pdf/renderer";

declare module "@react-pdf/styled-components" {
  export default ReactPDF;
  export function Document(
    strings: TemplateStringsArray,
    ...expr: string[]
  ): ReactPDF.View {}

  export function Page(
    strings: TemplateStringsArray,
    ...expr: string[]
  ): ReactPDF.Page {}

  export function View(
    strings: TemplateStringsArray,
    ...expr: string[]
  ): ReactPDF.View {}

  export function Image(
    strings: TemplateStringsArray,
    ...expr: string[]
  ): ReactPDF.Image {}

  export function Text(
    strings: TemplateStringsArray,
    ...expr: string[]
  ): ReactPDF.Text {}

  export function Link(
    strings: TemplateStringsArray,
    ...expr: string[]
  ): ReactPDF.Link {}
}

declare module "*.ttf";

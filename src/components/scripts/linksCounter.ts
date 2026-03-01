import { ProductDocumentsObject} from "../../registry/interfaces.ts";

export function linksCounter (documentsArr: ProductDocumentsObject[]) {
  return documentsArr.length ?  documentsArr.filter((document: ProductDocumentsObject) => {
    return !!document.link
  }).length : 0
}
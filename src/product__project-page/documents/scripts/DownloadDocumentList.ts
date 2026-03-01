// import {dateFormatter} from "../../../components/scripts/dateFormatter.ts";

export function downloadDocumentList(productData) {
  const documents = productData.register_entity_documents;

  let documentListString = '';
  documents.forEach((doc, _) => {
    documentListString += `${doc.name ? doc.name : doc.gost_document.name} (${doc?.decimal_number || 'Отсутствует'})` + '\n';
  });
  // ${index + 1}.
  // ГОСТ: ${doc.gost ? doc.gost.gost_number : ''}
  //   Стадия: ${doc.gost_document ? doc.gost_document.project_stage : ''}
  //     Дата добавления: ${dateFormatter(doc.created_at)}
  //   Статус: ${doc.status == 'ok' ? 'В работе' : 'Удалён'}
  //     Ссылка: ${doc.link}\n\n

  const blob = new Blob([documentListString], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${productData?.deal?.customer || 'Список документов'}.txt`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
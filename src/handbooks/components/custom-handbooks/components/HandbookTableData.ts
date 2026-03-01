export abstract class HandbookTableData {  
  columns = [];
  title = '';
  data = [];
  abstract fetchData(): Promise<void>;
}
import {IAdditionalData} from "../product__project-page/additionalTables/interfaces.ts";

export interface RegistryAllTableDataType {
  developer: string;
  customer: string;
  documents: string;
  decimal_number: string;
  manager: string;
  deal_number: string;
  created_at: string;
  status: string;
  deal_date: string;
}

export interface ProductDocumentsDataType {
  gost: string,
  stage: string,
  title: string,
  documents: string,
  decimal_number: string,
  created_at: string
}

export interface EduTableDataType {
  id: string;
  link: string
  who_added: string
  comment: string
  add_date: string
}

export interface SpokepersonTableDataType {
  client_name: string
  phone_number: string
  email: string
  comment: string
}

export interface GostData {
  gost_number: string;
  id: string;
  name: string;
}

export interface DealData {
  customer_organization_id: string;
  id: string;
  developer_organization_id: string;
  deal_number: string;
  started_at: string;
  project_manager: string;
  customer: string;
  developer_organization: OrganizationData;
  organization: OrganizationData;
}

export interface OrganizationData {
  code: string;
  id: string;
  name: string;
}

export interface ManagerData {
  email: string;
  id: string;
  name: string;
}

export interface ContractData {
  contract_number: string;
  date_end: string;
  date_start: string;
  developer_organization_id: string;
  id: string;
  organization_id: string;
  timezone: string;
  developer_organization: OrganizationData;
  organization: OrganizationData;
  counterparty: string;
}

export interface registryDataObject {
  comment: string;
  contract_id: string;
  created_date: string;
  creator_name: string;
  deal_id: string;
  links: string;
  decimal_number: string;
  gost_id: string;
  id: string;
  is_deleted: boolean;
  main_architector_id: string | null;
  product_owner_id: string | null;
  status: string;
  sub_type: string;
  comment_on_delete: string;
  comment_on_finished: string;
  delete_date: string;
  type: 'product' | 'project';
  gost: GostData;
  deal: DealData;
  manager_architector: ManagerData;
  contract: ContractData;
  register_entity_documents: ProductDocumentsObject[];
  organization: OrganizationData;
  workspaces: IAdditionalData[];
  edu_materials: IAdditionalData[];
  marketing_materials: IAdditionalData[];
}

export interface insertObjectType {
  organisation_implementer_id: string;
  id?: string;
  contract_id: string;
  creator_name: string;
  deal_id: string;
  decimal_number: string;
  gost_id: string;
  main_architector_id: string;
  status: 'draft' | 'in_work' | 'completed'
  sub_type: 'program' | 'sub_program'
  type: 'product' | 'project';
  comment: string | null;
}

export interface GostDocumentObject {
  id: string;
  code: string;
  name: string;
  project_stage: string;
  gost: GostData
  volume: null | string;
}

export interface ProductDocumentsObject {
  id: string;
  created_at: string;
  decimal_number: string;
  link: string;
  name: string;
  product_id: string;
  project_stage: string;
  gost_document: GostDocumentObject;
  gost: GostData;
  comment_on_delete: string;
  status: string;
  partNumber: null | string;
  partNumberExecution: null | string;
  additionalNumberExecution: null | string;
  volume: null | string;
}

export interface InserNewDocumentObject {
  decimal_number?:  string;
  gost_document_id:  string;
  link: string;
  product_id:  string;
  gost_id: string;
  name?: string;
  volume: string;
}

export interface UpdateDocumentInput {
  decimal_number: string;
  id: string;
  additionalNumberExecution: string;
  partNumber: string;
  partNumberExecution: string;
  link: string;
  volume: string;
}

export enum registerDataIndex  {
  developer = 'developer',
  customer = 'customer',
  links = 'links',
  decimal_number = 'decimal_number',
  manager = 'manager',
  deal_number = 'deal_number',
  created_date = 'created_date',
  status = 'status',
}

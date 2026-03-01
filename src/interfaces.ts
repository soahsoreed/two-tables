import {
  ContractData,
  DealData,
  GostData, GostDocumentObject, InserNewDocumentObject, insertObjectType,
  ManagerData,
  OrganizationData,
  registryDataObject, UpdateDocumentInput
} from "./registry/interfaces.ts";
import dayjs from "dayjs";

export interface KeycloakUser {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  sub: string;
}

export type ProductStatus = 'draft' | 'finished' | 'in_work' | 'delete'; // rework to enum

export interface ModalsState {
  creatingRegisterDataModalOpen: boolean;
  deleteProjectModalOpen: boolean;
  finishedProjectModalOpen: boolean;
  deleteMaterialModalOpen: boolean;
  curProjectIDForDelete: string | null;
  setCreatingRegisterDataModalOpen: (value: boolean) => void;
  setDeleteProjectModalOpen: (value: boolean) => void;
  setCurProjectIDForDelete: (value: string | null) => void;
  setFinishedProjectModalOpen: (value: boolean) => void;
  setDeleteMaterialModalOpen: (value: boolean) => void;
}

export interface RegisterState {
  registerData: registryDataObject[] | null;
  dealsData: DealData[] | null;
  gostsData: GostData[] | null;
  managersData: ManagerData[] | null;
  organizationsData: OrganizationData[] | null;
  contractsData: ContractData[] | null;
  isSuccessUses: boolean;
  editProductID: null | string;
  error: string | null;
  isErrorShown: boolean;
  successMessage: string | null;
  getRegisterData: () => void;
  getDealsData: () => void;
  getOrganizationsData: () => void;
  getGostsData: () => void;
  getManagersData: () => void;
  getContractsData: () => void;
  setSuccessMessage: (value: string | null) => void;
  setEditProductID: (value: string | null) => void;
  setIsSuccessUses: (value: boolean) => void;
  setErrorShown: (value: boolean) => void;
  setError: (value: string | null) => void;
  insertRegisterEntityData: (arg0:insertObjectType) =>  Promise<string> | null;
  updateRegisterEntityData: (arg0: insertObjectType) =>  Promise<string> | null;
  getDecimalNumber: (code: string) => Promise<string | null>;
  insertDecimalNumber: (code: string) => Promise<string | null>;
}

export interface ProductProjectState {
  isSuccessUses: boolean;
  error: string | null;
  isErrorShown: boolean;
  successMessage: string | null;
  currentProdID: string | null;
  createDocumentModalOpen: boolean;
  updateDocumentModalOpen: boolean;
  isShowDeleteButtonActive: boolean;
  isEditModeActive: boolean;
  documentIDForUpdate: null | string;
  gostDocumentIDForNewDoc: null | string;
  gostIDForNewDoc: null | string;
  newDocumentType: null | 'gost' | 'another'; // extract to enum
  newDocumentName: null | string;
  idForDelete: null | string;
  deleteType: null | 'document';
  currentProdData: registryDataObject | null;
  setSuccessMessage: (value: string | null) => void;
  setIsEditModeActive: (value: boolean) => void;
  setGostIDForNewDoc: (value: string | null) => void;
  setIdForDelete: (value: string | null) => void;
  setGostDocumentIDForNewDoc: (value: string | null) => void;
  setNewDocumentName: (value: string | null) => void;
  setDocumentIDForUpdate: (value: string | null) => void;
  setIsSuccessUses: (value: boolean) => void;
  setIsShowDeleteButtonActive: (value: boolean) => void;
  setErrorShown: (value: boolean) => void;
  setCreateDocumentModalOpen: (value: boolean) => void;
  setUpdateDocumentModalOpen: (value: boolean) => void;
  insertNewDocumentData: (value: InserNewDocumentObject) =>  Promise<void> | null;
  setError: (value: string | null) => void;
  setCurrentProdID: (value: string | null) => void;
  setNewDocumentType: (value: 'gost' | 'another' | null) => void;
  setCurrentProdData: (value: registryDataObject | null) => void;
  updateDocumentData: (value: UpdateDocumentInput) => void;
  getCurrentProdData: (value: string) => void;
  setDeleteType: (value: 'document' | null) => void;
  softDeleteEntity: (value: string | null, type: 'document' , comment?: string) => Promise<void> | null;
  deleteCurrentProdData: (value: string, status: ProductStatus , comment: string, deleteDay: string | number | dayjs.Dayjs | Date) => void;
  finishedCurrentProdData: (value: string, status: ProductStatus, comment: string) => void;
  getDocumentDecimalNumber: (decimalNumber: string, extraNumber: string, numberVersion: string, part: string, tom: string, code?: string) => Promise<string | null>
}

export interface useAuthSate {
  isAuth: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: KeycloakUser | null;
  userCredentials: null;
  showErrorModal: boolean;
  successMessage: null | string;
  // userName : null;
  userId: string | null;
  errorShown: boolean;
  setUser:(value: KeycloakUser | null) => void,
  setIsAuth:(value: boolean,) => void,
  setSuccessMessage: (value: string | null) => void,
  setError:(value: string | null,) => void,
  setUserId:(value: string | null,) => void,
  authUser:(login: string, password: string) => Promise<void>,
  getUser:(login: string) => Promise<KeycloakUser>,
  logOut:() => Promise<void>,
  setErrorShown:(value: boolean,) => void,
  // setIsAuth:(value: boolean,) => {set({ isAuth : value, },);},
  // setUserId:(value: string,) => {set({ userId : value, },);},

}

export interface UseHandbooksStateV2 {
  gostDocumentData: GostDocumentObject[] | null,
  getGostDocumentData: () => void;
}

export interface TableRegistryProps {
  filter: 'product' | 'project' | 'normal'
}

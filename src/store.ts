// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import type {} from "@redux-devtools/extension";
// import {ModalsState, ProductProjectState, RegisterState} from "./interfaces.ts";
// import {GET_REGISTER_DATA} from "./registry/api/getRegisterData.ts";
// import {client} from "./apollo/client.ts";
// import {GET_DEALS_DATA} from "./registry/api/getDeals.ts";
// import {GET_ORGANISATIONS_DATA} from "./registry/api/getOrganisations.ts";
// import {GET_GOSTS_DATA} from "./registry/api/getGosts.ts";
// import {GET_MANAGERS_DATA} from "./registry/api/getManagers.ts";
// import {GET_CONTRACTS_DATA} from "./registry/api/getContracts.ts";
// import {INSERT_REGISTER_ENTITY} from "./registry/api/insertRegisterEntityData.ts";
// import {GET_PROD_BY_ID} from "./product__project-page/api/getCurrentProd.ts";
// import {
//   CHANGE_PRODUCT_STATUS_BY_ID
// } from "./product__project-page/api/changeStatusCurrentProd.ts";
// import {FINISHED_PRODUCT_BY_ID} from "./product__project-page/api/finishedCurrentProd.ts";
// import {INSERT_NEW_DOCUMENT_FOR_PRODUCT} from "./product__project-page/documents/api/createNewDocumentForProduct.ts";
// import {SOFT_DELETE_DOCUMENT} from "./product__project-page/documents/api/documentSoftDelete.ts";
// import {UPDATE_REGISTER_ENTITY_BY_ID} from "./registry/api/updateRegisterEntityData.ts";
// import {UPDATE_DOCUMENT_BY_ID} from "./product__project-page/documents/api/updateDocumentForProduct.ts";
// import {GET_DECIMAL_NUMBER} from "./components/api/getDecimalNumber.ts";
// import {GET_DOCUMENT_DECIMAL_NUMBER} from "./components/api/getDocumentDecimalNumber.ts";
// import {INSERT_DECIMAL_NUMBER} from "./components/api/insertDecimalNumber.ts"; // required for devtools typing

// export const useModals = create<ModalsState>()(
//   devtools(
//     (set) => ({
//       creatingRegisterDataModalOpen: false,
//       deleteProjectModalOpen: false,
//       finishedProjectModalOpen: false,
//       deleteMaterialModalOpen: false,
//       curProjectIDForDelete: null,
//       setCreatingRegisterDataModalOpen: (value) => set({ creatingRegisterDataModalOpen: value }),
//       setDeleteProjectModalOpen: (value) => set({ deleteProjectModalOpen: value }),
//       setCurProjectIDForDelete: (value) => set({ curProjectIDForDelete: value }),
//       setFinishedProjectModalOpen: (value) => set({ finishedProjectModalOpen: value }),
//       setDeleteMaterialModalOpen: (value) => set({ deleteMaterialModalOpen: value }),
//     }),
//     {
//       name: 'modals_store',
//     }
//   )
// );


// export const useRegister = create<RegisterState>()(
//   devtools(
//     (set) => ({
//       registerData: null,
//       dealsData: null,
//       organizationsData: null,
//       gostsData: null,
//       managersData: null,
//       contractsData: null,
//       successMessage: null,
//       editProductID: null,
//       error: null,
//       isSuccessUses: false,
//       isErrorShown: null,
//       getDecimalNumber: async (code: string) => {
//         const options = {
//           query: GET_DECIMAL_NUMBER,
//           variables: {
//             code,
//           },
//         };

//         try {
//           const response = await client.query(options);
//           return response.data.decimalNumber?.value || null;
//         } catch (error) {
//           return null;
//         }
//       },
//       insertDecimalNumber: async (code: string) => {
//         const options = {
//           query: INSERT_DECIMAL_NUMBER,
//           variables: {
//             code,
//           },
//         };

//         try {
//           const response = await client.query(options);
//           return response.data.saveDecimalNumber?.value || null;
//         } catch (error) {
//           return null;
//         }
//       },
//       setErrorShown:(value,) => {set({ isErrorShown : value, },);},
//       setEditProductID:(value,) => {set({ editProductID : value, },);},
//       setError:(value: string | null,) => {set({ error : value, },);},
//       setSuccessMessage: (value) => { set({ successMessage: value, }) },
//       setIsSuccessUses: (value) => { set({ isSuccessUses: value, }) },
//       getRegisterData: async () => {
//         const options = {
//           query: GET_REGISTER_DATA,
//         };
//         try {
//           await client.query(options).then((res) => {
//             if (res.data.register_entity) {
//               const reversedRegisterData = res.data.register_entity.slice().reverse()
//               // console.log(reversedRegisterData)
//               set({ registerData: reversedRegisterData });
//             } else {
//               // console.log('Ошибка при получении данных регистра')
//             }

//           });
//         } catch (error) {
//           console.error(error);
//         }
//       },
//       getDealsData: async () => {
//         const options = {
//           query: GET_DEALS_DATA,
//         };
//         try {
//           await client.query(options).then((res) => {
//             const sortedDealsData = res.data.handbooks_deals.sort((a, b) => {
//               return a.deal_number.localeCompare(b.deal_number);
//             });
//             set({ dealsData: sortedDealsData });
//           });
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       },
//       getOrganizationsData: async () => {
//         const options = {
//           query: GET_ORGANISATIONS_DATA,
//         };
//         try {
//           await client.query(options).then((res) => {
//             set({ organizationsData: res.data.handbooks_organizations.slice().reverse() });
//           });
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       },
//       getGostsData: async () => {
//         const options = {
//           query: GET_GOSTS_DATA,
//         };
//         try {
//           await client.query(options).then((res) => {
//             set({ gostsData: res.data.handbooks_gost.slice().reverse() });
//           });
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       },
//       getManagersData: async () => {
//         const options = {
//           query: GET_MANAGERS_DATA,
//         };
//         try {
//           await client.query(options).then((res) => {
//             set({ managersData: res.data.handbooks_managers.slice().reverse() });
//           });
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       },
//       getContractsData: async () => {
//         const options = {
//           query: GET_CONTRACTS_DATA,
//         };
//         try {
//           await client.query(options).then((res) => {
//             set({ contractsData: res.data.handbooks_contracts.slice().reverse() });
//             const sortedData = res.data.handbooks_contracts.sort((a, b) => {
//               return a.contract_number.localeCompare(b.contract_number);
//             });
//             set({ contractsData: sortedData });
//           });
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       },
//       // @ts-ignore
//       insertRegisterEntityData: async (insertObj): Promise<string> => {
//         const options = {
//           query: INSERT_REGISTER_ENTITY,
//           variables: {
//             contract_id: insertObj.contract_id,
//             creator_name: insertObj.creator_name,
//             deal_id: insertObj.deal_id,
//             decimal_number: insertObj.decimal_number,
//             gost_id: insertObj.gost_id,
//             main_architector_id: insertObj.main_architector_id,
//             status: insertObj.status,
//             sub_type: insertObj.sub_type,
//             type: insertObj.type,
//             organisation_implementer_id: insertObj.organisation_implementer_id,
//             comment: insertObj.comment
//           }
//         };
//         try {
//           await client.query(options).then((res) => {
//             if (res.data.insert_register_entity_one.id) {
//               set({successMessage: 'Запись добавлена.'})
//               return res.data.insert_register_entity_one.id ;
//             } else {
//               set({error: 'Создание невозможно.'})
//             }
//           });
//         } catch (error) {
//           set({error: 'Создание невозможно.'})
//         }
//       },
//       updateRegisterEntityData: async (insertObj): Promise<string | null> => {
//         const options = {
//           query: UPDATE_REGISTER_ENTITY_BY_ID,
//           variables: {
//             id: insertObj.id,
//             contract_id: insertObj.contract_id,
//             creator_name: insertObj.creator_name,
//             deal_id: insertObj.deal_id,
//             decimal_number: insertObj.decimal_number,
//             gost_id: insertObj.gost_id,
//             main_architector_id: insertObj.main_architector_id,
//             status: insertObj.status,
//             sub_type: insertObj.sub_type,
//             type: insertObj.type,
//             comment: insertObj.comment
//           },
//         };

//         try {
//           const res = await client.query(options);
//           if (res.data.update_register_entity_by_pk.id) {
//             return res.data.update_register_entity_by_pk.id;
//           } else {
//             set({ error: 'Редактирование невозможно.' });
//             return null;
//           }
//         } catch (error) {
//           set({ error: 'Редактирование невозможно.' });
//           return null;
//         }
//       },
//     })
//   )
// )

// export const useProduct_Project = create<ProductProjectState>()(
//   devtools(
//     (set) => ({
//       successMessage: null,
//       error: null,
//       isSuccessUses: false,
//       isErrorShown: null,
//       idForDelete: null,
//       currentProdID: null,
//       currentProdData: null,
//       deleteType: null,
//       newDocumentType: null,
//       gostDocumentIDForNewDoc: null,
//       gostIDForNewDoc: null,
//       isEditModeActive: false,
//       newDocumentName: null,
//       documentIDForUpdate: null,
//       isShowDeleteButtonActive: false,
//       createDocumentModalOpen: false,
//       updateDocumentModalOpen: false,
//       getDocumentDecimalNumber: async (decimalNumber, extraNumber, numberVersion, part, tom, code) => {
//         const options = {
//           query: GET_DOCUMENT_DECIMAL_NUMBER,
//           variables: {
//             decimalNumber,
//             extraNumber,
//             numberVersion,
//             part,
//             tom,
//             code
//           },
//         };

//         try {
//           const response = await client.query(options);
//           return response.data.documentDecimalNumber?.value || null;
//         } catch (error) {
//           return null;
//         }
//       },
//       setErrorShown:(value) => {set({ isErrorShown : value, },);},
//       setNewDocumentName:(value) => {set({ newDocumentName : value, },);},
//       setGostIDForNewDoc:(value) => {set({ gostIDForNewDoc : value, },);},
//       setIsEditModeActive:(value) => {set({ isEditModeActive : value, },);},
//       setGostDocumentIDForNewDoc:(value) => {set({ gostDocumentIDForNewDoc : value, },);},
//       setCreateDocumentModalOpen:(value) => {set({ createDocumentModalOpen : value, },);},
//       setUpdateDocumentModalOpen:(value) => {set({ updateDocumentModalOpen : value, },);},
//       setDocumentIDForUpdate:(value) => {set({ documentIDForUpdate : value, },);},
//       setError:(value: string | null,) => {set({ error : value, },);},
//       setSuccessMessage: (value) => { set({ successMessage: value, }) },
//       setDeleteType: (value) => { set({ deleteType: value, }) },
//       setIdForDelete: (value) => { set({ idForDelete: value, }) },
//       setIsSuccessUses: (value) => { set({ isSuccessUses: value, }) },
//       setIsShowDeleteButtonActive: (value) => { set({ isShowDeleteButtonActive: value, }) },
//       setCurrentProdID: (value) => { set({ currentProdID: value, }) },
//       setNewDocumentType: (value) => { set({ newDocumentType: value, }) },
//       setCurrentProdData: (value) => { set({ currentProdData: value, }) },
//       getCurrentProdData: async (id) => {
//         const options = {
//           query: GET_PROD_BY_ID,
//           variables: {
//             id: id
//           }
//         };
//         try {
//           await client.query(options).then((res) => {
//             if (res.data.register_entity_by_pk) {
//               set({ currentProdData: res.data.register_entity_by_pk });
//             } else {
//               return null
//             }
//           });
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       },
//       deleteCurrentProdData: async (id, status, comment_on_delete, delete_date) => {
//         // const curComment = comment ? comment : null
//         const options = {
//           query: CHANGE_PRODUCT_STATUS_BY_ID,
//           variables: {
//             id,
//             status,
//             comment_on_delete,
//             delete_date
//           }
//         };
//         try {
//           await client.query(options).then((res) => {
//             if (res.data.update_register_entity_by_pk) {
//               set({ successMessage: 'Продукт/проект удалён.' });
//             } else {
//               set({ error: 'Удаление невозможно.' });
//             }
//           });
//         } catch (error) {
//           set({ error: 'Удаление невозможно.' });
//         }
//       },
//       finishedCurrentProdData: async (id, status, comment_on_finished) => {
//         // const comment = comment ? comment : null
//         const options = {
//           query: FINISHED_PRODUCT_BY_ID,
//           variables: {
//             id,
//             status,
//             comment_on_finished
//           }
//         };
//         try {
//           await client.query(options).then((res) => {
//             if (res.data.update_register_entity_by_pk) {
//               set({ successMessage: 'Продукт/проект завершен.' });
//             } else {
//               set({ error: 'Завершение невозможно.' });
//             }
//           });
//         } catch (error) {
//           set({ error: 'Завершение невозможно.' });
//         }
//       },
//       insertNewDocumentData: async (insertObj) => {
//         const options = {
//           query: INSERT_NEW_DOCUMENT_FOR_PRODUCT,
//           variables: {
//             decimal_number: insertObj.decimal_number ? insertObj.decimal_number : null,
//             gost_document_id:insertObj.gost_document_id,
//             link: insertObj.link,
//             product_id:insertObj.product_id,
//             gost_id: insertObj.gost_id,
//             name: insertObj.name,
//             volume: insertObj.volume
//           }
//         };
//         try {
//           await client.query(options).then((res) => {
//             if (res.data.insert_handbooks_register_entity_documents_one.id) {
//               set({successMessage: 'Запись добавлена.'})
//               return res.data.insert_handbooks_register_entity_documents_one.id ;
//             } else {
//               set({error: 'Создание невозможно.'})
//             }
//           });
//         } catch (error) {
//           set({error: 'Создание невозможно.'})
//         }
//       },
//       softDeleteEntity: async (id, type, comment_on_delete) => {
//         let formedQuery;
//         if (type == 'document') {
//           formedQuery = SOFT_DELETE_DOCUMENT
//         }
//         const options = {
//           query: formedQuery,
//           variables: {
//             id,
//             status: 'delete',
//             comment_on_delete
//           }
//         };
//         try {
//           await client.query(options).then((res) => {
//             if (res.data.update_handbooks_register_entity_documents_by_pk.id) {
//               set({successMessage: 'Документ удален.'})
//               return res.data.update_handbooks_register_entity_documents_by_pk.id ;
//             } else {
//               set({error: 'Удаление невозможно.'})
//             }
//           });
//         } catch (error) {
//           set({error: 'Удаление невозможно.'})
//         }
//       },
//       updateDocumentData: async (updateObj): Promise<string> => {
//         const options = {
//           mutation: UPDATE_DOCUMENT_BY_ID,
//           variables: {
//             id: updateObj.id,
//             additionalNumberExecution: updateObj.additionalNumberExecution,
//             partNumber: updateObj.partNumber,
//             partNumberExecution: updateObj.partNumberExecution,
//             link: updateObj.link,
//             decimal_number: updateObj.decimal_number,
//             volume: updateObj.volume
//           },
//         };

//         try {
//           const res = await client.mutate(options);
//           if (res.data.update_handbooks_register_entity_documents_by_pk.id) {
//             // console.log('here')
//             set({successMessage: 'Документ обновлён.'})
//             return res.data.update_handbooks_register_entity_documents_by_pk.id;
//           } else {
//             set({ error: 'Обновление невозможно.' });
//             return '';
//           }
//         } catch (error) {
//           set({ error: 'Обновление невозможно.' });
//           return '';
//         }
//       },
//     })
//   )
// )

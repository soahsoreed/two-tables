import {CustomHandbooksStore} from "../../handbooks/store/CustomHandbooksStore.ts";

export interface IAdditionalData {
  id: string;
  creator_name: string;
  comment: string;
  link: string;
  created_at: string;
  register_entity_id: string;
  status: 'ok' | 'delete';
}

export interface CustomAdditionalStore<T> extends CustomHandbooksStore<T> {
  deleteData: (id: string) => Promise<void>;
}

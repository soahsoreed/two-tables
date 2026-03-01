import {create} from "zustand";
import { UseHandbooksStateV2} from "../../interfaces.ts";
import {devtools} from "zustand/middleware";
import {client} from "../../apollo/client.ts";
import {GET_GOST_DOCUMENTS} from "../api/getGostDocument.ts";

export const useHandbooksV2 = create<UseHandbooksStateV2>()(
  devtools(
    (set) => ({
      gostDocumentData: null,
      getGostDocumentData: async () => {
        const options = {
          query: GET_GOST_DOCUMENTS,
        };
        try {
          await client.query(options).then((res) => {
            set({ gostDocumentData: res.data.handbooks_gost_documents });
          });
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    })
  )
)
import React from 'react';
import {useProduct_Project} from "../../../store.ts";
import {Flex} from "antd";
import FinishedCreationAnotherDocumentForm from "./FinishedCreationAnotherDocumentForm.tsx";
import FinishedCrationGostDocumentForm from "./FinishedCrationGOSTDocumentForm.tsx";
import {InserNewDocumentObject} from "../../../registry/interfaces.ts";
import {useHandbooksV2} from "../../../handbooks/store/handbookStoreV2.ts";
interface ChooseDocumentFormProps {
  handleBack?: () => void
}

const FinishedCratingDocumentForm:React.FC<ChooseDocumentFormProps> = ({handleBack}) => {
  const newDocumentType = useProduct_Project(state => state.newDocumentType)
  const gostDocumentIDForNewDoc = useProduct_Project(state => state.gostDocumentIDForNewDoc)
  const currentProdData = useProduct_Project(state => state.currentProdData)
  const insertNewDocumentData = useProduct_Project(state => state.insertNewDocumentData)
  const setCreateDocumentModalOpen = useProduct_Project(state => state.setCreateDocumentModalOpen)
  const setNewDocumentType = useProduct_Project(state => state.setNewDocumentType)
  const setGostIDForNewDoc = useProduct_Project(state => state.setGostIDForNewDoc)
  const gostIDForNewDoc = useProduct_Project(state => state.gostIDForNewDoc)
  const setGostDocumentIDForNewDoc = useProduct_Project(state => state.setGostDocumentIDForNewDoc)
  const newDocumentName = useProduct_Project(state => state.newDocumentName)
  const getDocumentDecimalNumber = useProduct_Project(state => state.getDocumentDecimalNumber)
  const gostDocumentData = useHandbooksV2(state => state.gostDocumentData)

  const creatingGOSTDocument = async (values) => {

    let formedData: InserNewDocumentObject = {
      gost_document_id: gostDocumentIDForNewDoc ? gostDocumentIDForNewDoc : null,
      link: values.documentLink ? values.documentLink : null,
      product_id: currentProdData ? currentProdData.id : null,
      gost_id: gostIDForNewDoc,
      name: newDocumentName ? newDocumentName : null,
      volume: values.tom ? values.tom : null,
    }
    if (newDocumentType == 'gost') {

      const documentCode = gostDocumentData.find(el => el.id === gostDocumentIDForNewDoc).code || null
      // console.log(documentCode, currentProdData.decimal_number, values.tom)
      const decimal_number = await getDocumentDecimalNumber(currentProdData.decimal_number,
        null, null, null, values.tom, documentCode)
      formedData = {...formedData,
        decimal_number: decimal_number,}
      // console.log(formedData)
    }
    insertNewDocumentData(formedData).then(_ => {
      setCreateDocumentModalOpen(false)
      setNewDocumentType(null)
      setGostDocumentIDForNewDoc(null)
      setGostIDForNewDoc(null)
    })
  }
  // const [form] = Form.useForm();
  return newDocumentType ? (
    <>
      {newDocumentType == 'another' ?
        (<Flex>
          <FinishedCreationAnotherDocumentForm onCreate={creatingGOSTDocument} handleBack={handleBack} />
        </Flex>)
        :
        (<Flex>
          <FinishedCrationGostDocumentForm onCreate={creatingGOSTDocument} handleBack={handleBack} />
        </Flex>)}
    </>
  ) : <>Ошибка при определении типа документа, обратитесь к разработчику</>;
};

export default FinishedCratingDocumentForm;
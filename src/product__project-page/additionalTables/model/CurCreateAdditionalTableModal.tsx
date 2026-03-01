import {additionalTablesTypes, useAdditionalTablesModals} from "../store/additionalTablesModalsStore.ts";
import LearningMaterialModal from "../modals/LearningMaterialModal.tsx";
import MarketingMaterialsModal from "../modals/MarketingMaterialsModal.tsx";
import WorkspaceModal from "../modals/workspaceModal.tsx";

const CurCreateAdditionalTableModal = () => {
  const { modalType} = useAdditionalTablesModals()

  const getModalByType = (type: additionalTablesTypes) => {
    switch (type)  {
    case additionalTablesTypes.learningMaterials:
      return <LearningMaterialModal />

    case additionalTablesTypes.marketingMaterials:
      return <MarketingMaterialsModal />

    case additionalTablesTypes.workspaces:
      return <WorkspaceModal />
    default:
      return <></>;
    }
  }

  return (
    <>
      {getModalByType(modalType)}
      {/*{isModalOpen && getModalByType(modalType)}*/}
    </>
  )
};

export default CurCreateAdditionalTableModal;
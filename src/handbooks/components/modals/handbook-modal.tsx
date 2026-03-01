import { CustomHandbookTypes } from '../custom-handbooks/custom-handbooks';
import GostDocumentsModal from '../custom-handbooks/components/gostDocuments/GostDocumentsModal';
import ManagersModal from '../custom-handbooks/components/managers/ManagersModal';
import OrganizationsModal from '../custom-handbooks/components/organizations/OrganizationsModal';
import GostModal from '../custom-handbooks/components/gost/gostModal';
import { useHandbookModals } from "../../store/handbook-modals.state";
import {SystemHandbookTypes} from "../system-handbooks/system-handbooks.tsx";
import NewContractsModal from "../system-handbooks/components/NewContractModal.tsx";
import NewDealModal from "../system-handbooks/components/NewDealModal.tsx";


function HandbookModal() {
  // const {setIsModalOpen, isModalOpen, modalType} = useHandbookModals()
  const {modalType} = useHandbookModals()

  // function openModal() {
  //   setIsModalOpen(true);
  // }

  const getModalByType = (type: CustomHandbookTypes | SystemHandbookTypes) => {
    switch (type)  {
    case CustomHandbookTypes.GOST:
      return <GostModal />

    case CustomHandbookTypes.GOSTDocuments:
      return <GostDocumentsModal  />;

    case CustomHandbookTypes.Managers:
      return <ManagersModal  />;

    case CustomHandbookTypes.Organizations:
      return <OrganizationsModal  />;

    case SystemHandbookTypes.Deals:
      return <NewDealModal  />;

    case SystemHandbookTypes.Contracts:
      return <NewContractsModal  />;

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
}

export default HandbookModal

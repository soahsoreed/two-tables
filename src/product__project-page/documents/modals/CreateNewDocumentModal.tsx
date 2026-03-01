import {useEffect, useState} from 'react';
import {
  ConfigProvider,
  Modal,
  Steps,
} from "antd";
import {useProduct_Project} from "../../../store.ts";
import ChooseDocumentForm from "../model/ChooseDocumentForm.tsx";
import GostDocumentCreationForm from "../model/GostDocumentCreationForm.tsx";
import AnotherDocumentCreationForm from "../model/AnotherDocumentCreationForm.tsx";
import FinishedCratingDocumentForm from "../model/FinishedCratingDocumentForm.tsx";
import CircleForStep from "../../../components/CircleForStep.tsx";

const CreateNewDocumentModal = () => {
  const setCreateDocumentModalOpen = useProduct_Project(state => state.setCreateDocumentModalOpen)
  const createDocumentModalOpen = useProduct_Project(state => state.createDocumentModalOpen)
  const newDocumentType = useProduct_Project(state => state.newDocumentType)
  const successMessage = useProduct_Project(state => state.successMessage)
  const error = useProduct_Project(state => state.error)
  const [ current, setCurrent, ] = useState(0,);
  const [finishedStage, setFinishedStage] = useState(false)

  useEffect(() => {
    setCurrent(0)
    setFinishedStage(false)
  }, [successMessage, error]);

  const handleOk = () => {
    setCreateDocumentModalOpen(false)
  }

  const handleCancel = () => {
    setCreateDocumentModalOpen(false)
  }

  const isStepDisabled= (stepNumber: number,) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return newDocumentType == null;
    }
  };

  const handleChooseDocument = (values,) => {
    checkDocumentType(values, 1)
  };

  const handleFinishedStage = () => {
    setFinishedStage(true)
  };

  const stageBack = () => {
    if (finishedStage) {
      setFinishedStage(false)
    } else {
      setCurrent(0);
    }
  }

  const forms = [
    <ChooseDocumentForm onCreate={handleChooseDocument} />,
    <GostDocumentCreationForm handleBack={stageBack} onCreate={handleFinishedStage}  />,
    <AnotherDocumentCreationForm handleBack={stageBack} onCreate={handleFinishedStage} />
  ];

  const checkDocumentType = (documentType: 'gost' | 'another' | null, clickValue: number) => {
    setFinishedStage(false)
    if (documentType == null || clickValue == 0) {
      setCurrent(0);
    } else if (clickValue == 1) {
      if (documentType == 'gost') {
        setCurrent(1,);
      } else {
        setCurrent(2,);
      }
    }
  }


  
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            /* here is your component tokens */
          },
          Form: {
            labelColor: '#111928'
          },

        },
        token: {
          colorBgContainer: '#F9FAFB',
          colorTextPlaceholder: '#6B7280'
        },
      }}


    >
      <Modal
        style={{minWidth: '655px'}} title="Добавить запись"
        open={createDocumentModalOpen}
        onOk={handleOk}
        onCancel={handleCancel} footer={null}>
        <Steps
          // progressDot
          size={'small'}
          labelPlacement={'horizontal'}
          onChange={(value) => checkDocumentType(newDocumentType, value)}
          current={current}
        >
          <Steps.Step disabled={isStepDisabled(0,)} title={'Тип документа'} icon={<CircleForStep />}></Steps.Step>
          <Steps.Step  disabled={isStepDisabled(1,)} title={'Добавление документа'} icon={<CircleForStep />}></Steps.Step>
        </Steps>
        <div style={{width: '100%', height: '32px'}}></div>
        {finishedStage ? <FinishedCratingDocumentForm handleBack={stageBack}  /> : forms[current]}
        {/*{current}*/}
      </Modal>
    </ConfigProvider>
  );
};

export default CreateNewDocumentModal;
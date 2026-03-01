import { notification } from "antd";
import {useProduct_Project} from "../../store.ts";
import {useLearningMaterials} from "../../product__project-page/additionalTables/store/learningMaterialsStore.ts";

const useNotificationCustom = () => {
  const { setSuccessMessage} = useProduct_Project()
  const {
    setSuccessMessage: setSuccessMessageLearningMaterials
  } = useLearningMaterials()

  const showSuccessNotification = (description: string) => {
    notification.success({
      className: "addGroupNotification",
      placement: "bottom",
      message: null,
      description,
      duration: 1.5,
      style: {
        width: "303px",
      },
      onClose: () => {
        setSuccessMessage(null,);
        setSuccessMessageLearningMaterials(null,);
      },
    });
  };

  const showErrorNotification = (error: string) => {
    notification.error({
      message: "Ошибка!",
      description: error,
      placement: "bottom",
    });
  };

  return { showSuccessNotification, showErrorNotification };
};

export default useNotificationCustom;

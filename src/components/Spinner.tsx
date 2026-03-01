
import {LoadingOutlined} from "@ant-design/icons";
import {Flex} from "antd";

const Spinner = () => {
  return (
    <Flex style={{width:'100%', minHeight:'50vh'}} align={'center'} justify={'center'}>
      <LoadingOutlined spin style={{fontSize: '60px'}} />
    </Flex>
  );
};

export default Spinner;
import {Flex} from "antd";

const CircleForStep = () => {
  return (
    <Flex justify={'center'}
      align={'center'}
      style={{width: '100%', height: '100%', flexShrink: 0,
        borderRadius: '999px', border: '2px solid #C3DDFD', marginTop: '4px'}}>
      <div style={{width: '11px', height: '11px', flexShrink: 0,
        borderRadius: '999px', border: '2px solid #1C64F2'}}>
      </div>
    </Flex>
  );
};

export default CircleForStep;
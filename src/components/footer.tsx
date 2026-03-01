import React from 'react';
import {Flex, Typography} from "antd";
import footerLogo from '../assets/svg/logo_footer.svg'

const Footer: React.FC = () => {
  return (
    <Flex align={'center'} justify={'space-between'} style={{position: 'absolute', bottom: '0', backgroundColor: '#fff',
    borderTop: '1px solid #E5E7EB', width: '100%', padding: '16px 24px'}}>
      <Typography.Text type={'secondary'}>© 2024 ООО “САТЕЛ ПрО. Все права защищены.</Typography.Text>
      <a href="https://satel.org/" target={'_blank'} style={{height: '36px'}}>
        <img style={{height: '36px'}} alt={'satel_logo'} src={footerLogo}></img>
      </a>

    </Flex>
  );
};

export default Footer;
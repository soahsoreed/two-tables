import './user-menu.scss';
import { useState } from 'react';
import { FlowbiteIcons } from 'flowbite-react-icons';
import { ArrowRightToBracket } from 'flowbite-react-icons/outline';
import {useAuth} from "../../../authStore.ts";
import {useNavigate} from "react-router-dom";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {Button} from "antd";
import { useOutsideClick } from '../../../components/scripts/click-outside.ts';



function UserMenu() {
  const [contentVisible, setContentVisible] = useState(false); 
  const user = useAuth(state => state.user)
  const logOut= useAuth(state => state.logOut)
  const userName = user ? `${user.given_name} ${user.family_name}` : 'Иван Иванов'
  const navigate = useNavigate()

  const ref = useOutsideClick(() => {
    setContentVisible(false);
  });

  return user ? (
    <>
      <div className="user-menu" ref={ref}>
        <div className="user-menu__opener" onClick={() => setContentVisible(!contentVisible)}>
          <div className="user-menu__opener-icon">
            { contentVisible ? <UpOutlined /> : <DownOutlined /> }
          </div>
          <div className="user-menu__opener-label user-menu--font"> {`${user.given_name} ${user.family_name[0]}.`} </div>
          <div className="user-menu__opener-avatar user-menu--font"> {`${user.given_name[0]}${user.family_name[0]}`} </div>
        </div>

        {
          <div className={contentVisible ? 'user-menu__content user-menu__content--visible': 'user-menu__content'}>
            <div className="user-menu__content-header">
              <div className="user-menu__content-header-avatar">{`${user.given_name[0]}${user.family_name[0]}`}</div>
  
              <div className="user-menu__content-header-data">
                <div className="user-menu__content-header-name">
                  { userName }
                </div>
                <div className="user-menu__content-header-email">
                  { user.email }
                </div>
              </div>
            </div>

            <div className="user-menu__content-item user-menu__content-logout">
              <div className="user-menu__content-item-icon">
                <FlowbiteIcons size={24} color="#F05252">
                  <ArrowRightToBracket />
                </FlowbiteIcons>
              </div>

              <div
                onClick={() => {
                  logOut().then(() => {
                    navigate('/login')
                  })
                }}
                className="user-menu__content-item-label">
                Выйти из аккаунта
              </div>
            </div>
          </div>
        }
       

      </div>
    </>
  ) : (<Button
    onClick={() => {
      logOut().then(() => {
        navigate('/login')
      })
    }}
    className="user-menu__content-item-label">
    Выйти
  </Button>)
}

export default UserMenu;

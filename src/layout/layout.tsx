import './layout.scss';
import AppLogo from '../assets/svg/logo.svg';
import NavChips, { INavChipItem } from './components/nav-chips/nav-chip';
import UserMenu from './components/user-menu/user-menu';
import { Database, Layers } from 'flowbite-react-icons/solid';
import {Outlet, useNavigate} from 'react-router-dom';
import Footer from "../components/footer.tsx";
import {useEffect} from "react";
import {getAccessToken} from "../auth/token-access.ts";
import {useAuth} from "../authStore.ts";
import {Divider, Flex, Tooltip} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";

// const user: IUserMenuOpenerConfig = {
//   name: 'Коренюгин Сергей',
//   email: 'example@gmail.com',
//   id: '223313-12312313-1312312-13123'
// }

function Layout() {
  const accessToken = useAuth(state => state.accessToken)
  const isAuth = useAuth(state => state.isAuth)
  const logOut = useAuth(state => state.logOut)
  const navigate = useNavigate()
  // const location = useLocation();
  // const currentRoute = authRouter.find(route => {
  //   return (route.path === location.pathname || location.pathname.includes('/product/'))
  // });
  // const showHeader = currentRoute && currentRoute.showHeader;

  const items: INavChipItem[] = [
    // {
    //   icon: <Home />,
    //   label: 'Главная',
    //   href: '/main',
    // },
    {
      icon: <Database />,
      label: 'Реестр',
      href: '/registry',
    },
    {
      icon: <Layers />,
      label: 'Справочники',
      href: '/handbooks',
    },
    // {
    //   icon: <File />,
    //   label: 'Шаблоны документов',
    //   href: '/document-templates',
    // },
  ];

  useEffect(() => {
    if ((!accessToken  && !isAuth) || !getAccessToken()) {
      logOut()
      navigate("/login")
    }
  }, [navigate, accessToken ,isAuth ]);


  return (
    <>
      <div className='app-layout'>

        {/*{showHeader &&*/}
        {/*  <div className="app-layout__navbar">*/}
        {/*      <div className="app-layout__navbar-logo">*/}
        {/*        <img src={AppLogo} />*/}
        {/*      </div>*/}

        {/*      <div className="app-layout__navbar-tabs">*/}
        {/*        <NavChips items={items}></NavChips>*/}
        {/*      </div>*/}

        {/*      <div className="app-layout__navbar-actions">*/}
        {/*        <div className="app-layout__navbar-action"></div>*/}
        {/*        <div className="app-layout__navbar-user">*/}
        {/*          <UserMenu user={user}></UserMenu>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*  </div>*/}
        {/*}*/}

        <div className="app-layout__navbar">
          <div onClick={() => navigate('/registry')} style={{cursor: 'pointer'}} className="app-layout__navbar-logo">
            <img alt={'ariadna_logo'} style={{height: '30px'}} src={AppLogo} />
          </div>

          <div className="app-layout__navbar-tabs">
            <NavChips items={items}></NavChips>
          </div>

          <div className="app-layout__navbar-actions">
            <div className="app-layout__navbar-action"></div>
            <div className="app-layout__navbar-user">
              <Flex align={'center'} gap={16}>
                <Tooltip title={'Справка'}>
                  <a target={'_blank'} href={'http://wiki.ariadna.satel.org:81/'}
                     style={{
                       borderRadius: '999px',
                       height: '24px', width: '24px', background: '#F3F4F6',
                       flexShrink: '0', display: 'flex', alignItems: 'center', justifyContent: 'center'
                     }}>
                    <QuestionCircleOutlined style={{color: '#9CA3AF', fontSize: '16px'}}/>
                  </a>
                </Tooltip>

                <Divider type="vertical"/>
                <UserMenu></UserMenu>

              </Flex>
            </div>
          </div>
        </div>

        <div className="app-layout__workspace">
          <div id="detail">
            <Outlet/>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Layout

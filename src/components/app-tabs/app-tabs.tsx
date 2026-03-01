import './app-tabs.scss';
import { useEffect, useState } from 'react';

export interface ITabItem {
  title: string;
  id: any;
}

interface IAppTabProps<T> {
  tabs: ITabItem[];
  activeTabId?: T;
  onTabChange?: (tabId: T) => void;
}

function AppTabs<T>({ tabs, activeTabId, onTabChange }: IAppTabProps<T>) {
  const [_activeTabId, setActiveTabId] = useState(null); 

  useEffect(() => {
    if (activeTabId) {
      // @ts-ignore
      setActiveTabId(activeTabId);
    }
  })

  const _onTabChange = (tab: ITabItem) => {
    setActiveTabId(tab.id);
    // @ts-ignore
    onTabChange?.(tab);
  }

  return (
    <>
      <div className='app-tabs'>
        {
          tabs.map((tab, index) => (
            <div 
              className={`app-tabs__item ${tab.id === _activeTabId? 'app-tabs__item--selected' : ''}`} 
              key={index}
              onClick={() => _onTabChange(tab)}>
              <div className='app-tabs__item-title'>{tab.title}</div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default AppTabs;

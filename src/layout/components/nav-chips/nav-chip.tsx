import './nav-chip.scss';
import { useEffect, useState } from 'react';
import { FlowbiteIcons } from 'flowbite-react-icons';
import { useLocation, useNavigate } from 'react-router-dom';

export interface INavChipItem {
  label: string;
  icon: JSX.Element;
  href: string;
}

function NavChips({ items }: { items: INavChipItem[] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedChipIndex, setSelectedChipIndex] = useState(0);

  const handleClick = (item: INavChipItem, index: number) => {
    setSelectedChipIndex(index);
    navigate(item.href);
  }

  const setSelectedChipFromUrl = () => {
    const currentRoute = location.pathname;
    const selectedChipRoute = items[selectedChipIndex].href;

    if (currentRoute !== selectedChipRoute) {
      const currentRouteIndex = items.findIndex(item => item.href === currentRoute);
      const normalizedIndex = currentRouteIndex === -1 ? 0 : currentRouteIndex;
      setSelectedChipIndex(normalizedIndex);
    }
  }

  useEffect(() => {
    setSelectedChipFromUrl();
  });

  const itemsView = items.map((item, index) => {
    return (
      <div 
        key={index}
        className={'nav-chip ' + (selectedChipIndex === index ? 'nav-chip--selected' : '')}
        onClick={() => handleClick(item, index)}>
        <div className="nav-chip__icon">
          <FlowbiteIcons size={24}>
            { item.icon }
          </FlowbiteIcons>
        </div>

        <div className="nav-chip__label">{ item.label }</div>
      </div>
    )
  });

  return (
    <>
      <div className="nav-chip__backdrop">
        { itemsView }
      </div>
    </>
  )
}

export default NavChips;

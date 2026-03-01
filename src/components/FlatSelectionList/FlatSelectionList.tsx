import './FlatSelectionList.scss';
import { FlowbiteIcons } from 'flowbite-react-icons';
import { Folder, FolderOpen } from 'flowbite-react-icons/solid';
import { useEffect, useState } from 'react';

export interface IFlatSelectionListItem {
  title: string;
  id?: string | number;
}

interface IFlatSelectionListProps {
  items: IFlatSelectionListItem[];
  onChange: <T extends IFlatSelectionListItem>(item: T) => void;
  selectedIndex?: number;
  toggle?: boolean;
}

function FlatSelectionList({ items, onChange, selectedIndex, toggle = false }: IFlatSelectionListProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const isSelectedItem = (index: number) => index === selectedItemIndex;

  const getNewIndex = (index: number)  => {
    if (toggle) {
      return isSelectedItem(index) ? -1 : index;
    } else {
      return index;
    }
  }

  function toggleSelectedItemIndex(index: number) {
    const normalizedValue = getNewIndex(index);

    setSelectedItemIndex(normalizedValue);
    const selectedItem = items[normalizedValue];
    onChange(selectedItem);
  }

  useEffect(() => {
    toggleSelectedItemIndex(selectedIndex);
  // }, [selectedIndex]);
  }, []);

  return (
    <>
      <div className="flat-selection-list">
        {
          items.map((item, index) => (
            <div
              key={item.id || index}
              className={`flat-selection-list__item ${isSelectedItem(index)? 'flat-selection-list__item--selected' : ''}`}
              onClick={() => toggleSelectedItemIndex(index)}
            >
              <div className="flat-selection-list__item-icon">
                <FlowbiteIcons color='#FACA15'>
                  { isSelectedItem(index) ? <FolderOpen /> : <Folder /> }
                </FlowbiteIcons>
              </div>

              <div className="flat-selection-list__item-title">
                { item.title }
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default FlatSelectionList


// <div onClick={() => setIsItemSelected(!isItemSelected)}
//             className={ 'handbook-type ' + (isItemSelected ? 'handbook-type--selected' : '') }>
//             <div className="handbook-type__icon">
//               <FlowbiteIcons color='#FACA15'>
//                 { isItemSelected? <Folder /> : <FolderOpen /> }
//               </FlowbiteIcons>
//             </div>

//             <div className="handbook-type__title">
//               { handbookType }
//             </div>
//           </div>
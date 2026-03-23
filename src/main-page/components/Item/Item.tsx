
import { IRecord } from '../../IRecord';
import { Checkbox } from "antd";
import './Item.modules.css';

const Item = ({ item, onCheckboxChange, onDragEnd = () => {} }
    : { item: IRecord, onCheckboxChange: (it: IRecord) => void, onDragEnd?: () => void }) => {

  return (
    <>
      <div className='item-row' key={item.id} onDragEnd={onDragEnd}>
        <div className='item-row__id'>{item.id}</div>
        <div className='item-row__name'>{item.name}</div>
        <div className='item-row__selection'>
          { <Checkbox  checked={item.isSelected} onChange={ () => onCheckboxChange(item) }></Checkbox> } 
        </div>
      </div>
    </>
  );
};

export default Item;

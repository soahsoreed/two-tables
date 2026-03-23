
import { IRecord } from '../../IRecord';
import { Button } from "antd";
import './Item.modules.css';

const Item = ({ item, onIsSelectedChange, onDragEnd = () => {} }
    : { item: IRecord, onIsSelectedChange: (it: IRecord) => void, onDragEnd?: () => void }) => {

  return (
    <>
      <div className='item-row' key={item.id} onDragEnd={onDragEnd}>
        <div className='item-row__id'>{item.id}</div>
        <div className='item-row__name'>{item.name}</div>
        <div className='item-row__selection'>
          <Button onClick={ () => onIsSelectedChange(item)}>Выбрать</Button>
        </div>
      </div>
    </>
  );
};

export default Item;

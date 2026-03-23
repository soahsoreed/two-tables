import './ItemHeader.modules.css';

const ItemHeader = () => {
  return (
    <>
      <div className='item-row__header'>
          <div className='item-row__id'>Id</div>
          <div className='item-row__name'>Name</div>
          <div className='item-row__selection'>Выбор</div>
      </div>
    </>
  );
};

export default ItemHeader;

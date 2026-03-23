import './NoItems.modules.css';

const NoItems = ({ text = '' }) => {
  return (
    <>
      <div className='no-items'>{ text }</div>
    </>
  );
};

export default NoItems;

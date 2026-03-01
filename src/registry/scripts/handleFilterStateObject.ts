export function handleFilterStateObject (filterObject, selectedKeys, dataIndex) {
  const updatedFilterObject = filterObject[0] ? { ...filterObject[0] }  : { ...filterObject };
  updatedFilterObject[dataIndex] = selectedKeys;
  // console.log(updatedFilterObject);
  return updatedFilterObject;
}
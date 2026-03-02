import {App, Button, Checkbox, Flex, Input } from "antd";
import {PlusOutlined, RedoOutlined} from "@ant-design/icons";
import TableRegistryAll from "./model/TableRegistryAll.tsx";
import CreateNewRegisterDataModal from "./model/modals/CreateNewRegisterDataModal.tsx";
import {useModals, useRegister} from "../store.ts";
import './style/registry.modules.css'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { items } from "./items.ts";
import InfiniteScroll from "react-infinite-scroll-component";

function RegistryPage() {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const [_items, setItems] = useState([]);

  const [unselectedItems, setUnselectedItems] = useState([]);
  const [itemsByQueryUnselected, setItemsByQueryUnselected] = useState([]);
  const [queryUnselected, setQueryUnselected] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsByQuerySelected, setItemsByQuerySelected] = useState([]);
  const [querySelected, setQuerySelected] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const selected = _items.filter(item => item.isSelected);
    const unselected = _items.filter(item => !item.isSelected);
    setSelectedItems(selected);
    setUnselectedItems(unselected);
    debugger
  }, [_items]);

  useEffect(() => {
    const itemsByQuery = searchByQuery(queryUnselected, unselectedItems);
    setItemsByQueryUnselected(itemsByQuery);
  }, [queryUnselected, unselectedItems]);

  useEffect(() => {
    const itemsByQuery = searchByQuery(querySelected, selectedItems);
    setItemsByQuerySelected(itemsByQuery);
  }, [querySelected, selectedItems]);

  // useEffect(() => {
  //   fetchSelectedItems();
  // }, [itemsByQueryUnselected]);

  const fetchItems = (startIndex = 0, lastIndex = 20) => {
    const newElements = items.slice(startIndex, lastIndex);
    const newItems = [..._items, ...newElements];
    setItems(newItems);
    return newItems;
  }

  // const syncSelection = () => {
  //   const selected = itemsByQueryUnselected.filter(it => it.isSelected);

  //   const res = _items.map(it => {
  //     return {
  //       ...it,
  //       isSelected: selected.includes(it.id)
  //     }
  //   });

  //   return res;
  // }

  // const fetchSelectedItems = () => {
  //   const newItems = itemsByQueryUnselected.filter(item => item.isSelected);
  //   setSelectedItems(newItems);
  //   return newItems;
  // }

  const setQueryEvent = (e) => {
    setQueryUnselected(
      e.target.value
    );
  }

  // const setQueryEvent = (e) => {
  //   setQueryUnselected(
  //     e.target.value
  //   );
  // }

  const searchByQuery = (query: string, items: any[]) => {
    const normalizeText = (text: string) => (text ?? '').trim().toLowerCase();
    const queryNormalized = normalizeText(query);

    const result = items.filter(item => {
      const nameNormalized = normalizeText(item.name);
      return nameNormalized.includes(queryNormalized);
    });

    return result;
  }

  const toggleSelection = (item) => {
    const newValue = !item.isSelected;

    const newItems = _items.map(e =>
      e.id === item.id ? { ...e, isSelected: newValue } : e
    );

    setItems(newItems);
  }

  // const toggleSelectionRight = (item) => {
  //   const newValue = !item.isSelected;

  //   const newItems = itemsByQuerySelected.map(e =>
  //     e.id === item.id ? { ...e, isSelected: newValue } : e
  //   );

  //   setItemsByQuerySelected(newItems);
  // }

  return (
      <div className="main-page__container">

        <div className="main-page__flex-container">
          <div className="main-page__left">

            <div className="main-page__left-actions">
              <div className="main-page__left-actions-search">
                <Input
                  type='text'
                  id="search-input"
                  onChange={(e) => setQueryUnselected(e.target.value)}>
                  </Input>
              </div>

              <div className="main-page__left-actions-add">
                <Button title='Добавить запись'>
                  <PlusOutlined />
                </Button>
              </div>
              
            </div>

            <div className="main-page__left-table table-container" id='scrollable-div'>
              <InfiniteScroll
                    dataLength={_items?.length}
                    next={() => fetchItems(_items?.length || 0, (_items?.length + 20))}
                    hasMore={true}
                    // loader={<h4>Loading...</h4>}
                    loader={<div></div>}
                    scrollableTarget="scrollable-div"
                  >
                      
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Is Selected?</th>
                          <th>
                            <span className='th-text'>Item ID</span>
                            <Button>Sort</Button>
                          </th>
                          <th>
                            <span className='th-text'>Item Name</span>
                            <Button>Sort</Button>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        
                            { itemsByQueryUnselected.map(item => {
                              return (
                                <tr key={item.id}>
                                  <td>
                                    { <Checkbox 
                                        checked={item.isSelected}
                                        onChange={ () => toggleSelection(item) }>
                                      </Checkbox> 
                                    } 
                                  </td>
                                  <td> { item.id } </td>
                                  <td> { item.name } </td>
                                </tr>
                              )
                            }) }
                      </tbody>
                    </table>
                  </div>
              </InfiniteScroll>

            </div>

           
          </div>

          <div className="main-page__right">
            <div className="main-page__left-actions">

            </div>

            <div className="main-page__left-table table-container" id='scrollable-div-2'>
               <InfiniteScroll
                    dataLength={selectedItems?.length}
                    next={() => fetchItems(_items?.length || 0, (_items?.length + 20))}
                    hasMore={true}
                    // loader={<h4>Loading...</h4>}
                    loader={<div></div>}
                    scrollableTarget="scrollable-div-2"
                  >
                      
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Is Selected?</th>
                          <th>
                            <span className='th-text'>Item ID</span>
                            <Button>Sort</Button>
                          </th>
                          <th>
                            <span className='th-text'>Item Name</span>
                            <Button>Sort</Button>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        
                            { itemsByQuerySelected.map(item => {
                              return (
                                <tr key={item.id}>
                                  {/* <td> { String(item.isSelected) } </td> */}
                                  <td>
                                    { <Checkbox 
                                        checked={item.isSelected}
                                        onChange={ () => toggleSelection(item) }>
                                      </Checkbox> 
                                    } 
                                  </td>
                                  <td> { item.id } </td>
                                  <td> { item.name } </td>
                                </tr>
                              )
                            }) }
                          {/* </InfiniteScroll> */}
                      </tbody>
                    </table>
                  </div>
              </InfiniteScroll>
            </div>
            
          </div>
        </div>

      </div>
  )
}

const MyApp: React.FC = () => (
  <App>
    <RegistryPage />
  </App>
);

export default MyApp;


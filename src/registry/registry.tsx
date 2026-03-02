import {App, Button, Checkbox, Flex, Input } from "antd";
import {PlusOutlined, RedoOutlined} from "@ant-design/icons";
import TableRegistryAll from "./model/TableRegistryAll.tsx";
import CreateNewRegisterDataModal from "./model/modals/CreateNewRegisterDataModal.tsx";
import {useModals, useRegister} from "../store.ts";
import './style/registry.modules.css'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { items } from "./items.ts";
import ItemsTable from "./components/ItemsTable/ItemsTable.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { CgLayoutGrid } from "react-icons/cg";

function RegistryPage() {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  let [_items, setItems] = useState([]);
  let [itemsByQuery, setItemsByQuery] = useState([]);
  let [query, setQuery] = useState('');

  useEffect(() => {
    fetchItems()
  }, []);

  useEffect(() => {
    const itemsByQuery = searchByQuery(query, _items);
    setItemsByQuery(itemsByQuery);
  }, [query, _items]);

  const fetchItems = (startIndex = 0, lastIndex = 20) => {
    const newElements = items.slice(startIndex, lastIndex);
    const newItems = [..._items, ...newElements];
    setItems(newItems);
    return newItems;
  }

  const setQueryEvent = (e) => {
    setQuery(
      e.target.value
    );
  }

  const searchByQuery = (query: string, items: any[]) => {
    const normalizeText = (text: string) => (text ?? '').trim().toLowerCase();
    const queryNormalized = normalizeText(query);

    const result = _items.filter(item => {
      const nameNormalized = normalizeText(item.name);
      return nameNormalized.includes(queryNormalized);
    });

    return result;
  }

  const toggleSelection = (item) => {
    const newValue = !item.isSelected;

    setItemsByQuery(
      itemsByQuery.map(e =>
        e.id === item.id ? { ...e, isSelected: newValue } : e
      )
    );
  }

  return (
      <div className="main-page__container">

        <div className="main-page__flex-container">
          <div className="main-page__left">

            <div className="main-page__left-actions">
              <div className="main-page__left-actions-search">
                <Input
                  type='text'
                  id="search-input"
                  onChange={setQueryEvent}>
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
                        
                            { itemsByQuery.map(item => {
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

               {/* <InfiniteScroll
                  dataLength={itemsByQuery.length}
                  next={() => fetchItems(itemsByQuery?.length || 0, (itemsByQuery?.length || 0 + 20))}
                  hasMore={true}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="scrollableDiv"
                >
                {itemsByQuery.map((i, index) => (
                  <div 
                  // style={style} 
                  key={index}>
                    div - #{index}
                  </div>
                ))} */}
          {/* </InfiniteScroll> */}
            </div>

           
          </div>

          <div className="main-page__right">
            Right
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


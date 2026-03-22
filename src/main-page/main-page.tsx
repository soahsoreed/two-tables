import {App, Button, Checkbox, Flex, Input } from "antd";
import {PlusOutlined, SearchOutlined, ArrowUpOutlined, ArrowDownOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import { items } from "./items.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import './main-page.modules.css'

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

  const [leftSortDirection, setLeftSortDirection] = useState(null);
  const [leftSortField, setLeftSortField] = useState(null);

  const [rightSortDirection, setRightSortDirection] = useState(null);
  const [rightSortField, setRightSortField] = useState(null);

   const inputRef = useRef(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const selected = _items.filter(item => item.isSelected);
    const unselected = _items.filter(item => !item.isSelected);
    setSelectedItems(selected);
    setUnselectedItems(unselected);
  }, [_items]);

  useEffect(() => {
    const sorted = sortBy(leftSortDirection, leftSortField, itemsByQueryUnselected);
    setUnselectedItems(sorted);
  }, [leftSortDirection, leftSortField]);

  useEffect(() => {
    const itemsByQuery = searchByQuery(queryUnselected, unselectedItems);
    setItemsByQueryUnselected(itemsByQuery);
  }, [queryUnselected, unselectedItems]);

  useEffect(() => {
    const itemsByQuery = searchByQuery(querySelected, selectedItems);
    setItemsByQuerySelected(itemsByQuery);
  }, [querySelected, selectedItems]);

  const fetchItems = (startIndex = 0, lastIndex = 20) => {
    const newElements = items.slice(startIndex, lastIndex);
    const newItems = [..._items, ...newElements];
    setItems(newItems);
    return newItems;
  }

  const searchByQuery = (query: string, items: any[]) => {
    const normalizeText = (text: string) => (text ?? '').trim().toLowerCase();
    const queryNormalized = normalizeText(query);

    const result = items.filter(item => {
      const nameNormalized = normalizeText(item.name);
      return nameNormalized.includes(queryNormalized);
    });

    return result;
  }

 const sortBy = (direction = 'dec', fieldName, items) => {
    const sorted = items.toSorted((a, b) => {
      const nameA = String(a[fieldName]).trim().toUpperCase();
      const nameB = String(b[fieldName]).trim().toUpperCase();

      const sortDec = () => nameA > nameB ? -1 : 1;
      const sortAcs = () => nameA > nameB ? 1 : -1;
      return direction === 'dec' ? sortDec() : sortAcs();
    });

    return sorted;
  }

  const toggleSelection = (item) => {
    const newValue = !item.isSelected;

    const newItems = _items.map(e =>
      e.id === item.id ? { ...e, isSelected: newValue } : e
    );

    setItems(newItems);
  }

  const toggleSortLeft = (fieldName: string) => {
    setLeftSortField(fieldName);

    const newSortDirection = leftSortDirection === 'dec' ? 'acc' : 'dec';

    if (newSortDirection !== leftSortDirection) {
      setLeftSortDirection(newSortDirection);
    }
  }

  const toggleSortRight = (fieldName: string) => {
    setRightSortField(fieldName);

    const newSortDirection = leftSortDirection === 'dec' ? 'acc' : 'dec';

    if (newSortDirection !== leftSortDirection) {
      setRightSortDirection(newSortDirection);
    }
  }

  const getLeftSortIcon = () => {
    if (leftSortDirection === 'dec') {
      return <ArrowDownOutlined />
    } else {
      return <ArrowUpOutlined />
    }
  }

  const setLeftInputValue = () => {
    const input = inputRef.current.input as HTMLInputElement;
    const value = input.value;
    setQueryUnselected(value);
  }

  const setRightInputValue = () => {
    const input = inputRef.current.input as HTMLInputElement;
    const value = input.value;
    setQuerySelected(value);
  }

  const clearQueryIfClearPressed = (query: string) => {
    if (!query) {
      setQueryUnselected('');
    }
  }

  const clearQueryIfRightClearPressed = (query: string) => {
    if (!query) {
      setQuerySelected('');
    }
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
                  allowClear
                  ref={inputRef}
                  disabled={!unselectedItems?.length}
                  onChange={(e) => clearQueryIfClearPressed(e.target.value)}>
                  </Input>
              </div>

              <div className="main-page__left-actions-search-button">
                <Button title='Поиск'
                  disabled={!unselectedItems?.length}
                  onClick={() => setLeftInputValue()}>
                  <SearchOutlined />
                </Button>
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
                            {/* <Button onClick={() => toggleSortLeft('id')}>
                              { leftSortField === 'id'
                                ? getLeftSortIcon()
                                : <span>Sort</span>
                              }
                            </Button> */}
                          </th>
                          <th>
                            <span className='th-text'>Item Name</span>
                            {/* <Button onClick={() => toggleSortLeft('name')}>
                              { leftSortField === 'name'
                                ? getLeftSortIcon()
                                : <span>Sort</span>
                              }
                            </Button> */}
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
              <div className="main-page__left-actions-search">
                <Input
                  type='text'
                  id="search-input-right"
                  allowClear
                  disabled={!selectedItems.length}
                  ref={inputRef}
                  onChange={(e) => clearQueryIfRightClearPressed(e.target.value)}>
                  </Input>
              </div>

              <div className="main-page__left-actions-search-button">
                <Button title='Поиск'
                  disabled={!selectedItems.length}
                  onClick={() => setRightInputValue()}>
                  <SearchOutlined />
                </Button>
              </div>
            </div>

            <div className="main-page__left-table table-container" id='scrollable-div-2'>
               <InfiniteScroll
                    dataLength={selectedItems?.length}
                    next={() => fetchItems(_items?.length || 0, (_items?.length + 20))}
                    hasMore={true}
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
                            {/* <Button>Sort</Button> */}
                          </th>
                          <th>
                            <span className='th-text'>Item Name</span>
                            {/* <Button>Sort</Button> */}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        
                            { itemsByQuerySelected.map(item => {
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


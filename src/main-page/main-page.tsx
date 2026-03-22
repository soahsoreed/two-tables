import {App, Button, Checkbox, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import './main-page.modules.css'
import { baseUrl } from "../baseUrl.ts";

function RegistryPage() {
  // const { notification } = App.useApp();
  // const navigate = useNavigate();

  const [_items, setItems] = useState([]);
  const [paginationData, setPaginationData] = useState({ page: 1, total: 0, limit: 20 });
  const [query, setQuery] = useState('');

  const [unselectedItems, setUnselectedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchItems(paginationData.page, paginationData.limit, query);
  }, []);

  useEffect(() => {
    const selected = _items.filter(item => item.isSelected);
    const unselected = _items.filter(item => !item.isSelected);
    debugger
    setSelectedItems(selected);
    setUnselectedItems(unselected);
  }, [_items]);

  useEffect(() => {
    fetchItems(1, paginationData.limit, query);
  }, [query]);

  const fetchItems = async (page, limit, query = '') => {

    try {

      const data = await fetch(`${baseUrl}/records?` + 
          `page=${page}&` + 
          `limit=${limit}&` + 
          `search=${query}`
        )
        .then(res => res.json());
      
      const newItems = data.pagination.page === 1
        ? data.items
        : _items.concat(data.items);

      setItems(newItems);
      setPaginationData(data.pagination);
      // debugger
      return newItems;
      
    } catch (error) {
      
      console.log('Error while fetch items')

    };
  }

  const toggleSelection = (item) => {
    const newValue = !item.isSelected;

    fetch(`${baseUrl}/records/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isSelected: newValue })
    })
      .then(_ => fetchItems(1, paginationData.limit * (paginationData.page - 1), query));
  }

  const setInputValue = () => {
    const input = inputRef.current.input as HTMLInputElement;
    const value = input.value;
    setQuery(value);
  }

  const clearQueryIfClearPressed = (query: string) => {
    if (!query) {
      setQuery('');
    }
  }

  return (
      <div className="main-page__container">

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
                  onClick={() => setInputValue()}>
                  <SearchOutlined />
                </Button>
              </div>

              <div className="main-page__left-actions-add">
                <Button title='Добавить запись'>
                  <PlusOutlined />
                </Button>
              </div>
              
        </div>

        <div className="main-page__flex-container">
          <div className="main-page__left">
            <div className="main-page__left-table table-container" id='scrollable-div'>
              <InfiniteScroll
                    dataLength={_items?.length}
                    next={() => fetchItems(paginationData.page + 1, paginationData.limit, query)}
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
                          </th>
                          <th>
                            <span className='th-text'>Item Name</span>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        
                            { unselectedItems.map((item, index) => {
                              return (
                                <tr key={index}>
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
            <div className="main-page__left-table table-container" id='scrollable-div-2'>
               <InfiniteScroll
                    dataLength={selectedItems?.length}
                    next={() => fetchItems(paginationData.page + 1, paginationData.limit, query)}
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
                        
                            { selectedItems.map((item, index2) => {
                              return (
                                <tr key={index2}>
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


import {App, Button, Checkbox, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './main-page.modules.css';
import { baseUrl } from "../baseUrl.ts";
import { ReactSortable } from "react-sortablejs";
import { IRecord } from "./IRecord.ts";
import { sortBySortIndex } from "./sortBySortIndex.ts";
import NewItemModal from "./components/AddItemModal/NewItemModal.tsx";

function RegistryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const unselected = _items.filter(item => !item.isSelected);
    const selected = sortBySortIndex(_items.filter(item => item.isSelected));
    setSelectedItems(selected);
    setUnselectedItems(unselected);
  }, [_items]);

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
      return newItems;
      
    } catch (error) {
      
      console.log('Error while fetch items')

    };
  }

  const toggleSelection = (item) => {
    const selectedNewValue = !item.isSelected;

    return fetch(`${baseUrl}/records/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        isSelected: selectedNewValue
      })
    })
      .then(_ => fetchItems(1, paginationData.limit * paginationData.page, query));
  }

  const updateTopItemId = (item) => {
    const sortIndexNewValue = item.sortIndex;

    return fetch(`${baseUrl}/records/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        sortIndex: sortIndexNewValue
      })
    });
  }

  const updateSortOrder = () => {
    const sorted = selectedItems.map((it, index) => {
      return {
        ...it,
        sortIndex: index
      }
    });

    Promise.all(sorted.map(it => updateTopItemId(it)))
      .then(_ => fetchItems(1, paginationData.limit * paginationData.page, query));
  }

  const openNewItemModal = () => {
    setIsModalOpen(true);
  }

  const addNewItem = (item: IRecord) => {
    return fetch(`${baseUrl}/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        isSelected: item.isSelected,
      })
    })
      .then(_ => fetchItems(paginationData.page, paginationData.limit, query));
  }

  return (
      <div className="main-page__container">
        <NewItemModal isOpen={isModalOpen} handleOk={(item) => addNewItem(item)}></NewItemModal>

        <div className="main-page__actions">
          <div className="main-page__actions-search">
            <Input
              type='text'
              id="search-input"
              allowClear
              onChange={(e) => setQuery(e.target.value)}>
            </Input>
          </div>

          <div className="main-page__actions-search-button">
            <Button title='Поиск'
              disabled={query?.length === 0}
              onClick={() => fetchItems(1, paginationData.limit, query)}>
              <SearchOutlined />
            </Button>
          </div>

          <div className="main-page__actions-add">
            <Button title='Добавить запись' onClick={() => openNewItemModal()}>
              <PlusOutlined />
            </Button>
          </div>
        </div>

        <div className="main-page__flex-container">

          <div className="main-page__left">
            <div className='item-row__header'>
              <div className='item-row__id'>Id</div>
              <div className='item-row__name'>Name</div>
              <div className='item-row__selection'>is selected?</div>
            </div>

            <div className="main-page__left-table table-container" id='scrollable-div'>
              <InfiniteScroll
                dataLength={_items?.length}
                next={() => fetchItems(paginationData.page + 1, paginationData.limit, query)}
                hasMore={true}
                loader={<div></div>}
                scrollableTarget="scrollable-div">

                  <div className="table-container">
                      {unselectedItems.map((item) => (
                        <div className='item-row' key={item.id}>
                          <div className='item-row__id'>{item.id}</div>
                          <div className='item-row__name'>{item.name}</div>
                          <div className='item-row__selection'>
                            { <Checkbox 
                                checked={item.isSelected}
                                onChange={ () => toggleSelection(item) }>
                              </Checkbox> } 
                          </div>
                        </div>
                      ))}
                  </div>
              </InfiniteScroll>

            </div>
          </div>

          <div className="main-page__right">
            <div className='item-row__header'>
            <div className='item-row__id'>Id</div>
            <div className='item-row__name'>Name</div>
            <div className='item-row__selection'>is selected?</div>
            </div>

            <div className="main-page__left-table table-container" id='scrollable-div-2'>
               <InfiniteScroll
                    dataLength={selectedItems?.length}
                    next={() => fetchItems(paginationData.page + 1, paginationData.limit, query)}
                    hasMore={true}
                    loader={<div></div>}
                    scrollableTarget="scrollable-div-2"
                  >
                  <div className="table-container">
                    <ReactSortable 
                      list={selectedItems} 
                      setList={setSelectedItems} >

                        {selectedItems.map((item) => (
                          <div className='item-row' key={item.id} onDragEnd={() => updateSortOrder()}>
                            <div className='item-row__id'>{item.id}</div>
                            <div className='item-row__name'>{item.name}</div>
                            <div className='item-row__selection'>
                              { <Checkbox 
                                  checked={item.isSelected}
                                  onChange={ () => toggleSelection(item) }>
                                </Checkbox> 
                              } 
                            </div>
                          </div>
                        ))}
                      </ReactSortable>
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


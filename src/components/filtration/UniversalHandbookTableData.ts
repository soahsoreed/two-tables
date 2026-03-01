import {InputRef, TableColumnsType, TableColumnType} from "antd";
import {FilterDropdownProps} from "antd/es/table/interface";
import React from "react";
import { getColumnSearchProps } from "./getColumnSearchPropsFunc";
import {IManager} from "../../handbooks/store/managers.ts";

export interface EditTableDataProps {
  setIsModalOpen: (value: boolean) => void;
  setInitialValues: (value: IManager) => void;
  setIsEdit: (value: boolean) => void;
}

export class UniversalHandbookTableData<T> {
  searchInput: React.RefObject<InputRef>;
  searchText: React.Key;
  searchedColumn: keyof T;
  data: T[];
  columns: TableColumnsType<T>;
  title: string;

  constructor() {
    this.searchInput = React.createRef<InputRef>();
    this.searchText = '';
    this.searchedColumn = '' as keyof T;
    this.data = [];
    this.columns = []; // Она будет задаваться в конкретных классах-наследниках
  }

  handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: keyof T) => {
    confirm();
    this.searchText = selectedKeys[0];
    this.searchedColumn = dataIndex;
  };

  handleReset = (clearFilters: () => void, dataIndex: keyof T, _selectedKeys: string[], confirm: FilterDropdownProps['confirm']) => {
    clearFilters();
    confirm({ closeDropdown: true });
    this.searchText = '';
    this.searchedColumn = dataIndex;
  };

  getColumnSearchProps = (dataIndex: keyof T): TableColumnType<T> => {
    return getColumnSearchProps<T>(
      this.searchInput,
      this.handleSearch,
      this.handleReset,
      dataIndex
    );
  };

  setColumns(columns: TableColumnsType<T>) {
    this.columns = columns;
  }

  // // Этот метод должен быть реализован в каждом конкретном классе
  // fetchData() {
  //   throw new Error("fetchData must be implemented in derived class.");
  // }
}

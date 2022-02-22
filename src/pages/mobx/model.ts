import { makeAutoObservable } from "mobx";
import { IFetchUserListResult } from "./api";

export default class Model {
  filterForm = { name: "" };

  userList: IFetchUserListResult["result"]["rows"] = [];

  pagination = {
    size: 10,
    page: 1,
    hasMore: true,
  };

  loading = false;

  runFetch = 0;
}

export const createModel = () => makeAutoObservable(new Model());

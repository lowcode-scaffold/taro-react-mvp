import { useState } from "react";
import { reaction } from "@formily/reactive";
import { useDebounceFn } from "taro-hooks";
import { createModel } from "./model";
import Service from "./service";

const usePresenter = () => {
  const [model] = useState(createModel());
  const service = new Service(model);

  reaction(
    () => model.runFetch,
    () => {
      service.getUserList();
    },
    { fireImmediately: true }
  );

  const handleFormChange = (name: string, value: any) => {
    service.changeFilterForm(name, value);
  };

  const handleSearch = useDebounceFn(
    () => {
      service.doSearch();
    },
    { wait: 300 }
  ).run;

  const handleRefresh = () => {
    service.refresh();
  };

  const handleNextPage = () => {
    service.nextPage();
  };

  return {
    model,
    handleFormChange,
    handleSearch,
    handleRefresh,
    handleNextPage,
  };
};

export default usePresenter;

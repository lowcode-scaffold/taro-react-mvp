import { useEffect } from "react";
import { useDebounceFn } from "taro-hooks";
import { useModel } from "./model";
import Service from "./service";

const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  useEffect(() => {
    service.getUserList();
  }, [model.runFetch]);

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

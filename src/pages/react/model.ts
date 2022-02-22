import { useImmer as useState } from "use-immer";
import { IFetchUserListResult } from "./api";

export const useModel = () => {
  const [filterForm, setFilterForm] = useState({ name: "" });

  const [userList, setUserList] = useState<
    IFetchUserListResult["result"]["rows"]
  >([]);

  const [pagination, setPagination] = useState({
    size: 10,
    page: 1,
    hasMore: true,
  });

  const [loading, setLoading] = useState(false);

  const [runFetch, setRunFetch] = useState(0);

  return {
    filterForm,
    setFilterForm,
    userList,
    setUserList,
    pagination,
    setPagination,
    loading,
    setLoading,
    runFetch,
    setRunFetch,
  };
};

export type Model = ReturnType<typeof useModel>;

import { delUser, fetchUserList } from "./api";
import { Model } from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async getUserList() {
    if (this.model.loading) {
      return;
    }
    this.model.setLoading(true);
    const res = await fetchUserList({
      page: this.model.pagination.page,
      size: this.model.pagination.size,
      name: this.model.filterForm.name,
    }).catch(() => {});
    if (res) {
      if (this.model.pagination.page === 1) {
        this.model.setUserList(res.result.rows);
      } else {
        this.model.setUserList(this.model.userList.concat(res.result.rows));
      }
      if (res.result.rows.length >= this.model.pagination.size) {
        this.model.setPagination((s) => {
          s.hasMore = true;
        });
      } else {
        this.model.setPagination((s) => {
          s.hasMore = false;
        });
      }
      this.model.setLoading(false);
    }
  }

  changeFilterForm(name: string, value: any) {
    this.model.setFilterForm((s: any) => {
      s[name] = value;
    });
  }

  doSearch() {
    this.model.setPagination((s) => {
      s.page = 1;
    });
    this.model.setRunFetch(this.model.runFetch + 1);
  }

  async del(id: number) {
    this.model.setLoading(true);
    await delUser({ id }).finally(() => {
      this.model.setLoading(false);
    });
  }

  refresh() {
    this.model.setPagination((s) => {
      s.page = 1;
    });
    this.model.setRunFetch(this.model.runFetch + 1);
  }

  nextPage() {
    if (this.model.pagination.hasMore) {
      this.model.setPagination((s) => {
        s.page += 1;
      });
      this.model.setRunFetch(this.model.runFetch + 1);
    }
  }
}

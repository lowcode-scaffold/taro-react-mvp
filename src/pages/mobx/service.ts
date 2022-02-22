import { runInAction } from "mobx";
import { fetchUserList } from "./api";
import Model from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async getUserList() {
    if (this.model.loading) {
      return;
    }
    runInAction(() => {
      this.model.loading = true;
    });
    const res = await fetchUserList({
      page: this.model.pagination.page,
      size: this.model.pagination.size,
      name: this.model.filterForm.name,
    }).catch(() => {});
    if (res) {
      runInAction(() => {
        if (this.model.pagination.page === 1) {
          this.model.userList = res.result.rows;
        } else {
          this.model.userList = this.model.userList.concat(res.result.rows);
        }
        if (res.result.rows.length >= this.model.pagination.size) {
          this.model.pagination.hasMore = true;
        } else {
          this.model.pagination.hasMore = false;
        }
        this.model.loading = false;
      });
    }
  }

  changeFilterForm(name: string, value: any) {
    runInAction(() => {
      (this.model.filterForm as any)[name] = value;
    });
  }

  doSearch() {
    runInAction(() => {
      this.model.pagination.page = 1;
      this.model.runFetch += 1;
    });
  }

  refresh() {
    runInAction(() => {
      this.model.pagination.page = 1;
      this.model.runFetch += 1;
    });
  }

  nextPage() {
    if (this.model.pagination.hasMore) {
      runInAction(() => {
        this.model.pagination.page += 1;
        this.model.runFetch += 1;
      });
    }
  }
}

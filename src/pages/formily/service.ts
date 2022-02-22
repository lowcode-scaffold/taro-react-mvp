import { action } from "@formily/reactive";
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
    action(() => {
      this.model.loading = true;
    });
    const res = await fetchUserList({
      page: this.model.pagination.page,
      size: this.model.pagination.size,
      name: this.model.filterForm.name,
    }).catch(() => {});
    if (res) {
      action(() => {
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
    action(() => {
      (this.model.filterForm as any)[name] = value;
    });
  }

  doSearch() {
    action(() => {
      this.model.pagination.page = 1;
      this.model.runFetch += 1;
    });
  }

  refresh() {
    action(() => {
      this.model.pagination.page = 1;
      this.model.runFetch += 1;
    });
  }

  nextPage() {
    if (this.model.pagination.hasMore) {
      action(() => {
        this.model.pagination.page += 1;
        this.model.runFetch += 1;
      });
    }
  }
}

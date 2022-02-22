import { ScrollView, View } from "@tarojs/components";
import { AtInput, AtIcon, AtList, AtListItem } from "taro-ui";
import React from "react";
import { Observer } from "@formily/reactive-react";
import styles from "./index.module.less";
import usePresenter from "./presenter";

const Page = () => {
  const presenter = usePresenter();
  const { model } = presenter;
  return (
    <Observer>
      {() => (
        <View className={styles.list}>
          <AtInput
            placeholder="输入名称查询"
            value={model.filterForm.name}
            border={false}
            name="name"
            clear
            onChange={(value) => {
              presenter.handleFormChange("name", value);
              presenter.handleSearch();
            }}
          >
            <AtIcon value="search" color="silver" />
          </AtInput>
          <ScrollView
            className={styles.scrollView}
            scrollY
            refresherEnabled
            refresherTriggered={model.loading}
            onRefresherRefresh={() => {
              presenter.handleRefresh();
            }}
            onScrollToLower={() => {
              presenter.handleNextPage();
            }}
          >
            <AtList hasBorder={false}>
              {model.userList.map((s) => {
                return (
                  <AtListItem
                    key={s.id}
                    title={s.name}
                    note={s.address}
                    hasBorder={false}
                    arrow="right"
                    thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
                  />
                );
              })}
            </AtList>
          </ScrollView>
        </View>
      )}
    </Observer>
  );
};

export default Page;

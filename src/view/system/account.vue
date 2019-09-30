<template>
  <div>
    <Form :model="searchItem" :label-width="60" ref="searchItem" inline :rules="searchRules">
      <FormItem label="名字">
        <Input v-model="searchItem.name" placeholder="请输入名字..." style="width: auto" />
      </FormItem>
      <FormItem label="账号名">
        <Input v-model="searchItem.accountName  " placeholder="请输入账号名..." style="width: auto" />
      </FormItem>
      <FormItem style="margin-left: -30px;">
        <Button type="primary" @click="querySubmit()">查询</Button>
      </FormItem>
    </Form>

    <Table border :columns="columnsTitle" :data="list">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>

      <template slot-scope="{ row, index }" slot="number">{{ index + 1}}</template>

      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
    <Page
      style="margin-top: 10px"
      :total="size"
      @on-change="changePageEvent"
      show-elevator
      show-total
    />
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      searchItem: {
        name: "",
        accountName: ""
      },
      searchRules: {
        name: [{ required: true, message: "请输入姓名.", trigger: "blur" }],
        accountName: [
          { required: true, message: "请输入账号名.", trigger: "blur" }
        ]
      },
      msg: "account  manager",
      columnsTitle: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          width: 90,
          align: "center",
          slot: "number"
        },
        {
          title: "名字",
          slot: "name"
        },
        {
          title: "账号名",
          key: "accountName"
        },
        {
          title: "备注",
          key: "backup"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      list: [],
      size: 20,
      index: 1
    };
  },
  methods: {
    getList() {
      let params = {
        name: this.searchItem.name,
        accountName: this.searchItem.accountName,
        size: this.size,
        index: this.index
      };

      this.$ajax.post({
        url: "/account/getInfo",
        params: params,
        success: result => {
          let page = result.data;
          this.list = page.list;
          this.size = page.pageSize;
        },
        failure: () => {
          this.$Notice.error({
            title: "提示",
            desc: "数据读取错误"
          });
        }
      });
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.list[index].name}<br>Age：${this.list[index].accountName}<br>Address：${this.list[index].backup}`
      });
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    querySubmit() {
      this.getList();
    },
    changePageEvent(currentIndex) {
      console.log(1);
    }
  },
  components: {},
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
</style>

<template>
  <div>
    <Form :model="searchItem" :label-width="60" ref="searchItem" inline>
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
        <Button type="warning" size="small"  @click="toShowAuthorityList(index)">授权</Button>
      </template>
    </Table>
    <Page
      style="margin-top: 10px"
      :total="total"
      :page-size="size"
      @on-change="changePageEvent"
      show-elevator
      show-total
    />

    <Modal draggable scrollable v-model="isDisplay"  :mask-closable="false"
        :style="{top: '90px'}">

      <p slot="header">
        <span>授权角色列表</span>
      </p>

       <Transfer
        :titles ="authorityListTitles"
        :data="roleDataList"
        :target-keys="hadRoleIds"
        :selected-keys="selectedRolesKey"
        @on-change="handleChangeRole"></Transfer>
      <div slot="footer">
        <Button @click="isDisplay = false">取消</Button>
        <Button type="primary" @click="confirmAndUpdateAuthority()" >确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      authorityListTitles: ['未授权角色', '已授权角色'],
      roleDataList:[],
      selectedRolesKey:[],
      hadRoleIds: [],
      isDisplay: false,

      searchItem: {
        name: "",
        accountName: ""
      },
      columnsTitle: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          width: 70,
          align: "center",
          slot: "number"
        },
        {
          title: "名字",
          width: 140,
          slot: "name"
        },
        {
          title: "账号名",
           width: 160,
          key: "accountName"
        },
        {
          title: "拥有角色",
          key: "roleNameList"
        },
        {
          title: "操作",
          slot: "action",
          width: 120,
          align: "center"
        }
      ],
      list: [],
      size: 10,
      total: 0,
      index: 1,
      authorityId:''
    };
  },
  methods: {
    handleChangeRole (newTargetKeys, direction, moveKeys) {
                this.hadRoleIds = newTargetKeys;
    },
    getList() {
      let params = {
        name: this.searchItem.name,
        accountName: this.searchItem.accountName,
        size: this.size,
        index: this.index
      };

      this.$ajax.post({
        url: "/authority/getPageList",
        params: params,
        notice: false,
        success: result => {
          let page = result.data;
          this.list = page.list;
          this.total = page.total;
        }
      });
    },
    getRoleList(){
      this.$ajax.post({
        url: "/authority/getRoleList",
        notice:false,
        success: result => {
          let dataList = result.data;
          this.roleDataList = []
          if(dataList.length > 0){
             for(let item of dataList){
                this.roleDataList.push({
                      key: item.id.toString(),
                      label: item.roleName
                });
             }
          }
        }
      });
    },
    toShowAuthorityList(index) {
      let rowData = this.list[index]
      this.authorityId = rowData.id
      let roleIdList = rowData['roleIdList']
      if(roleIdList){
          this.hadRoleIds = roleIdList.split(',')
      }else{
          this.hadRoleIds = []
      }
          this.isDisplay = true
    },
    confirmAndUpdateAuthority(){
      let params = {
        id : this.authorityId
      }
      if(this.hadRoleIds.length > 0){
        params['roleIds'] = this.hadRoleIds
      }
      this.$ajax.post({
        url: "/authority/updateAuthorityById",
        params: params,
        success: result => {
            this.isDisplay = false
            this.getList();
        }
      });
    },
    querySubmit() {
      this.getList();
    },
    changePageEvent(currentIndex) {
      this.index = currentIndex;
      this.getList();
    }
  },
  components: {},
  mounted() {
    this.getList();
    //获取所以角色列表
    this.getRoleList();
  }
};
</script>

<style scoped>

</style>

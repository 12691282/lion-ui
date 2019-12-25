<template>
  <div>
    <Form :model="searchItem" :label-width="80" ref="searchItem" inline>
      <FormItem label="角色名称">
        <Input v-model="searchItem.roleName"  maxlength="24" placeholder="请输入角色名称..." style="width: auto" />
      </FormItem>
      <FormItem style="margin-left: -30px;">
        <Button type="primary" @click="querySubmit()">查询</Button>
      </FormItem>
      <FormItem style="margin-left: -60px;">
        <Button type="success" @click="addNew()">新增</Button>
      </FormItem>
    </Form>

    <Table border :columns="columnsTitle" :data="list">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="number">{{ index + 1}}</template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" size="small"  @click="resourceConfig(row)">资源配置</Button>
        <Button type="primary" size="small"  @click="editRecord(index)">修改</Button>
        <Button type="error" size="small"    @click="deleteRecord(index)" >删除</Button>
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

    <Modal draggable scrollable v-model="isDisplay" :style="{top: '20px'}" :mask-closable="false">
      <p slot="header">
        <span>{{titleName}}</span>
      </p>
      <Form ref="roleModel" :model="roleModel" :label-width="80" :rules="roleModelRules">
        <FormItem label="角色名称" prop="roleName">
          <Input
            type="text"
            v-model="roleModel.roleName"
            maxlength="24"
            show-word-limit
            placeholder="请输入角色名称"
          />
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input
            type="textarea"
            v-model="roleModel.description"
            :rows="2"
            maxlength="50"
            show-word-limit
            placeholder="请输入描述"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="isDisplay = false">取消</Button>
        <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
        <Button type="primary" @click="submitData">确定</Button>
      </div>
    </Modal>


     <Modal draggable scrollable v-model="resourceTreeModel" :style="{top: '20px'}" :mask-closable="false">
      <p slot="header">
        <span>资源配置</span>
      </p>
          <Tree :data="data2" show-checkbox></Tree>
      <div slot="footer">
        <Button @click="resourceTreeModel = false">取消</Button>
        <Button type="primary" @click="submitData">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Config from '../../config'

export default {
  name: "",
  data() {
    return {
      isDisplay: false,
      resourceTreeModel : false,
      titleName: "",
      roleModel: {
        id: "",
        roleName: "",
        description: ""
      },
      searchItem: {
        roleName: ""
      },
      roleModelRules: {
        roleName: [
          { required: true, message: "请输入角色名称.", trigger: "blur" }
        ] 
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
          title: "角色名称",
          key: "roleName"
        },
 
        {
          title: "描述",
          key: "description"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      list: [],
      size: Config.default_page_size,
      total: 0,
      index: 1,
      data2: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                checked: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        checked: true
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
    };
  },
  methods: {
    getList() {
      let params = {
        roleName: this.searchItem.roleName,
        size: this.size,
        index: this.index
      };

      this.$ajax.post({
        url: "/role/getList",
        params: params,
        notice: false,
        success: result => {
          let page = result.data;
          this.list = page.list;
          this.total = page.total;
        }
      });
    },
    editRecord(index) {
      this.titleName = "修改";
      let rowRocord = this.list[index];
      this.$refs.roleModel.resetFields();
      let newObj = {};
      for (let indx in rowRocord) {
        newObj[indx] = rowRocord[indx];
      }
      this.roleModel = newObj;
      this.isDisplay = true;
    },
    deleteRecord(index) {
      let record = this.list[index]
      this.$Modal.confirm({
          title: '删除确认!',
          content: '<p>是否删除 '+record.roleName+' 的角色</p>',
          onOk: () => {
              let params = {
                id: record.id
              };
              this.$ajax.post({
                  url: "/role/deleteRecordById",
                  params: params,
                  success: result => {
                    this.reloadList();
                  }
              });
          },
          cancelText: '取消'
      });
    },
    querySubmit() {
      this.getList();
    },
    changePageEvent(currentIndex) {
      this.index = currentIndex;
      this.getList();
    },
    addNew() {
      this.titleName = "新增";
      this.handleReset();
      this.isDisplay = true;
    },
    submitData() {
      this.$refs.roleModel.validate(valid => {
        if (valid) {
          let params = this.roleModel;
          this.$ajax.post({
            url: "/role/saveOrUpdate",
            params: params,
            success: result => {
              this.reloadList();
            }
          });
        }
      });
    },
    handleReset(name) {
      this.roleModel.id = null
      this.$refs.roleModel.resetFields();
    },
    reloadList() {
      this.searchItem.roleName = "";
      this.getList();
      this.isDisplay = false;
    },
    resourceConfig(_row) {
      let params = {
        roleId : _row.id
      }
      this.$ajax.post({
        url: "/resource/getConfigTreeById",
        notice: false,
        params: params,
        success: result => {
          let resouceTreeData = result.data;
          console.log(resouceTreeData)
          this.resourceTreeModel = true
        }
      });
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

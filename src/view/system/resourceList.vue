<template>
  <div>
    <Form :model="searchItem" :label-width="80" ref="searchItem" inline>
      <FormItem label="资源名称">
        <Input
          v-model="searchItem.roleName"
          maxlength="24"
          placeholder="请输入资源名称..."
          style="width: auto"
        />
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
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="addChildRecord(index)">增加子节点</Button>
        <Button type="primary" size="small" @click="editRecord(index)">修改</Button>
        <Button type="error" size="small" @click="deleteRecord(index)">删除</Button>
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

    <Modal scrollable :closable="false" width="400px;" v-model="isDisplay" :style="{top: '20px'}" :mask-closable="false">
      <p slot="header">
        <span>{{titleName}}</span>
      </p>
      <Form
        ref="resourceModel"
        :model="resourceModel"
        :label-width="80"
        :rules="resourceModelRules"
      >
        <FormItem label="上级资源">
          <Poptip placement="bottom-start">
            <Input v-model="resourceModel.pname" style="width: 286px;" placeholder="选择上级资源" />
            <div class="api" slot="content">
                 <Tree :data="data2" ref="higherUpsTree" readonly @on-select-change="selectHigherUps" ></Tree>
            </div>
          </Poptip>
        </FormItem>

        <FormItem label="资源名称" prop="resourceName">
          <Input
            type="text"
            v-model="resourceModel.resourceName"
            maxlength="24"
            show-word-limit
            placeholder="请输入资源名称"
          />
        </FormItem>

        <FormItem label="资源连接" prop="resourceUrl">
          <Input
            type="text"
            v-model="resourceModel.resourceUrl"
            maxlength="24"
            show-word-limit
            placeholder="请输入资源连接"
          />
        </FormItem>

        <FormItem label="资源类型" prop="resourceType">
          <Select v-model="resourceModel.resourceType">
            <Option
              v-for="item in resourceTypeList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="描述" prop="description">
          <Input
            type="textarea"
            v-model="resourceModel.description"
            :rows="2"
            maxlength="50"
            show-word-limit
            placeholder="请输入描述"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelInput()">取消</Button>
        <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
        <Button type="primary" @click="submitData">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Config from "../../config";

export default {
  name: "",
  data() {
    return {
      data2: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                    }
                                ]
                            }
                        ]
                    }
                ],
      higherUpsList: [],
      resourceTypeList: [
        { value: 0, label: "菜单" },
        { value: 1, label: "按钮" }
      ],
      isDisplay: false,
      titleName: "",
      resourceModel: {
        id: "",
        pid: "",
        pname: "",
        resourceName: "",
        resourceUrl: "",
        resourceType: "",
        description: ""
      },
      searchItem: {
        roleName: ""
      },
      resourceModelRules: {
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
          title: "资源名称",
          key: "resourceName"
        },
        {
          title: "资源连接",
          key: "resourceUrl"
        },
        {
          title: "资源类型",
          key: "resourceTypeName"
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
      index: 1
    };
  },
  methods: {
    getList() {
      let params = {
        resourceName: this.searchItem.resourceName,
        size: this.size,
        index: this.index
      };

      this.$ajax.post({
        url: "/resource/getList",
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
      this.$refs.resourceModel.resetFields();
      let newObj = {};
      for (let indx in this.resourceModel) {
        newObj[indx] = rowRocord[indx];
      }
      this.resourceModel = newObj;
      this.isDisplay = true;
    },
    deleteRecord(index) {
      let record = this.list[index];
      this.$Modal.confirm({
        title: "删除确认!",
        content: "<p>是否删除 " + record.resourceName + " 的资源</p>",
        onOk: () => {
          let params = {
            id: record.id
          };
          this.$ajax.post({
            url: "/resource/deleteRecordById",
            params: params,
            success: result => {
              this.reloadList();
            }
          });
        },
        cancelText: "取消"
      });
    },
    addChildRecord(index) {
        this.handleReset();
        let record = this.list[index];
        this.resourceModel.pid = record.id;
        this.resourceModel.pname = record.resourceName;
        this.isDisplay = true;
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
      this.$refs.resourceModel.validate(valid => {
        if (valid) {
          let params = this.resourceModel;
          this.$ajax.post({
            url: "/resource/saveOrUpdate",
            params: params,
            success: result => {
              this.reloadList();
            }
          });
        }
      });
    },
    cancelInput () {
        this.handleReset();
        this.isDisplay = false
    },  
    handleReset() {
      this.resourceModel.id = null;
      this.resourceModel.pid = null;
      this.resourceModel.pname = null;
      this.$refs.resourceModel.resetFields();
      let selectedNodes = this.$refs.higherUpsTree.getSelectedNodes();
      if(selectedNodes){
        for(let node of selectedNodes){
            node.selected = false
        }
      }
    },
    reloadList() {
      this.searchItem.roleName = "";
      this.getList();
      this.isDisplay = false;
    },
    selectHigherUps (_nodes){
        let node = _nodes[0]
        if(node){
            this.resourceModel.pid = node.nodeKey
            this.resourceModel.pname = node.title
        }
        
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

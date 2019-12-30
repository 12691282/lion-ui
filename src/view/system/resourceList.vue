<template>
  <div>
    <Form :model="searchItem" :label-width="80" ref="searchItem" inline>
      <FormItem label="资源名称">
        <Input
          v-model="searchItem.roleName"
          maxlength="24"
          placeholder="请输入资源名称..."
        />
      </FormItem>
      <FormItem style="margin-left: -30px;">
        <Button type="primary" @click="querySubmit()">查询</Button>
      </FormItem>
      <FormItem style="margin-left: -60px;">
        <Button type="success" @click="addNew()">新增</Button>
      </FormItem>
    </Form>

    <TreeTable :items='treeTableDatalist'  :columns='columnsTitle'>
         <template slot-scope="{ data }" slot="icon">
            <Icon  :type="data.icon"   style="font-size: 20px;"/>
         </template>
         <template slot-scope="{ data }" slot="action">
            <Button type="primary" size="small" @click="addChildRecord(data)">增加子节点</Button>
            <Button type="primary" size="small" @click="editRecord(data)">修改</Button>
            <Button type="error" size="small" @click="deleteRecord(data)">删除</Button>
         </template>
    </TreeTable>

    <Modal
      scrollable
      :closable="false"
      width="400px;"
      v-model="isDisplay"
      :style="{top: '20px'}"
      :mask-closable="false"
    >
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
              <Tree
                :data="rootTreeNode"
                ref="higherUpsTree"
                readonly
                @on-select-change="selectHigherUps"
              ></Tree>
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

        <FormItem label="图标" prop="icon">
          <Poptip placement="bottom-start">
            <Input v-model="resourceModel.icon" style="width: 286px;" placeholder="选择图标" />
            <div class="api" slot="content">
                   <template v-for="(iconItem, iconIndex) in iconList" >
                      <Icon  :key="iconIndex" @click="selectIcon(iconIndex)" :type="iconItem"   style="font-size: 30px;"/>
                      <br  v-if="checkIconIndex(iconIndex)" />
                   </template>
            </div>
          </Poptip>
        </FormItem>

        <FormItem label="顺序号" prop="orderNo">
          <Input
            type="text"
            v-model="resourceModel.orderNo"
            maxlength="4"
            show-word-limit
            placeholder="请输入顺序号"
          />
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
import TreeTable from '@/components/tree-table'
import Config from "../../config";

export default {
  name: "resourceList",
  components: {TreeTable},
  data() {
    return {
      rootTreeNode:[{'title':'系统菜单', 'value': null, 'expand':true, children:[]}],
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
        icon:"",
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
          title: "资源名称",
          width: 50,
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
          title: "资源图标",
          slot: "icon",
          align: "center"
        },
        {
          title: "描述",
           width: 140,
          key: "description"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      treeTableDatalist: [],
      index: 1,
      iconList:["ios-browsers","ios-chatbubbles","logo-buffer","ios-create","ios-copy",
        "ios-clipboard-outline","ios-folder-open-outline","ios-paper-outline","ios-menu",
        "ios-photos-outline","md-settings","ios-speedometer","md-stats","ios-switch",
        "ios-time","ios-pricetags-outline","ios-podium-outline","ios-list","ios-keypad-outline",
        "ios-create-outline","md-person-add","md-bookmarks"]
    };
  },
  methods: {
    selectIcon(_index){
        this.resourceModel.icon = this.iconList[_index];
    },
    checkIconIndex(_index){
        return ((_index+1) % 5 === 0)
    },
    getList() {
      let params = {
        resourceName: this.searchItem.resourceName,
        size: this.size,
        index: this.index
      };

      this.$ajax.post({
        url: "/resource/getTreeList",
        params: params,
        notice: false,
        success: result => {
          this.treeTableDatalist = result.data;
          if (this.treeTableDatalist.length > 0) {
              this.rootTreeNode[0]['children'] = [];
              this.fillSelectTree(this.treeTableDatalist, this.rootTreeNode[0]['children']);
          }
        }
      });
    },
    fillSelectTree(listTree, selectTree) {
      for(let item of listTree){
          let node = {};
          node['title'] = item['resourceName'];
          node['value'] = item['id'];
          node['expand'] =  true;
          let children = item['children']
          if(children.length > 0){
            node['children'] = [];
            this.fillSelectTree(children, node['children'])
          }
          selectTree.push(node)
          
      }
    },
    editRecord(record) {
      this.titleName = "修改";
      this.$refs.resourceModel.resetFields();
      let newObj = {};
      for (let indx in this.resourceModel) {
        newObj[indx] = record[indx];
      }
      this.resourceModel = newObj;
      this.resourceModel.pid = newObj.pid;
      this.resourceModel.pname = newObj.pname;
      this.isDisplay = true;
    },
    deleteRecord(record) {
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
    addChildRecord(data) {
      this.handleReset();
      this.resourceModel.pid = data.id;
      this.resourceModel.pname = data.resourceName;
      this.isDisplay = true;
    },
    querySubmit() {
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
    cancelInput() {
      this.handleReset();
      this.isDisplay = false;
    },
    handleReset() {
      this.resourceModel.id = null;
      this.resourceModel.pid = null;
      this.resourceModel.pname = null;
      this.$refs.resourceModel.resetFields();
      let selectedNodes = this.$refs.higherUpsTree.getSelectedNodes();
      if (selectedNodes) {
        for (let node of selectedNodes) {
          node.selected = false;
        }
      }
    },
    reloadList() {
      this.searchItem.roleName = "";
      this.getList();
      this.isDisplay = false;
    },
    selectHigherUps(_nodes) {
      let node = _nodes[0];
      if (node) {
        this.resourceModel.pid = node.value;
        this.resourceModel.pname = node.title;
      }
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
   
</style>

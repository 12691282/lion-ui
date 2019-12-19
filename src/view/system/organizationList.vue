<template>
  <div>
    <Form :label-width="80" inline>
      <FormItem label="组织机构名字"  :label-width="110" >
        <Input
          v-model="orgName"
          maxlength="24"
           width="160px"
          placeholder="请输入组织机构名字..."
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
         <template slot-scope="{ data }" slot="action">
            <Button type="primary" size="small" v-if="data.state == 0" @click="addChildRecord(data)">增加子节点</Button>
            <Button type="primary" size="small" @click="editRecord(data)">修改</Button>
            <Button type="success" size="small"  v-if="data.state == 1" @click="changeState(data, 0)">启用</Button>
            <Button type="error" size="small"    v-if="data.state == 0" @click="changeState(data, 1)">停用</Button>
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
        <span>{{titleName}}</span>z
      </p>
      <Form
        ref="resourceModel"
        :model="orgModel"
        :label-width="80"
        :rules="resourceModelRules"
      >
        <FormItem label="上级资源">
          <Poptip placement="bottom-start">
            <Input v-model="orgModel.pname" style="width: 286px;" placeholder="选择上级资源" />
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

        <FormItem  label="组织机构名字" :label-width="110" prop="organizationName">
          <Input
            type="text"
            v-model="orgModel.organizationName"
            maxlength="24"
            show-word-limit
            placeholder="请输入组织机构名字"
          />
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input
            type="textarea"
            v-model="orgModel.description"
            :rows="2"
            maxlength="50"
            show-word-limit
            placeholder="请输入备注"
          />
        </FormItem>
        <FormItem label="状态" prop="state">
            <RadioGroup v-model="orgModel.state">
                <Radio label="0">启用</Radio>
                <Radio label="1">停用</Radio>
            </RadioGroup>
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
      rootTreeNode:[{'title':'组织机构菜单', 'value': null, 'expand':true, children:[]}],
      higherUpsList: [],
      isDisplay: false,
      titleName: "",
      orgName: "",
      orgModel: {
        id: "",
        pid: "",
        pname: "",
        organizationName: "",
        description:"",
        state: "0"
      },
      resourceModelRules: {
        roleName: [
          { required: true, message: "请输入组织机构名字.", trigger: "blur" }
        ]
      },
      columnsTitle: [
        {
          title: "组织机构名字",
          width: 80,
          key: "organizationName"
        },
      {
          title: "描述",
          key: "description"
        },
        {
          title: "状态",
          key: "stateName"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      treeTableDatalist: []
    };
  },
  methods: {
    querySubmit() {
      this.getList({"organizationName": this.orgName});
    },
    getList(_param) {
       let params = {}
       if(_param){
         params = _param
       } 

      this.$ajax.post({
        url: "/organization/getInfoPageList",
        params: params,
        notice: false,
        success: result => {
          this.treeTableDatalist = result.data;
          if (this.treeTableDatalist.length > 0) {
              this.rootTreeNode[0]['children'] = [];
              this.fillSelectTree(this.treeTableDatalist, this.rootTreeNode[0]['children']);
          }else{
            this.treeTableDatalist  = []
          }
        }
      });
    },
    fillSelectTree(listTree, selectTree) {
      for(let item of listTree){
          let node = {};
          node['title'] = item['organizationName'];
          node['value'] = item['id'];
          node['expand'] =  true;
          let children = item['children']
          if(children.length > 0){
            node['children'] = [];
            node['isLeaf'] = false
            this.fillSelectTree(children, node['children'])
          }else{
            node['isLeaf'] = true
          }
          selectTree.push(node)
          
      }
    },
    editRecord(record) {
      this.titleName = "修改";
      this.$refs.resourceModel.resetFields();
      let newObj = {};
      for (let indx in this.orgModel) {
        newObj[indx] = record[indx];
      }
      this.orgModel = newObj;
      this.orgModel.pid = newObj.pid;
      this.orgModel.pname = newObj.pname;
      this.isDisplay = true;
    },
    changeState(record, stateNo) {
      let contentStr = stateNo === 0 ? '<p>是否启用:' : '<p>是否停用:'
      contentStr += record.organizationName +' </p>'
      this.$Modal.confirm({
        title: "操作确认!",
        content: contentStr,
        onOk: () => {
          let params = {
            id: record.id,
            state:stateNo
          };
          this.$ajax.post({
            url: "/organization/saveOrUpdate",
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
      this.orgModel.pid = data.id;
      this.orgModel.pname = data.organizationName;
      this.isDisplay = true;
    },
    addNew() {
      this.titleName = "新增";
      this.handleReset();
      this.isDisplay = true;
    },
    submitData() {
      this.$refs.resourceModel.validate(valid => {
        if (valid) {
          let params = this.orgModel;
          this.$ajax.post({
            url: "/organization/saveOrUpdate",
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
      this.orgModel.id = null;
      this.orgModel.pid = null;
      this.orgModel.pname = null;
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
      console.log(_nodes)
      let node = _nodes[0];
      if (node) {
        this.orgModel.pid = node.value;
        this.orgModel.pname = node.title;
      }
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
</style>

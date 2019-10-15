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
      <FormItem style="margin-left: -50px;">
        <Button type="success" @click="addNew()">新增</Button>
      </FormItem>
    </Form>

    <Table border :columns="columnsTitle" :data="list">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="number">{{ index + 1}}</template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small"  @click="editRecord(index)">修改</Button>
        <Button type="warning" size="small" v-if="row.recordStatus == 0" @click="stopRecord(index)">停用</Button>
        <Button type="success" size="small" v-if="row.recordStatus == 1" @click="startRecord(index)">启用</Button>
        <Button type="error" size="small"  v-if="row.recordStatus == 1" @click="deleteRecord(index)" >删除</Button>
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
      <Form ref="accountModel" :model="accountModel" :label-width="80" :rules="accountModelRules">
        <FormItem label="名字" prop="name">
          <Input
            type="text"
            v-model="accountModel.name"
            maxlength="10"
            show-word-limit
            placeholder="请输入名字"
          />
        </FormItem>
        <FormItem label="账号名" prop="accountName">
          <Input
            type="text"
            v-model="accountModel.accountName"
            maxlength="18"
            show-word-limit
            placeholder="请输入账号名"
          />
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            type="password"
            v-model="accountModel.password"
            maxlength="24"
            password
            placeholder="请输入密码"
          />
        </FormItem>
        <FormItem label="确认密码" prop="confirmPassword">
          <Input
            type="password"
            v-model="accountModel.confirmPassword"
            maxlength="24"
            password
            placeholder="请输入确认密码"
          />
        </FormItem>
        <FormItem label="E-mail" prop="email">
          <Input
            type="text"
            v-model="accountModel.email"
            maxlength="30"
            show-word-limit
            placeholder="请输入e-mail"
          />
        </FormItem>
        <FormItem label="备注" prop="backup">
          <Input
            type="textarea"
            v-model="accountModel.backup"
            :rows="2"
            maxlength="50"
            show-word-limit
            placeholder="请输入备注"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="isDisplay = false">取消</Button>
        <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
        <Button type="primary" @click="submitData">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.accountModel.confirmPassword !== "") {
          // 对第二个密码框单独验证
          this.$refs.accountModel.validateField("confirmPassword");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.accountModel.password) {
        callback(new Error("两次输入密码不一直!"));
      } else {
        callback();
      }
    };
    return {
      isDisplay: false,
      titleName: "",
      accountModel: {
        id: "",
        name: "",
        accountName: "",
        password: "",
        confirmPassword: "",
        email: "",
        backup: ""
      },
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
      accountModelRules: {
        name: [{ required: true, message: "请输入姓名.", trigger: "blur" }],
        accountName: [
          { required: true, message: "请输入账号名.", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码长度最少6位",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          { required: true, validator: validatePassCheck, trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码长度最少6位",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入e-mail", trigger: "blur" },
          { type: "email", message: "email格式不正确", trigger: "blur" }
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
          title: "名字",
          width: 100,
          slot: "name"
        },
        {
          title: "账号名",
          key: "accountName"
        },
        {
          title: "email",
          key: "email"
        },
        {
          title: "状态",
          width: 70,
          key: "statusName"
        },
        {
          title: "备注",
          key: "backup"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      list: [],
      size: 5,
      total: 0,
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
      this.$refs.accountModel.resetFields();
      let newObj = {};
      for (let indx in rowRocord) {
        newObj[indx] = rowRocord[indx];
      }
      this.accountModel = newObj;
      this.isDisplay = true;
    },
    stopRecord(index) {
      let params = {
        id: this.list[index].id
      };
      this.$ajax.post({
        url: "/account/stopUseById",
        params: params,
        success: result => {
          this.reloadList();
        }
      });
    },
    startRecord(index) {
      let params = {
        id: this.list[index].id
      };
      this.$ajax.post({
        url: "/account/startUseById",
        params: params,
        success: result => {
          this.reloadList();
        }
      });
    },
    deleteRecord(index) {
      let record = this.list[index]
      this.$Modal.confirm({
          title: '删除确认!',
          content: '<p>是否删除 '+record.name+' 的账号</p>',
          onOk: () => {
              let params = {
                id: record.id
              };
              this.$ajax.post({
                  url: "/account/deleteRecordById",
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
      this.$refs.accountModel.validate(valid => {
        if (valid) {
          let params = this.accountModel;
          this.$ajax.post({
            url: "/account/saveOrUpdate",
            params: params,
            success: result => {
              this.reloadList();
            }
          });
        }
      });
    },
    handleReset(name) {
      this.$refs.accountModel.resetFields();
    },
    reloadList() {
      this.searchItem.name = "";
      this.searchItem.accountName = "";
      this.getList();
      this.isDisplay = false;
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

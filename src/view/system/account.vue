<template>
        <div>
                <Form :model="searchItem" :label-width="50" inline>
                        <FormItem label="名字">
                                <Input v-model="searchItem.name" placeholder="请输入名字..." style="width: auto" />
                        </FormItem>
                        <FormItem label="账号名">
                                <Input v-model="searchItem.accountName  " placeholder="请输入账号名..." style="width: auto" />
                        </FormItem>
                        <FormItem style="margin-left: -30px;">
                                <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
                        </FormItem>
                </Form>


                <Table style="margin-top: -10px" border :columns="columnsTitle" :data="list">
                        <template slot-scope="{ row }" slot="name">
                                <strong>{{ row.name }}</strong>
                        </template>

                        <template  slot-scope="{ row, index }" slot="number">
                                {{ index + 1}}
                        </template>

                        <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                                <Button type="error" size="small" @click="remove(index)">删除</Button>
                        </template>
                </Table>
                <Page style="margin-top: 10px"  :total="size" @on-change="changePageEvent" show-elevator show-total  />


        </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                searchItem:{
                    name:"",
                    accountName : ""
                },
                msg: "account  manager",
                columnsTitle: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        width: 90,
                        align: 'center',
                        slot: 'number'
                    },
                    {
                        title: '名字',
                        slot: 'name'
                    },
                    {
                        title: '账号名',
                        key: 'accountName'
                    },
                    {
                        title: '备注',
                        key: 'backup'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                list: [],
                size: 0
            }
        },
        methods:{
            getList() {
                this.$ajax.get({url:'/account/getInfo',
                    success:(result)=>{
                        let page =  result.data;
                        this.list = page.list
                        this.size = page.pageSize
                }})
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.list[index].name}<br>Age：${this.list[index].accountName}<br>Address：${this.list[index].backup}`
                })
            },
            remove (index) {
                this.list.splice(index, 1);
            },
            changePageEvent(currentIndex){
                console.log(currentIndex)
            }
        },
        components: {
        },
        mounted(){
            this.getList();
        }
    }
</script>

<style scoped>

</style>

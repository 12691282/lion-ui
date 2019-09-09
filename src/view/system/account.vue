<template>
        <Table border :columns="columnsTitle" :data="list">
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
</template>

<script>
    export default {
        name: "",
        data() {
            return {
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
                list: []
            }
        },
        methods:{
            getList() {
                this.$ajax.get({url:'/account/getInfo',
                    success:(result)=>{
                        this.list = result.data
                }})
            },
            show (index) {
                console.log(this.list[index])
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.list[index].name}<br>Age：${this.list[index].accountName}<br>Address：${this.list[index].backup}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        },
        components: {
            //someComponent
        },
        mounted(){
            this.getList();
        }
    }
</script>

<style scoped>

</style>

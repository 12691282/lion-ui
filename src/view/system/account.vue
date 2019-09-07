<template>
        <div style="height: 1000px;">{{msg}}</div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                msg: "account  manager"
            }
        },
        methods:{
            test() {
                this.$ajax.get({url:'/user/getInfo',
                    success:(data)=>{
                    console.log('account output')
                    console.log(data)

                }})
            }
        },
        components: {
            //someComponent
        },
        mounted(){

        }
    }
</script>

<style scoped>

</style>

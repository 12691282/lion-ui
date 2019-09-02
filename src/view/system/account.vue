<template>
        <div style="height: 1000px;">{{msg}}</div>
    <!--<someComponent></someComponent>-->
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
                        this.$Notice.success({
                            title: 'Notification title',
                            desc:  'Here is the notification description. Here is the notification description. '
                        });

                },
                    failure:()=>{
                        this.$Notice.open({
                            title: 'Notification title',
                            desc:  'Here is the notification description. Here is the notification description. '
                        });
                    }})
            }
        },
        components: {
            //someComponent
        },
        mounted(){
            this.test()
        }
    }
</script>

<style scoped>

</style>

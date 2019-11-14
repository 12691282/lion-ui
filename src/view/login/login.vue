<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎使用《lion管理系统》" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                    <p class="login-tip">版本1.0</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import LoginForm from './login-form';
    import Config from '@/config';

    export default {
        name: "",
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        methods:{
            handleSubmit({ userName, password }){

                let params = {
                    'accountName':userName,
                    'password':password
                }
                this.$ajax.post({
                    url: "/system/login",
                    params: params,
                    notice: false,
                    success: result => {
                          console.log(result)
                          this.$router.push({
                             name: Config.homeName
                          })
                    }
                });    


           
                // this.$router.push({
                //     name: Config.homeUrl
                // })
            }
        },
        components: {
            LoginForm
        }
    }
</script>

<style lang="less">
    @import './login.less';
</style>

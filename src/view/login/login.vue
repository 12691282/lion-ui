<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import LoginForm from './login-form';
    export default {
        name: "",
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        methods:{
            handleSubmit(){

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

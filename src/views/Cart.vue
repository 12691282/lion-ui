<template>
    <div>
        <br>
        这是{{$route.query.goodid}}号{{msg}}
        <br/>
        {{$route.params.cartId}}
        <button @click="goback">返回</button>
    </div>
</template>

<script>
    export default {
        name: "cart",
        data() {
            return {
                msg: "购物车"
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            }
        }

    }
</script>

<style scoped>

</style>

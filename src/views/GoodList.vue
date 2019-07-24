<template>
    <div>
        这是商品页面:
        <router-link to='/goods/title'>点击显示标题</router-link>
        <router-link to='/goods/image'>点击显示图片</router-link>
        <br/>
        <br/>
        <div>
            <router-view ></router-view>
        </div>
        <router-link v-bind:to="{name:'cart',params:{cartId:123}}">跳转到购物车页面</router-link>
        <button @click="jump">点击跳转</button>
    </div>
</template>

<script>
    export default {
        name: "GoodList",
        methods:{
            jump(){
                this.$router.push({path:'/cart?goodid=1'});
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>{{msg}}</div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                msg: "home 首页详情 "
            }
        },
        components: {
            //someComponent
        }
    }
</script>

<style scoped>

</style>

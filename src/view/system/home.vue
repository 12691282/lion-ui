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
                msg: "home page"
            }
        },
        components: {
            //someComponent
        }
    }
</script>

<style scoped>

</style>

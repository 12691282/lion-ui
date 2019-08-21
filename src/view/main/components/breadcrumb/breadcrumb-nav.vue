<template>
    <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem to="home-info">主页</BreadcrumbItem>
        <BreadcrumbItem v-for="(bread, breadIndex) in breadcrumbList" :key="breadIndex" >{{bread.name}}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "breadcrumb",
        props:{
            breadcrumbList:{
                type: Array,
                default () {
                    return []
                }
            }
        },
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        components: {
            //someComponent
        }
    }
</script>

<style scoped>

</style>

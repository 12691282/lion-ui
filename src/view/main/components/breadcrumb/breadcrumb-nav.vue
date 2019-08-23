<template>
    <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem to="homeInfo">{{homeName}}</BreadcrumbItem>
        <BreadcrumbItem v-for="(bread, breadIndex) in breadcrumbList" :key="breadIndex" >{{bread.name}}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
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
                homeName: "主页"
            }
        }
    }
</script>

<style scoped>

</style>

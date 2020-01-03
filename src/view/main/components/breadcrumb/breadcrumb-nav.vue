<template>
    <div style="display: inline-block;vertical-align: top;margin: 16px 0px;">
        <Breadcrumb >
            <BreadcrumbItem :to="homeUrl">{{homeName}}</BreadcrumbItem>
            <BreadcrumbItem v-for="(bread, breadIndex) in breadcrumbList" :key="breadIndex" >{{bread.name}}</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
  import Config from '@/config';

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
                homeUrl:Config.homeUrl,
                homeName: "首页"
            }
        } 
        
    }
</script>

<style scoped>

</style>

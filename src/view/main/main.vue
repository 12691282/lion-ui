<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" >
            <Menu ref="side_menu"  theme="dark" width="auto" @on-select="selectMenu">
                <template v-for="item in menuList">
                    <Submenu :name="`${item.menuId}+''`">
                        <template slot="title">
                            <Icon :type="item.icon" />{{item.menuName}}
                        </template>
                        <template v-if="item.children && item.children.length > 1">
                                <menu-item  v-for="(child,index) in item.children " :key="index"  :name="`${child.menuId}`">
                                    <Icon :type="child.icon"  />{{child.menuName}}
                                </menu-item>
                        </template>
                    </Submenu>
                </template>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                </Breadcrumb>
            </Header>
            <Content :style="{padding: '5px 0px 16px 20px'}">
                <Layout class="main-layout-con">
                    <div class="tag-nav-wrapper">
                    </div>
                    <Card>
                        <div style="height: 600px"><router-view /></div>
                    </Card>
                </Layout>
            </Content>
        </Layout>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

    export default {
        data () {
            return {
                menuList:  this.$store.getters.menuList
            }
        },
        computed :{

        },
        methods: {
            ...mapMutations([
                'testMethod'
            ]),
            selectMenu(name){
                this.$router.push({name:name})
            }

        },
        watch: {
            '$route'(newRoute) {
                console.log(newRoute);
                console.log('watch newRoute');
            }
        },
        mounted () {

        }
    }
</script>

<style scoped>
    .tag-nav-wrapper{
        padding: 0;
        height:40px;
        background:#F0F0F0;
    }
</style>

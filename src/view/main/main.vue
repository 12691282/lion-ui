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
            <Content class="main-content-con" >
                <Layout class="main-layout-con" >
                        <Tabs type="card" closable :value="currentTab"
                              :animated="false"
                              @on-tab-remove="handleTabRemove"
                              @on-click="onTagClick"  >
                            <tab-pane :label="tag.title"  :name="tag.name" :icon="tag.icon" v-for="(tag, tagIndex) in tagNavList" :key="tagIndex" >
                                <Card>
                                    <router-view />

                                    <!--<iframe frameborder="0" width="100%" :height="frameHeight" marginheight="0" scrolling="auto" marginwidth="0" :src="tag.url"></iframe>-->
                                    <!---->
                                </Card>
                            </tab-pane>
                        </Tabs>

                </Layout>
            </Content>
        </Layout>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
    import {initLocalStorage} from '@/store/util'
    export default {
        data () {
            return {
                menuList: this.$store.getters.menuList,
                currentTab : null
            }
        },
        computed :{
            tagNavList () {
               return this.$store.state.tagNavList
            }
        },
        methods: {
            ...mapMutations([
                'setTagNavList',
                'addTag'
            ]),
            selectMenu(name){
                this.$router.push({name:name})
            },
            handleTabRemove (name) {
                this['tab' + name] = false;
            },
            onTagClick(name){
                console.log(name)
                // this.$router.push({name:name})
            }

        },
        watch: {
            '$route'(newRoute) {
                const { name, path, params, meta } = newRoute
                console.log(newRoute)
                let info = {"name": name, 'url':path, 'title': meta.menuName , 'icon': meta.icon}
                this.addTag(info);
            }
        },
        mounted () {
            this.setTagNavList();
            const { name, path, query, meta } = this.$route
            this.addTag({"name": name, 'url':path, 'title': meta.menuName , 'icon': meta.icon});
        }
    }
</script>

<style scoped>
    .main-content-con{
            height: 100%;
            overflow: hidden;
    }
    .main-layout-con{
        padding: 10px 0px 16px 20px;
        height: 100%;
    }
    .content-wrapper{
        padding: 0px;
        height: 100%;
        overflow: auto;
    }
</style>

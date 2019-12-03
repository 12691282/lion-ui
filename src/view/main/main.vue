<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" >
            <div class="logo-wrapper">
                <img style="margin-left: 20px; margin-top: 10px;" :src="logoImg"/>
            </div>
            <Menu  theme="dark" width="auto" @on-select="selectMenu">
                <!-- <menu-item   name="home">
                    <Icon type="md-home" />首页
                </menu-item> -->
                <template v-for="item in menuList" >

                    <menu-item v-if="!item.children" :name="`${item.menuId}`"  :key="item.menuId">
                            <Icon :type="item.icon"  />{{item.menuName}}
                    </menu-item>
                    <Submenu v-else-if="item.children && item.children.length > 1" :name="`${item.menuId}+''`" :key="item.menuId">
                        <template slot="title">
                            <Icon :type="item.icon" />{{item.menuName}}
                        </template>
                        <template >
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
                <breadcrumb-nav :breadcrumb-list="breadcrumbList"></breadcrumb-nav>
            </Header>
            <div style="position: absolute;left: 1200px;top: 25px;">
                <font style="cursor: pointer;" @click="logoutAccount">登出</font>
            </div>
            <Content class="main-content-con" >
                <Layout class="main-layout-con" >
                        <Tabs type="card" closable :value="currentTab"
                              :animated="false"
                              @on-tab-remove="handleTabRemove"
                              @on-click="onTagClick"  >
                            <tab-pane :label="tag.title" :name="tag.name" 
                                    :icon="tag.icon" v-for="(tag, tagIndex) in tagNavList"
                                     :key="tagIndex" v-if="tag.isClose">
                            </tab-pane>
                        </Tabs>
                        <Card>
                            <router-view />
                        </Card>
                </Layout>
            </Content>
        </Layout>
    </div>
</template>

<script>

    import {mapMutations} from 'vuex'
    import {initLocalStorage} from '@/store/util'
    import BreadcrumbNav from '@/view/main/components/breadcrumb'
    import Config from '@/config';
    import LogoImg from '@/assets/images/logo.jpg'

    export default {
        components: {
            BreadcrumbNav
        },
        data () {
            return {
                currentTab : null,
                logoImg : LogoImg,
                homeName : Config.homeName,
                autoWidth: ""
            }
        },
        computed :{
            tagNavList : {
                get () {
                    return this.$store.getters.tagNavList
                },
                set (val) {
                    this.$store.commit('setTagNavList', {key:'tagsView',vulue})
                }
            },
            breadcrumbList() {
                return this.$store.getters.breadcrumbList
            },
            menuList (){
                return this.$store.getters.menuList
            }
        },
        methods: {
            selectMenu(name){
                this.$router.push({name})
            },
            getHomeInfo(){
                return {'name':this.homeName,'title': '首页' , 'icon':'md-home','isClose':true };
            },
            getNextRoute(name) {
                let openNavList  = this.tagNavList.filter(item => item.isClose === true)
                if(openNavList.length === 0){
                    //只剩首页的时候， 关闭时需要延迟新增一个首页的table
                    if(name === this.homeName){
                        let self = this
                        setTimeout(() =>{
                            self.checkNavList(self.homeName)
                        },100 );
                    }
                    return this.homeName
                }
                return openNavList[0].name
            },
            handleTabRemove (name) {
                this.tagNavList.forEach(item => {
                    if(item.name === name){
                        item.isClose = false
                        return false;
                    }
                })
                if(this.currentTab === name){
                    let reName = this.getNextRoute(name)
                    this.$router.push({'name':reName})
                }
            },
            onTagClick(name){
                this.$router.push({'name':name})
            },
            checkNavList(name){
                for(let nav of this.tagNavList){
                    if(name === nav.name){
                        nav.isClose = true
                        return  true;
                    }
                }
                return false;
            },
            logoutAccount(){
                this.$Modal.confirm({
                    title: '确认!',
                    content: '<p>退出登录？</p>',
                    onOk: () => {
                        this.$cookie.set('token', '')
                    },
                    cancelText: '取消'
                });
            }
        },
        watch: {
            '$route'(newRoute) {
                const { name, path, params, meta } = newRoute
                this.currentTab = name
                if(!this.checkNavList(name)){
                    let info = {"name": name, 'url':path, 'title': meta.menuName , 'icon': meta.icon,'isClose':true}
                    this.tagNavList.push(info)
                }
                this.$store.dispatch('setBreadCrumb', newRoute)
            }
        },
        mounted () {
            this.currentTab = Config.homeName
            if(this.tagNavList.length === 0){
                this.$router.push({'name':Config.homeName})
                //初始化时加入首页
                this.tagNavList.push(this.getHomeInfo())
            }
          

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

    .logo-wrapper{
        padding: 0;
        height:65px;
    }
</style>

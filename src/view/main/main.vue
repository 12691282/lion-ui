<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" >
            <div class="logo-wrapper">
                <img style="margin-left: 20px; margin-top: 10px;" :src="logoImg"/>
            </div>
            <Menu  theme="dark" width="auto" @on-select="selectMenu">
                <template v-for="item in menuList" >

                    <menu-item v-if="!item.children" :name="`${item.menuId}`"  :key="item.menuId">
                            <Icon :type="item.icon"  />{{item.menuName}}
                    </menu-item>
                    <Submenu v-else-if="item.children && item.children.length > 0" :name="`${item.menuId}+''`" :key="item.menuId">
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
                <header-bar :message-unread-count="unreadMsg"></header-bar>
            </Header>
            <Content class="main-content-con" >
                <Layout class="main-layout-con" >
                        <Tabs type="card" closable :value="currentTab"
                              :animated="false"
                              @on-tab-remove="handleTabRemove"
                              @on-click="onTagClick"  >
                             <template v-for="(tagItem, tagIndex) in tagNavList" >
                                   <tab-pane :label="tagItem.title" :name="tagItem.name" 
                                    :icon="tagItem.icon" 
                                     :key="tagIndex" v-if="tagItem.isClose">
                                    </tab-pane>
                              </template>
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
    import HeaderBar from './components/header-bar'
    import Config from '@/config';
    import LogoImg from '@/assets/images/logo.jpg'

    export default {
        components: {
            HeaderBar
        },
        data () {
            return {
                unreadMsg:0,
                currentTab : null,
                logoImg : LogoImg,
                homeName : Config.homeName,
                autoWidth: "",
                tagNavList:[]
            }
        },
        computed :{
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
            routerChange(newRoute){
                const { name, path, params, meta } = newRoute
                this.currentTab = name
                if(!this.checkNavList(name)){
                    let info = {"name": name, 'url':path, 'title': meta.menuName , 'icon': meta.icon,'isClose':true}
                    this.tagNavList.push(info)
                }
                this.$store.dispatch('setBreadCrumb', newRoute)
            }
        },
        watch: {
            '$route':'routerChange'
        },
        created () {
            console.log('created  init router')
            this.routerChange(this.$route);
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

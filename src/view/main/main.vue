<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" >
            <Menu ref="side_menu"  theme="dark" width="auto" @on-select="selectMenu">
                <template v-for="item in menuList">
                    <Submenu :name="item.menuId">
                        <template slot="title">
                            <Icon :type="item.icon" />{{item.menuName}}
                        </template>
                        <template v-if="item.children.length > 0">
                                <menu-item v-for="child in item.children" :name="`${child.pathName}`">
                                    <Icon :type="child.icon"  />{{child.menuName}}
                                </menu-item>
                        </template>
                    </Submenu>
                </template>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
             头部
            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">Content</div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>

    const mList = [
        {
            "menuId":1,
            "menuName":"系统管理",
            "icon": "ios-browsers-outline",
            "children":[
                {
                    "menuId":2,
                    "menuName":"账号管理",
                    "icon":"ios-build",
                    "pathName":"user-manager"
                },
                {
                    "menuId":3,
                    "menuName":"角色管理",
                    "icon":"ios-barcode",
                    "pathName":"role-manager"
                },
                {
                    "menuId":4,
                    "menuName":"资源管理",
                    "icon":"ios-barcode",
                    "pathName":"resource-manager"
                },
                {
                    "menuId":5,
                    "menuName":"权限管理",
                    "icon":"ios-barcode",
                    "pathName":"authority-manager"
                }
            ]
        },
        {
            "menuId":6,
            "menuName":"功能模块-1",
            "icon":"ios-barcode",
            "children":[
                {
                    "menuId":61,
                    "menuName":"功能模块-1-1",
                    "icon":"ios-barcode",
                    "pathName":"function-module-1-1"
                },
                {
                    "menuId":62,
                    "menuName":"功能模块-1-2",
                    "icon":"ios-barcode",
                    "pathName":"function-module-1-2"
                },
                {
                    "menuId":63,
                    "menuName":"功能模块-1-3",
                    "icon":"ios-barcode",
                    "pathName":"function-module-1-3"
                }
            ]
        },
        {
            "menuId":7,
            "menuName":"功能模块-2",
            "icon":"ios-barcode",
            "children":[
                {
                    "menuId":71,
                    "menuName":"功能模块-2-1",
                    "icon":"ios-barcode",
                    "pathName":"function-module-2-1"
                },
                {
                    "menuId":72,
                    "menuName":"功能模块-2-2",
                    "icon":"ios-barcode",
                    "pathName":"function-module-2-2"
                },
                {
                    "menuId":73,
                    "menuName":"功能模块-2-3",
                    "icon":"ios-barcode",
                    "pathName":"function-module-2-3"
                }
            ]
        }
    ]

    export default {
        data () {
            return {
                menuList:[]
            }
        },
        methods: {
            selectMenu(name){
                console.log(name);
            }
        },
         mounted () {
             this.menuList = mList;
         }
    }
</script>

<style scoped>

</style>

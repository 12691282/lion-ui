<template>
   <div class="header-bar">
      <breadcrumb-nav :breadcrumb-list="breadcrumbList"></breadcrumb-nav>
      <div class="custom-content-con">
          <div>
              <Dropdown style="" @on-click="dropdownSelect" >
                    <Badge style="cursor:pointer;" :dot="true">
                        <Avatar icon="ios-person" />
                    </Badge>
                    <Icon :size="18" type="md-arrow-dropdown"></Icon>
                    <DropdownMenu slot="list" >
                        <DropdownItem name="message">
                        消息中心<Badge style="margin-left: 10px" :count="1"></Badge>
                        </DropdownItem>
                        <DropdownItem name="changePwd">修改密码</DropdownItem>
                        <DropdownItem name="logout">退出登录</DropdownItem>
                    </DropdownMenu>
              </Dropdown>
          </div>
          <div style="cursor:pointer;margin-right: 10px;">
              <span>用户名:{{userName}}</span>
          </div>
      </div>
  </div>
</template>

<script>

import Config from '@/config';
import BreadcrumbNav from '@/view/main/components/breadcrumb'
import './header-bar.less'

export default {
  name: 'HeaderBar',
  components: {
      BreadcrumbNav
  },
  computed: {
       breadcrumbList() {
          return this.$store.getters.breadcrumbList
       },
        userName (){
            return this.$cookie.get('userName')
        }
  },
  methods: {
    dropdownSelect(_name){
        if(_name === 'message'){

        }else if(_name === 'logout'){
            this.logoutAccount()   
        }
     
    },
    logoutAccount(){
        this.$Modal.confirm({
            title: '确认!',
            content: '<p>退出登录？</p>',
            onOk: () => {
                    let params = {
                        token : this.$cookie.get('token')
                    } 
                    this.$ajax.post({
                    url: "/account/logout",
                    params: params,
                    notice: false,
                    success: result => {
                        this.$cookie.set('token', '')
                        this.$cookie.set('userName', '')
                        this.$store.dispatch('cleanDateCache')
                        this.$store.dispatch('setUserLoginState', false)
                        this.$router.push({
                            name: Config.loginUrl
                        })
                    }
                }); 
            },
            cancelText: '取消'
        });
    }
  }
}
</script>
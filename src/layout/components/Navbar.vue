<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span class="login-name">{{name}}</span>
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <a @click="dialogPasswdVisible = true">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </a>
            <a @click="dialogProfileVisible = true">
            <el-dropdown-item>
              个人设置
            </el-dropdown-item>
          </a>
       
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">安全退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogPasswdVisible" :modal-append-to-body="false">
  <el-form :model="userForm" :rules="rules" ref="userForm" label-width="80px">
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input type="password" v-model="userForm.confirmPassword" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogPasswdVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyPasswd">确 定</el-button>
  </div>
</el-dialog>

    <el-dialog title="个人设置" :visible.sync="dialogProfileVisible" :modal-append-to-body="false" @open="onOpen">
  <el-form :model="profileForm" :rules="profileRules" ref="profileForm" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input  v-model="profileForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input  v-model="profileForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogProfileVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyProfile">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

import { updateProfile } from '@/api/user'
import { getInfo } from '@/api/login'

export default {
  data(){
      /**
         * 校验密码和确认密码是否输入一致
         */
        var varlidatePass = (rule,value,callback) => {
            if(value && value!=this.userForm.password){
                callback(new Error("两次输入密码不一致"));
            }else{
                callback();
            }
        }

     return {
       dialogPasswdVisible: false,
       dialogProfileVisible: false,
       userForm:{
         password:'',
         confirmPassword:''
       },
       profileForm: {
         name:'',
         mobile:''
       },
       rules: {
            password: [
                {required: true, message: '密码不能为空'}
            ],
            confirmPassword: [
                {required: true, message: '确认密码不能为空'},
                {validator: varlidatePass, trigger:'blur'}
            ]   
        },
        profileRules: {
            name: [
                {required: true, message: '姓名不能为空'}
            ],
            mobile: [
                {required: true, message: '手机号不能为空'}
            ]   
        },
     }
  },
    
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'token'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('login/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    onOpen(){
       getInfo(this.token).then(response => {
         const { data } = response;
         this.profileForm = data;
       });
    },
    modifyPasswd(){
       this.$refs["userForm"].validate((valid) => {
        if(valid){
          updateProfile(this.userForm).then(response => {
            this.$message.success("密码修改成功!");
            this.dialogPasswdVisible = false;
          })
        }else{
          return false;
        }
      
      });
    },
    modifyProfile(){
      this.$refs["profileForm"].validate((valid) => {
        if(valid){
          updateProfile(this.profileForm).then(response => {
              this.$message.success("个人设置修改成功!");
              this.dialogProfileVisible = false;
            })
          }else{
          return false;
        }
      
      });
    }
  
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: fixed;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  width: calc(100% - 220px);
  z-index:999;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .login-name{
          display: block;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          font-weight: bold;
          color:#808080;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

import { mapGetters, mapState } from 'vuex';
<template>
  <div class="lock-container pull-height">
    <div class="lock-form animated bounceInDown">
      <div class="animated" :class="{'shake':passwdError, 'bounceOut':pass}">
        <h3 class="text-white">{{name}}</h3>
        <el-input v-model="passwd" placeholder="请输入解锁密码" type="password" 
          class="input-with-select animated" @keyup.enter.native="handleLogin">
          <el-button slot="append" @click="handleLogin" style="padding-right:36px;">
            <i class="international-icon el-icon-unlock"></i>
          </el-button> 
          <el-button slot="append" @click="handleLogout">
            <i class="international-icon el-icon-s-platform"></i>
          </el-button>  
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import store from '../../store'
export default {
  name: 'lock',
  data() {
    return {
      passwd:'',
      passwdError: false,
      pass: false
    }
  },
  computed: {
    ...mapState({
      name: state => state.user.name
    }),
    ...mapGetters(['tag', 'lockPasswd'])
  },
  methods: {
    handleLogin() {
      console.log(store.getters.lockPasswd)
      if(this.passwd !== this.lockPasswd) {
        this.passwd = '';
        this.$message({
          message: '解锁密码错误，请重新输入',
          type: 'error'
        });
        this.passwdError = true;
        setTimeout(() => {
          this.passwdError = false;
        },1000);
        return;
      }
      this.pass = true;
      setTimeout(()=> {
        this.$store.commit('CLEAR_LOCK');
        this.$router.go(-1);
      }, 1000);
    },
    async handleLogout(){
      await this.$confirm('是否退出系统', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
      this.$store.dispatch('LogOut');
    }
  }
}
</script>

<style lang="scss">
  .lock-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .lock-container::before {
    z-index: -999;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/lockLogin.jpg");
    background-size: cover;
  }

  .lock-form {
    width: 300px;
  }
</style>

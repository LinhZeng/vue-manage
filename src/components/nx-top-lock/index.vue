<template>
  <span>
    <el-tooltip effect="dark" content="锁屏" placement="bottom">
      <i class="icon-bofangqi-suoping el-icon-lock" @click="handleLock"></i>
    </el-tooltip>
    <el-dialog title="设置锁屏密码" :visible.sync="box" width="30%" append-to-body>
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="锁屏密码" prop="passwd" :rules="[{ required: true, message: '锁屏密码不能空'}]">
          <el-input v-model="form.passwd" placeholder="请输入锁屏密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSetLock">确定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { validatenull } from '@/utils/validate';
import { mapGetters } from 'vuex';
export default {
  name: 'nx-top-lock',
  data() {
    return {
      box: false,
      form: {
        passwd: ''
      }
    }
  },
  computed: {
    ...mapGetters(['lockPasswd'])
  },
  methods: {
    handleLock(){
      if(this.form.passwd)
        this.$refs['form'].resetFields();
      this.box = true;
    },
    handleSetLock() {
      this.$refs['form'].validate(valid => {
        if(valid) {
          this.$store.commit('SET_LOCK_PASSWD', this.form.passwd);
          this.$store.commit('SET_LOCK');
          setTimeout(() => {
            this.$router.push({path: '/lock'});
          }, 100)
        }
      });
    }
  }
}
</script>

<style>

</style>
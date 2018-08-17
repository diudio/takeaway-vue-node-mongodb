<template>
  <div id="regist">
    <div class="bg"></div>
    <div class="lgcon">
      <h3>用户注册</h3>
      <el-form label-width="0">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="tel" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="mail" placeholder="邮箱"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="regist">注册</el-button>
      <router-link to="sellerRegister">
        <el-button type="text">注册成为商户</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      tel: '',
      mail: ''
    }
  },
  methods: {
    regist() {

      if (this.username.length < 3) {
        this.$message.error('用户名不能为空或小于三个字符')
        return
      }
      if (this.username.length > 8) {
        this.$message.error('用户名不能大于八个字符')
        return
      }
      if (this.password.length < 6) {
        this.$message.error('密码不能为空或小于六个字符')
        return
      }
      if (this.password.length > 12) {
        this.$message.error('密码不能大于十二个字符')
        return
      }
      if (this.password != this.confirmPassword) {
        this.$message.error('密码不一致')
        return
      }
      if (!(/^1[0-9]{10}$/.test(this.tel))) {
        this.$message.error('电话号码格式错误')
        return
      }
      if(!(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/.test(this.mail))){
        this.$message.error('邮箱格式错误')
        return
      }  

      let _this = this;

      let userinfo = {
        username: this.username,
        password: this.password,
        tel: this.tel,
        mail: this.mail,
      }

      this.$http.get('/getUser/' + userinfo.username).then(
        res => {
          //检查
          console.log(res)
          if (res.body.username === userinfo.username) {
            _this.$message.error('该用户已存在')
            _this.username = ''
          } else {
            //注册
            _this.$http.post('/customerRegist', {
              userinfo: userinfo
            }).then(
              res => {
                _this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                setTimeout( () => {
                  _this.$router.push({path: '/login'})
                },1500)
              },
              err => console.log('注册失败', + err) 
            )
          }
        },
        err => console.log(err)
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    position: absolute;
    background-color: #44A2A9;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -99;
  }
  h3 {
    text-align: center;
    font-size: 22px;
  }

  .lgcon {
    width: 400px;
    margin: 10% auto 0;
    background-color: #fff;
    padding: 20px 30px 30px;
    box-shadow: 0 0 25px #cac6c6;
  }

  .el-button {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .el-button--text {
    text-align: left;
    font-size: 14px;
    margin-top: -8px;
  }
</style>

<template>
  <div id="login">
    <div class="bg"></div>
    <div class="lgcon">
      <h3>用户登录</h3>
      <el-form label-width="0">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="password" placeholder="密码"></el-input>
        </el-form-item>
        <!-- <router-link> -->
          <el-button type="primary" @click='login'>登录</el-button>
        <!-- </router-link> -->
        <div></div><!-- 添加空标签解决按钮上下错位问题 -->
        <router-link to="register">
          <el-button type="info">没有账号，去注册</el-button>
        </router-link>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        username: '',
        password: ''
    }
  },
  methods: {
    setCookie(obj,exdays) {
      let d = new Date()
      d.setTime(d.getTime() + (exdays*24*60*60*1000))
      let expires = "expires=" + d.toUTCString()
      let cookie = ''
      for(let key in obj) {
          cookie = cookie + key + "=" +  obj[key] + ";"
        }
      document.cookie = cookie + expires 
      console.log(cookie +expires)
    },
    login() {
      let _this = this;
      let userinfo = {
              username: this.username,
              password: this.password
            }

      //后台对用户类型进行分辨
      this.$http.get('/getUser/' + this.username).then(
        res => {
          if (_this.password !== res.body.password) {
            _this.$message.error('用户名或密码不正确')
          } else {
            let status = res.body.status
            let id = res.body._id
            let username = res.body.username
            _this.$http.post('/login', {
              userinfo: res.body
            }).then(
              res => {
                _this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                console.log(res.body)
                if (status === "0") {
                  let tel = res.body.userinfo.tel
                  this.setCookie({id},30)
                  this.setCookie({username},30)
                  this.setCookie({tel},30)
                  this.setCookie({status},30)
                  _this.$router.push({path: '/customer'})
                } 
                if (status === "1") {
                  let tel = res.body.userinfo.tel
                  this.setCookie({id, username, tel},30)
                  this.setCookie({username},30)
                  this.setCookie({tel},30)
                  this.setCookie({status},30)
                  _this.$router.push({path: '/seller'})
                }
                if (status === "2") {
                  this.setCookie({id, username},30)
                  this.setCookie({username},30)
                  this.setCookie({status},30)
                  _this.$router.push({path: '/admin'})
                }
              },
              err => console.log('登录失败' + err)
            )
          }
        },
        err => {
          _this.$message.error('该用户不存在')
            return
        }
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
  a {
    color: white;
  }
</style>

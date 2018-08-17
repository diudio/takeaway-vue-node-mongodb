<template>
	<div id="login">
    <div class="lgcon">
      <h3>商户注册</h3>
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
        <el-form-item >
          <el-select v-model="address" placeholder="请选择地址">
            <el-option
              v-for="item in addressOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" :autosize="{ minRows: 2}" v-model="addressinfo" placeholder="地址详细信息"></el-input>
        </el-form-item>
        <el-form-item >
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 2}"
					  placeholder="请添加描述信息"
					  v-model="description">
					</el-input>
        </el-form-item>
      </el-form>
      <!-- <div class="addImgBox">
      	<div class="addImg">
	      	<span>上传店铺照片</span>
	      </div>
	      <div class="addImg">
	      	<span>上传营业执照照片</span>
	      </div>
      </div> -->
      <el-upload
        class="upload-demo"
        ref="upload"
        :action= "action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="success">上传照片</el-button>
        <div slot="tip" class="el-upload__tip">请按顺序分别上传店铺logo,店铺照片,店铺营业执照照片</div>
      </el-upload>
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
      <el-button type="primary" @click="regist">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
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
      if (!(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/.test(this.mail))){
        this.$message.error('邮箱格式错误')
        return
      }  
      if (!this.address) {
        this.$message.error('地址不能为空')
        return 
      }
      // if (this.fileList.length != 3) {
      //   this.$message.error('请上传店铺照片')
      //   return 
      // }
      let _this = this;

      let userinfo = {
        username: this.username,
        password: this.password,
        tel: this.tel,
        mail: this.mail,
        address: this.address,
        addressinfo: this.addressinfo,
        description: this.description,
      }

      this.$http.get('/getUser/' + userinfo.username).then(
        res => {
          //检查
          if (res.body.username === userinfo.username) {
            _this.$message.error('该用户已存在')
            _this.username = ''
          } else {
            //注册
            _this.$http.post('/sellerRegist', {
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
            ).then( 
              //注册成功回调 ，准备上传图片
              res => {
                //获取刚刚注册的用户的id
                _this.$http.get('/getRegistingUser/' + userinfo.username).then(
                  res => {
                    _this.action += res.body._id
                    console.log(_this.action)
                    //数据绑定有延迟
                    setTimeout(function() {
                      console.log(_this.fileList)
                      _this.submitUpload()
                    }, 500)
                  },
                  err => console.log('注册失败', + err)
                )
              }, 
              err => {} 
            )
          }
        },
        err => console.log(err)
      )
    },

    
    submitUpload() {
        this.$refs.upload.submit();
        this.fileList = []
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  data () {
    return {
      fileList: [],
      username: '',
      password: '',
      confirmPassword: '',
      tel: '',
      mail: '',
      addressOptions: [
        {value: '老区', label: '老区'},
        {value: '新区', label: '新区'}
      ],
      address: '',
      addressinfo: '',
      description:'',
      action: "/imgUpload/sellerRejist/",
    }
  }
}
</script>

<style scoped> 
	#login {
    width: 100%;
    height: auto;
    overflow: hidden;
    background-color: #44A2A9;
  }
  h3 {
    text-align: center;
    font-size: 22px;
  }
  .lgcon {
    width: 400px;
    margin: 10% auto 6%;
    background-color: #fff;
    padding: 20px 30px 30px;
    box-shadow: 0 0 25px #cac6c6;
  }
  .addImgBox {
  	width: 100%;
  	height: 150px;
  	position: relative;
  }
	.addImg {
		width: 150px;
		height: 150px;
		border: 2px dashed #2c3e50;
		border-radius: 10px;
		position: absolute;
		left: 10px;
	}
	.addImg:last-child {
		left: 230px;
	}
	.addImg span {
		display: inline-block;
		width: 100%;
		height: 100px;
		line-height: 50px;
		margin-top: 25px;
		text-align: center;
		font-size: 28px;
	}
	.el-button {
    width: 100%;
    font-size: 16px;
    margin-top: 25px;
  }
  .el-button--text {
    text-align: left;
    font-size: 14px;
    margin-top: -8px;
  }
</style>
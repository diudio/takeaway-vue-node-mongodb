 <template>
 	<div class="seller-info">
		<el-form ref="form" :model="userinfo" label-width="80px">
		  <el-form-item label="店铺名称">
		    <el-input v-model="userinfo.userinfo.name"></el-input>
		  </el-form-item>
		  <el-form-item label="起送费">
		    <el-input v-model="userinfo.userinfo.mincost"></el-input>
		  </el-form-item>
		  <el-form-item label="配送费">
		  	<el-input v-model="userinfo.userinfo.conveyCost"></el-input>
		  </el-form-item>
		  <el-form-item label="配送时间(分钟)">
		  	<el-input v-model="userinfo.userinfo.time"></el-input>
		  </el-form-item>
		  <el-form-item label="食品分类">
	  		<el-button v-for="item in userinfo.foodsCategory" :key="item" round>{{item}}</el-button>
		  </el-form-item>
		  <el-form-item label="新增分类">
	  		<el-input v-model="newCategory" class="short"></el-input>
	  		<el-button type="primary" @click="addCategory" plain>新增</el-button>	
		  </el-form-item>
		  <el-form-item label="手机号码">
		    <el-input v-model="userinfo.userinfo.tel"></el-input>
		  </el-form-item>
		  <el-form-item label="邮箱">
		    <el-input v-model="userinfo.userinfo.mail"></el-input>
		  </el-form-item>
		  <el-form-item label="描述信息">
		    <el-input v-model="userinfo.userinfo.description"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">提交</el-button>
		  </el-form-item>
		</el-form>
 	</div>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {},
				newCategory: ''
			} 
		},
		mounted() {
			this.$http.get('/getSeller/' + this.getCookie('username')).then(
				res => {
					console.log(res.body)
					this.userinfo = res.body;
				},
				err => console.log('获取数据失败')
			)
		},
		methods: {
			getCookie(cname) {
				var name = cname + '=';
				var ca = document.cookie.split(';')
				for(let i=0; i<ca.length; i++) {
					var c = ca[i]
					while(c.charAt(0)=='') c=c.substring(1)
					if(c.indexOf(name)!=-1)
						return c.substring(name.length+1, c.length)
				}
				return ""
			},
			addCategory() {
				this.userinfo.foodsCategory.push(this.newCategory)
			},
			onSubmit() {
				this.$http.post('/sellerUpdate/' + 'seller1',{
					userinfo: this.userinfo
				}).then(
					res => {
						this.$message({
							message: '添加成功',
							type: 'success'
		            	})
						console.log(res.body)
					},
					err => console.log('修改失败')
				) 
			},
		},
	}
</script>

<style>
	.seller-info .short {
		width: 200px;
	}
</style>
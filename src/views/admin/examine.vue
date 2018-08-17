 <template>
	<div class="admin-examine">
		<div class="examine-regist" v-for="(item,index) in registList">
			<div>用户名: {{item.username}}</div>
			<div>手机号码: {{item.userinfo.tel}}</div>
			<div>电子邮箱: {{item.userinfo.mail}}</div>
			<div>地址: {{item.userinfo.address}}</div>
			<div>详细地址: {{item.userinfo.addressinfo}}</div>
			<div>描述信息: {{item.userinfo.description}}</div>
			
			<div class="logoBox">
				<!-- <img src="http://127.0.0.1:8081/statics/img/5ad303b4c303f06fd8073655.jpg" alt=""> -->
				<!-- <img :src="img" alt=""> -->
				<!-- <img src="src/assets/logo.png" alt=""> -->
				<img :src="img[index]" alt="">
			</div>
			<el-button type="success" @click="success(index)">通过</el-button>
			<el-button type="danger" @click="fail(index)">拒绝</el-button>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				registList: [], // _id
				img: [],
			} 
		},
		methods: {
			getData() {
				this.$http.get('/examineList').then(
					res => {
						this.registList = res.body
						console.log(this.registList)
						for(let i in this.registList) {
							let logo = this.registList[i].userinfo.logo
							this.img[i] = require('@/assets/' + logo)
						}
						console.log(this.img)
					},
					err => {
						console.log('获取数据失败')
					}
				)
			},
			success(i) {
				let userinfo = this.registList[i];
				let _this = this;
				this.$http.post('/sellerRejistSuccess/' + userinfo._id, {
					userinfo: userinfo
				}).then(
					res => {
						this.$router.push('/admin/examine')
						_this.$message({
			              message: '通过成功',
			              type: 'success'
			            })
					},
					err => {
						_this.$message({
			              message: '通过失败',
			              type: 'success'
			            })
					}
				)
			},
			fail(i) {
				let userinfo = this.registList[i];
				console.log(userinfo)
				let _this = this;
				this.$http.post('/sellerRejistFail/' + userinfo._id, {
					userinfo: userinfo
				}).then(
					res => {
						_this.getData;	//重新获取数据 刷新视图
						_this.$message({
			              message: '拒绝成功',
			              type: 'success'
			            })
					},
					err => {
						_this.$message({
		              message: '拒绝失败',
		              type: 'success'
		            })
					}
				)
			},
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style>
	.admin-examine {
		width: 1200px;
		min-height: 500px;
		margin: 10px auto 20px;
		overflow: hidden;
	}
	.admin-examine .examine-regist {
		width: 100%;
		height: 300px;
		background-color: white;
		margin-bottom: 10px;
		box-sizing: border-box;
		padding: 20px;
		position: relative;
	}
	.admin-examine .logoBox img{
		width: 260px;
		height: 260px;
		position: absolute;
		top: 20px;
		right: 20px;
	}
</style>
 <template>
	<div class="seller-foods">
		<div class="cover" v-show="showFlag || showFlag2"></div>
		<div class="updateFood-box" v-if="showFlag2">
			<div class="closeDialog" @click="showFlag2=false">×</div>
			<el-form label-width="40px">
				<el-form-item label="名字">
				    <el-input v-model="updatingFood.name"></el-input>
				</el-form-item>
				<el-form-item label="价格">
				    <el-input v-model="updatingFood.price"></el-input>
				</el-form-item>
				<el-form-item label="分类">
				    <el-select v-model="updatingFood.category" placeholder="请选择分类">
				        <el-option v-for="item in userinfo.foodsCategory" :key="item" :label="item" :value="item"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="描述">
				    <el-input type="textarea" v-model="updatingFood.discription"></el-input>
				</el-form-item>
				<el-button type="primary" @click="updateFood">提交</el-button>
			</el-form>
		</div>
		<div class="addFood-box" v-show="showFlag">
			<div class="closeDialog" @click="showFlag=false">×</div>
			<el-form label-width="40px">
				<el-form-item label="名字">
				    <el-input v-model="newFood.name"></el-input>
				</el-form-item>
				<el-form-item label="价格">
				    <el-input v-model="newFood.price"></el-input>
				</el-form-item>
				<el-form-item label="分类">
				    <el-select v-model="newFood.category" placeholder="请选择分类">
				        <el-option v-for="item in userinfo.foodsCategory" :key="item" :label="item" :value="item"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="描述">
				    <el-input type="textarea" v-model="newFood.discription"></el-input>
				</el-form-item>
			</el-form>
			<el-upload
		        class="upload-demo"
		        ref="upload"
		        :action= "action"
		        :on-preview="handlePreview"
    			:on-remove="handleRemove"
		        :file-list="fileList"
		        :auto-upload="false">
		        <el-button slot="trigger" size="small" type="success">上传照片</el-button>
		        <div slot="tip" class="el-upload__tip">请添加食品照片</div>
	        </el-upload>
		    <el-button type="primary" @click="addFood">提交</el-button>
		</div>

		<div class="addFoodBtn">
			<el-button type="primary" @click="showFlag=true">新增外卖</el-button>
		</div>
		
		<div class="seller-categoryBox" v-for="category in userinfo.foodsCategory">
			<div class="head">{{category}}</div>
			<hr class="hr" />
			<foodCard v-for="(food,index) in foodsList" v-if="food.category==category" :key="food.name" :food="food" :index="index" :user="user" @update="getUpdateFoodInfo" @delet="deleteFood"></foodCard>
		</div>
	</div>
</template>

<script>
	import foodCard from '@/components/foodCard.vue'
	export default {
		components: { foodCard },
		mounted() {
			console.log(this.getCookie('username'))
			console.log(this.getCookie('id'))
			this.$http.get('/getSeller/' + this.getCookie('username')).then(
				res => {
					console.log(res.body)
					this.userinfo = res.body;
					this.$http.get('/getFoodsList/' + this.getCookie('id')).then(
						res => {
							this.foodsList = res.body;
							console.log(this.foodsList)
						},
						err => console.log('获取食品数据失败')
					)
					
				},
				err => console.log('获取数据失败')
			)
		},
		methods: {
			getCookie(cname) {
				var name = (cname + '=').trim()
				var ca = document.cookie.split(';')
				var str = ""
				for(let i=0; i<ca.length; i++) {
					var c = ca[i]
					while(c.charAt(0)=='') c=c.substring(1)
					// if(c.indexOf(name)!=-1)
					// 	return c.substring(name.length, c.length)

					if(c.indexOf(name)!=-1) {
						str = c.substring(name.length, c.length)
						break;
					}
				}
				if(str && str[0]=='=')
					return str.substring(1,str.length)
				return str
			},
			getUpdateFoodInfo(index) {
				this.updatingFood = this.foodsList[index]
				console.log(this.updatingFood )
				this.showFlag2 = true
			},
			deleteFood(index) {
				this.deleteFoodId = this.foodsList[index]._id
				console.log(this.foodsList[index])
				this.$http.post('/deleteFood/' + this.deleteFoodId).then(
					res => {
						this.$message({
							message: '删除成功',
							type: 'success'
		            	})
		            	this.foodsList.splice(index, 1)
					},
					err => console.log('删除食品失败') 
				)
			},
			updateFood() {
				this.$http.post('/updateFood', {
						food: this.updatingFood
					}).then(
					res => {
						this.$message({
							message: '修改成功',
							type: 'success'
		            	})
		            	this.showFlag2 = false
					},
					err => console.log('修改食品信息失败') 
				)
			},
			addFood() {
				// console.log(this.newFood)
				let _this = this
				this.showFlag = false
				this.$http.post('/addFood/' + this.userinfo['_id'], {
					food: this.newFood
				}).then(
					res => {
						this.$message({
							message: '添加成功',
							type: 'success'
		            	})
						
					},
					err => console.log('添加食品失败')
				).then(
					res => {
						_this.$http.get('/getFood/' + _this.newFood.name).then(
			                res => {
			                    let id = res.body._id
			                    _this.action += id
			                    console.log(_this.action)
			                    //数据绑定有延迟
			                    setTimeout(function() {
			                    	console.log(_this.fileList)
			                    	_this.submitUpload()
			                    }, 500)
			                    setTimeout(function() {
			                    	_this.newFood = {
										name: '',
										price: '',
										discription: '',
										photo: '',
										category: '',
									}
			                    }, 1000)
			                },
			                err => console.log('注册失败', + err)
			            )
					},
					err => {}
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
		data() {
			return {
				userinfo: {},
				foodsList: [],
				fileList: [],	//上传的图片
				updatingFood: {}, //正在修改的食品信息
				deleteFoodId: '',
				action: "/imgUpload/sellerRejist/",
				showFlag: false,
				showFlag2: false,
				user: 2,
				newFood: {
					name: '',
					price: '',
					discription: '',
					photo: '',
					category: '',
				},
			} 
		}
	}
</script>

<style>
	.seller-foods {
		width: 1200px;
		margin: auto;
		position: relative;
		min-height: 500px;
		overflow: hidden;
	}
	.seller-foods .addFoodBtn {
		margin: 10px 0 -10px 0;
	}
	.seller-foods .seller-categoryBox {
		width: 825px;
		float: left;
		background-color: #fff;
		margin-top: 20px;
	}
	.seller-foods .seller-categoryBox .head {
		height: 60px;
		line-height: 60px;
		padding-left: 20px;
	}
	.seller-foods .addFood-box {
		width: 500px;
		height: 400px;
		background-color: white;
		z-index: 100;
		position: absolute;
		margin: 50px 0 0 350px;
		padding: 30px;
		box-sizing: border-box;
	}
	.seller-foods .cover {
		background-color: rgb(200,200,200);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		opacity: .2;
	}
	.seller-foods .closeDialog {
		width: 25px;
		height: 25px;
		line-height: 25px;
		font-size: 25px;
		text-align: center;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
	.seller-foods .updateFood-box {
		width: 500px;
		height: 400px;
		background-color: white;
		z-index: 101;
		position: absolute;
		margin: 50px 0 0 350px;
		padding: 30px;
		box-sizing: border-box;
	}
	.addFood-box .closeDialog {
		width: 25px;
		height: 25px;
		line-height: 25px;
		font-size: 25px;
		text-align: center;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
	.updateFood-box .closeDialog {
		width: 25px;
		height: 25px;
		line-height: 25px;
		font-size: 25px;
		text-align: center;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
</style>
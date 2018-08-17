<template>
	<div class="customer-foods">
		<div class="customer-categoryBox" v-for="category in categoryList">
			<div class="head">{{category}}</div>
			<hr class="hr" />
			<foodCard v-for="(food, index) in foods" v-if="food.category == category" v-on:changeCounter="changeCounter" :key="food.name" :index="index" :food="food" :value="countList[index]" :user="user">
			</foodCard>
		</div>

		<div class="cartBox">
			<div class="list">
				<cartOfOne v-for="(food,index) in foods" v-on:changeCounter="changeCounter" :key="food.name" :food="food"  :index="index" :value="countList[index]" :test="test">
				</cartOfOne>
			</div>
			<div class="bottom">
				<div class="price-box">
					<span class="price">￥{{total}}</span>
					<span class="conveyCost" v-show="total!==0">(配送费￥{{conveyCost}})</span>
				</div>
				<div class="greySubmit" v-show="total<mincost">立即下单</div>
				<div class="submit" v-show="total>=mincost" @click="postOrder">立即下单</div>
			</div>
		</div>

	</div>
</template>

<script>
	import foodCard from '@/components/foodCard.vue'
	import cartOfOne from '@/components/Components/cartOfOne.vue'
	export default {
		components: { foodCard, cartOfOne },
		data() {
			return {
				userInfo: '',
				user: 1,
				foods: [],
				categoryList: [], 
				countList: [],  //记录下单食品数量
				test: 0, //不知道为什么要绑定一个test  不然countList[index]不生效
				shopLogo: '',
				mincost: 0,
				conveyCost: 0
			}
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
			changeCounter(count, index) {
				if (this.countList[index] != count)
					this.$set(this.countList, index, count) //直接用array[index]=value方法的话 computed监听不到
				this.test += 1
			},
			postOrder() {
				let evalute = [], foodsList=[], countList=[],priceList=[],nameList=[], obj
				for(let i=0; i<this.countList.length; i++) {
					if (this.countList[i] != 0) {
						obj = {
							food_id: this.foods[i]._id,
							count: this.countList[i],
							price: this.foods[i].price,
							name: this.foods[i].name,
						}
						foodsList.push(this.foods[i]._id)
						countList.push(this.countList[i])
						priceList.push(this.foods[i].price)
						nameList.push(this.foods[i].name)
						evalute.push(obj)
					}
				}
				let order = {
					customer_id: this.getCookie('id'),
					customername: this.getCookie('username'),
					customerTel: this.getCookie('tel'),
					seller_id: this.$route.params.id,
					shopLogo: this.shopLogo,
					total: this.total,
					conveyCost: this.conveyCost,
					// evalute: evalute,
					foodsList,
					countList,
					priceList,
					nameList,
					// postOrderTime: date1.toLocaleString(),   这样写到后台报错
					postOrderTime: Date.now(),
					sellerGetOrderTime: '',
					customerGetFoodTime: '',
					conveyTime: 0,
				}
				console.log('orderinfo', order)
				this.$http.post('/createOrder',{
					order: order
				}).then(
					res => {
						this.$message({
							message: '提交订单成功',
							type: 'success'
		            	})
					},
					err => console.log('提交订单失败') 
				)
			}
		},
		computed: {
			total() {
				let sum = 0
				this.countList.forEach( (count,index) => {
					sum += count*this.foods[index].price
				})
				if(sum!==0) sum += this.conveyCost
				return sum
			}
		},
		mounted() {
			this.$http.get('/getUser1Info/' + this.$route.params.id).then(
				res => {
					this.shopLogo = res.body.userinfo.logo
					this.mincost = res.body.userinfo.mincost
					this.conveyCost = res.body.userinfo.conveyCost
				},
				err => console.log('获取商户信息失败')
			)
			this.$http.get('/getFoodsList/' + this.$route.params.id).then(
				res => {
					console.log(res.body)
					this.foods = res.body
					let json = {}
					//数组去重
					for(let i=0; i<this.foods.length; i++){
						if (!json[this.foods[i].category]) {
							this.categoryList.push(this.foods[i].category)
							json[this.foods[i].category] = 1;
						}
						this.countList[i] = 0
					}
					console.log(this.categoryList)
				},
				err => console.log('获取食品数据失败')
			)
			console.log(this.$route.params.id)
		},
	}
</script>

<style>
	.customer-foods {
		width: 1200px;
		margin: auto;
		position: relative;
		min-height: 500px;
		overflow: hidden;
	}
	.customer-foods .customer-categoryBox {
		width: 825px;
		float: left;
		background-color: #fff;
		margin-top: 20px;
	}
	.customer-foods .customer-categoryBox .head {
		height: 60px;
		line-height: 60px;
		padding-left: 20px;
	}
	.customer-foods .cartBox {
		position: fixed;
		bottom: 0;
		left: 50%;
		margin-left: 280px;
		background-color: #fff;
		width: 380px;
		z-index: 100;
	}
	.customer-foods .cartBox .bottom {
		height: 60px;
		line-height: 60px;
		overflow: hidden;
		text-align: center;
	}
	.customer-foods .cartBox .price-box {
		float: left;
		width: 240px;
		font-size: 24px;
		background-color: #dcdfe6;
	}
	.customer-foods .price-box .conveyCost {
		font-size: 14px;
	}
	.customer-foods .cartBox .submit {
		width: 140px;
		float: right;
		background-color: #109eff;
	}
	.customer-foods .cartBox .greySubmit {
		width: 140px;
		float: right;
		background-color: #909399;
	}
</style>
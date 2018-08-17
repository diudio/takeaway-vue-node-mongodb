<template>
	<div class="customer-order">
		<el-row class="customer-order-th" :gutter="20">
			<el-col :span="4">店铺logo</el-col>
			<el-col :span="3">店铺名字</el-col>
			<el-col :span="6">下单时间</el-col>
			<el-col :span="5">订单号</el-col>
			<el-col :span="3">商家电话</el-col>
			<el-col :span="3">支付金额</el-col>
		</el-row>
		<order v-for="order in orderList" :key="order.name" :order="order"></order>
	</div>
</template>

<script>
	import order from "@/components/Components/orderListOfOne.vue"
	export default {
		components: { order },
		mounted() {
			console.log(this.getCookie('username'))
			console.log(this.getCookie('id'))
			this.$http.get('/getCustomerOrderList/' + this.getCookie('id')).then(
				res => {
					console.log(res.body)
					console.log('获取订单列表成功')
					this.orderList = res.body
				},
				err => console.log(err)
			)
		},
		methods: {
			getCookie(cname) {
				var name = (cname + '=').trim();
				var ca = document.cookie.split(';')
				let str
				for(let i=0; i<ca.length; i++) {
					var c = ca[i]
					while(c.charAt(0)=='') c=c.substring(1)
					if(c.indexOf(name)!=-1)
						str = c.substring(name.length, c.length)
				}
				if(str[0]=='=')
						str = str.substring(1,str.length)
					return str
			},
		},
		data() {
			return {
				orderList: [],//sellername, shopLogo, time.postOrderTime ,sellerTel, total
			} 
		}
	}
</script>

<style>
	.customer-order .customer-order-th {
		height: 100px;
		line-height: 100px;
		border-bottom: 2px solid rgb(247,245,243);
		padding: 0 20px 0 20px;
	}
</style>
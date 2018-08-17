 <template>
 	<div class="seller-order">
 		<el-row class="seller-order-th" :gutter="24">
			<el-col :span="6">时间</el-col>
			<el-col :span="5">订单号</el-col>
			<el-col :span="4">配送地址</el-col>
			<el-col :span="3">顾客名字</el-col>
			<el-col :span="3">电话</el-col>
			<el-col :span="3">总消费</el-col>
		</el-row>
		<order v-for="order in orderList" :key="order.name" :order="order"></order>
 	</div>
</template>

<script>
	import order from "@/components/Components/orderListOfOne2.vue"
	export default {
		components: { order },
		mounted() {
			this.$http.get('/getSellerOrderList/' + this.getCookie('id')).then(
				res => {
					console.log('获取订单列表成功')
					this.orderList = res.body
					this.orderList.splice(0,0)
					console.log(this.orderList)
					console.log(this.getCookie('id'))
				},
				err => console.log(err)
			)
		},
		methods: {
			getCookie(cname) {
				var name = cname + '=';
				var ca = document.cookie.split(';')
				for(let i=0; i<ca.length; i++) {
					var c = ca[i]
					let str
					while(c.charAt(0)=='') c=c.substring(1)
					if(c.indexOf(name)!=-1)
						str = c.substring(name.length, c.length)
					if(str[0]=='=')
						str = str.substring(1,str.length-1)
					return str
				}
				return ""
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
	.seller-order .seller-order-th {
		height: 100px;
		line-height: 100px;
		border-bottom: 2px solid rgb(247,245,243);
		padding: 0 20px 0 20px;
	}
</style>
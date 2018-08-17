 <template>
 	<div class="seller-myOrders">
 		<nav class="seller-myOrders-leftNav">
			<el-menu default-active="1" class="el-menu-vertical-demo">
				<el-menu-item index="1" @click="gotoOrdered">
					<span slot="title">历史订单</span>
				</el-menu-item>
				<el-menu-item index="2" @click="gotoOrdering">
					<span slot="title">未完成订单</span>
				</el-menu-item>
				<el-menu-item index="3" @click="gotoInfo">
					<span slot="title">信息完善</span>
				</el-menu-item> 
			</el-menu>
		</nav>
		<div class="seller-myOrders-main">
			<router-view />
		</div>
 	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			} 
		},
		methods: {
			gotoOrdered() {
				this.$router.push('/seller/myOrders/orders')
			},
			gotoOrdering() {
				this.$router.push('/seller/myOrders/ordering')
			},
			gotoInfo() {
				this.$router.push('/seller/myOrders/info')
			},
		}
	}
</script>

<style>
	.seller-myOrders {
		width: 1200px;
		min-height: 500px;
		margin: 10px auto 20px;
		overflow: hidden;
	}
	.seller-myOrders-leftNav {
		background-color: #fff;
		width: 210px;
		text-align: center;
		float: left;
	}
	.seller-myOrders .seller-myOrders-main {
		background-color: #fff;
		width: 970px;
		min-height: 500px;
		overflow: hidden;
		float: right;
	}
</style>
 <template>
 	<div class="customer-myOrders">
 		<nav class="customer-myOrders-leftNav">
 			<el-menu default-active="1" class="el-menu-vertical-demo">
				<el-menu-item index="1">
					<span slot="title">历史订单</span>
				</el-menu-item>
				<el-menu-item index="2">
					<span slot="title">未完成订单
					</span>
				</el-menu-item>
				<el-menu-item index="3">
					<span slot="title">敬请期待</span>
				</el-menu-item> 
			</el-menu>
		</nav>
		<div class="customer-myOrders-main">
			<router-view/>
		</div>
 	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			} 
		},
	}
</script>

<style>
	.customer-myOrders {
		width: 1200px;
		min-height: 500px;
		margin: 10px auto 20px;
		overflow: hidden;
	}
	.customer-myOrders-leftNav {
		background-color: #fff;
		width: 210px;
		text-align: center;
		float: left;
	}
	.customer-myOrders-main {
		background-color: #fff;
		width: 970px;
		min-height: 500px;
		overflow: hidden;
		float: right;
	}
</style>
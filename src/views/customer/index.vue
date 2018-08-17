 <template>
	<div class="customer-page">
		<my-header :path1="path1" :path2="path2" :text1="text1" :text2="text2"></my-header>
		<div class="customer-container">
			<router-view/>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import myHeader from '@/components/my-header.vue'
	import myFooter from '@/components/my-footer.vue'
	export default {
		components: { myHeader, myFooter },
		data() {
			return {
				path1: '/customer/shops',
				path2: '/customer/myOrders',
				text1: '首页',
				text2: '我的订单'
			} 
		}
	}
</script>

<style>
	
</style>
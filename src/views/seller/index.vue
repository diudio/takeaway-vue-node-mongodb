 <template>
	<div class="seller-page">
		<my-header :path1="path1" :path2="path2" :text1="text1" :text2="text2"></my-header>
		<div class="seller-container">
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
				path1: '/seller/foods',
				path2: '/seller/myOrders',
				text1: '首页',
				text2: '我的信息'
			} 
		}
	}
</script>

<style>
	
</style>
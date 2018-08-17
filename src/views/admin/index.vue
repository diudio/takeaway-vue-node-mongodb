 <template>
	<div class="admin-page">
		<my-header :path1="path1" :path2="path2" :text1="text1" :text2="text2"></my-header>
		<div class="admin-container">
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
				//管理商家、审核注册
				path1: '/admin/admin',
				path2: '/admin/examine',
				text1: '管理商家',
				text2: '审核注册',
			} 
		}
	}
</script>

<style>
	
</style>
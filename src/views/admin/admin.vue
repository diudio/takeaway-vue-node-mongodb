 <template>
	<div class="admin-shops">
		<div class="nav">
			<div class="label">商家分类</div>
			<ul class="grey">
				<li>全部</li>
				<li>新区</li>
				<li>老区</li>
			</ul>
		</div>
		<div class="shopsBox">
			<shopCard  v-for="(shop,index) in shops"  :key="shop.userinfo.name" :shop="shop.userinfo"></shopCard>
		</div>
	</div>
</template>

<script>
	import shopCard from '@/components/shopCard.vue'
	export default {
		components: { shopCard },
		methods: {
			
		},
		mounted() {
			this.$http.get('/getShops').then(
				res => {
					this.shops = res.body
					this.filterShops = res.body
					console.log(this.shops)
					for(let i=0; i<this.shops.length; i++) {
						this.paths[i] = "/customer/foods/" + this.shops[i]._id
					}
					this.filterPath = this.paths
					console.log(this.paths)
				},
				err => console.log('获取店铺信息失败')
			)
		},
		data() {
			return {
				shops: [],	
				filterShops: [],
				paths: [],
				filterPath: [],
			} 
		}
	}
</script>

<style>
	.admin-shops {
		width: 1200px;
		margin: auto;
	}
	.admin-shops .nav {
		background-color: #fff;
		height: 100px;
		line-height: 100px;
		margin-top: 10px;
		overflow: hidden;
	}
	.admin-shops .nav .label {
		width: 100px;
		text-align: center;
		float: left;
	}
	.admin-shops .nav ul{
		float: left;
	}
	.admin-shops .nav ul li{
		float: left;
		margin: 0 10px;
	}
	.admin-shops .shopsBox {
		min-height: 500px;
		overflow: hidden;
		background-color: #fff;
		margin: 10px 0 20px 0;
		/*padding: 0 30px;
		box-sizing: border-box;*/
	}
</style>
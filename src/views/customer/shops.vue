 <template>
	<div class="customer-shops">
		<div class="nav">
			<div class="label">商家分类</div>
			<ul class="grey">
				<li @click="filterAll">全部</li>
				<li @click="filterNew">新区</li>
				<li @click="filterOld">老区</li>
			</ul>
		</div>
		<div class="shopsBox">
			<router-link v-for="(shop,index) in shops" :key="shop.userinfo.name" :to="shops[index].path">
				<shopCard :shop="shop.userinfo"></shopCard>
			</router-link>
		</div>
	</div>
</template>

<script>
	import shopCard from '@/components/shopCard.vue'
	export default {
		components: { shopCard },
		mounted() {
			this.$http.get('/getShops').then(
				res => {
					this.allShops = res.body
					let path
					for(let i=0; i<this.allShops.length; i++) {
						path = "/customer/foods/" + this.allShops[i]._id
						this.allShops[i].path = path
					}
					this.newShops = this.allShops.filter(shop => shop.userinfo.address=="新区")
					this.oldShops = this.allShops.filter(shop => shop.userinfo.address=="老区")
					this.shops = this.allShops
					console.log(this.shops)
				},
				err => console.log('获取店铺信息失败')
			)
			
		},
		methods: {
			filterAll() {
				this.shops = []
				Array.prototype.push.apply(this.shops, this.allShops)
			},
			filterNew() {
				this.shops = []
				Array.prototype.push.apply(this.shops, this.newShops)
			},
			filterOld() {
				this.shops = []
				Array.prototype.push.apply(this.shops, this.oldShops)
			}
		},
		data() {
			return {
				shops: [],
				allShops: [],
				newShops: [],
				oldShops: [],
				paths: [],
				filterPath: [],
			} 
		}
	}
</script>

<style>
	.customer-shops {
		width: 1200px;
		margin: auto;
	}
	.customer-shops .nav {
		background-color: #fff;
		height: 100px;
		line-height: 100px;
		margin-top: 10px;
		overflow: hidden;
	}
	.customer-shops .nav .label {
		width: 100px;
		text-align: center;
		float: left;
	}
	.customer-shops .nav ul{
		float: left;
	}
	.customer-shops .nav ul li{
		float: left;
		margin: 0 10px;
	}
	.customer-shops .shopsBox {
		min-height: 500px;
		overflow: hidden;
		background-color: #fff;
		margin: 10px 0 20px 0;
		/*padding: 0 30px;
		box-sizing: border-box;*/
	}
	.customer-shops .grey li {
		cursor: pointer;
	}
</style>
 <template>
	<el-card class="shopCard">
		<div class="logoBox">
			<img :src="img" alt="">
		</div>
		<div class="row1">{{shop.name}}</div>
		<div class="row2 grey font14">
			<el-rate v-model="shop.score" disabled show-score text-color="#ff9900" score-template="{value}">
			</el-rate>
		</div>
		<div class="row3 grey font14">
			<span class="minCost">起送:￥{{shop.mincost}}</span>
			<span class="cost">配送费:￥{{shop.conveyCost}}</span>
			<span class="time">{{shop.time}}分钟</span>
		</div>
	</el-card>
</template>

<script>
	export default {
		props: [ 'shop' ],
		data() {
			return {
				img: ''
			} 
		},
		mounted() {
			let logo = this.shop.logo
			this.img = require('@/assets/' + logo)
		}
	}
</script>

<style>
	.shopCard {
		width: 268px;
		margin: 20px 16px;
		box-sizing: border-box;
		border: 0;
		background-color: #fff;
		float: left;
	}
	.shopCard .logoBox img{
		width: 228px;
	}
	.shopCard .row1, .shopCard .row2, .shopCard .row3 {
		height: 30px;
		line-height: 30px;
		overflow: hidden;
	}
	.shopCard .row2 {
		display: table-cell;
		vertical-align: middle;
	}
	.shopCard .row3 .cost {
		margin-left: 15px;
	}
	.shopCard .row3 .time {
		float: right;
	}
</style>
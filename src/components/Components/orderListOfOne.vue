 <template>
 	<div>
 		<el-row class="com-order" :gutter="20">
			<el-col :span="4" class="com-order-logo">
				<img :src="img" alt="">
			</el-col>	
			<el-col :span="3" class="com-order-name bold">{{order.shopName}}</el-col>
			<el-col :span="6" class="com-order-time">{{order.time.postOrderTime}}</el-col>
			<el-col :span="5" class="com-order-id">{{order._id}}</el-col>
			<el-col :span="3" class="com-order-tel">{{order.sellerTel}}</el-col>	
			<el-col :span="3" class="com-order-total bold">
				￥{{order.total}}
				<i class="el-icon-arrow-down order2DownIcon" v-if="show" @click="show=!show"></i>
				<i class="el-icon-arrow-up order2UpIcon" v-if="!show" @click="show=!show"></i>
			</el-col>	
	 	</el-row>
	 	<el-row class="com-order1-detail" v-for="(name,i) in order.nameList" :key="name" :gutter="24" v-if="show">
				<el-col :span="5">{{name}}</el-col>
				<el-col :span="5">￥{{order.priceList[i]}}</el-col>
				<el-col :span="5">x{{order.countList[i]}}</el-col>
			</el-row>
			<el-row class="com-order1-convey" :gutter="24" v-if="show">
				<el-col :span="5">配送费</el-col>
				<el-col :span="5">￥{{order.conveyCost}}</el-col>
		</el-row>
 	</div>
</template>

<script>
	export default {
		props: [ 'order' ],
		data() {
			return {
				img: '',
				show: false
			} 
		},
		mounted () {
			let logo = this.order.shopLogo
			this.img = require('@/assets/' + logo)
		},
	}
</script>

<style>
	.com-order {
		height: 150px;
		padding: 15px;
		box-sizing: border-box;
		border-bottom: 1px solid rgb(247,245,243);
	}
	.com-order-logo img {
		width: 100%;
	}
	.com-order > div {
		height: 110px;
		line-height: 110px;
	}
	.com-order .order2DownIcon {
		margin-left: 10px
	}
	.com-order .order2UpIcon {
		margin-left: 10px
	}
	.com-order1-detail, .com-order1-convey {
		padding: 15px;
		height: auto;
		overflow: hidden;
	}
	.com-order1-detail>div, .com-order1-convey>div {
		height: 50px;
		line-height: 50px;
	}
</style>
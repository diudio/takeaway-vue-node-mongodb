 <template>
 	<div>
 		<el-row class="com-order2" :gutter="24">
			<el-col :span="6" >{{order.time.postOrderTime}}</el-col>
			<el-col :span="5" >{{order._id}}</el-col>
			<el-col :span="4" ></el-col>
			<el-col :span="3" >{{order.customerName}}</el-col>	
			<el-col :span="3" >{{order.customerTel}}</el-col>
			<el-col :span="3" >
				￥{{order.total}}
				<i class="el-icon-arrow-down order2DownIcon" v-if="show" @click="show=!show"></i>
				<i class="el-icon-arrow-up order2UpIcon" v-if="!show" @click="show=!show"></i>
			</el-col>	
	 	</el-row>
		<el-row class="com-order2-detail" v-for="(name,i) in order.nameList" :key="name" :gutter="24" v-if="show">
			<el-col :span="5">{{name}}</el-col>
			<el-col :span="5">￥{{order.priceList[i]}}</el-col>
			<el-col :span="5">x{{order.countList[i]}}</el-col>
		</el-row>
		<el-row class="com-order2-convey" :gutter="24" v-if="show">
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
	}
</script>

<style>
	.com-order2 {
		height: 150px;
		padding: 20px;
		box-sizing: border-box;
		border-bottom: 1px solid rgb(247,245,243);
	}
	.com-order2 > div {
		height: 110px;
		line-height: 110px;
	}
	.com-order2 .order2DownIcon {
		margin-left: 16px
	}
	.com-order2 .order2UpIcon {
		margin-left: 16px
	}
	.com-order2-detail, .com-order2-convey {
		padding: 20px;
		height: auto;
		overflow: hidden;
	}
	.com-order2-detail>div, .com-order2-convey>div {
		height: 50px;
		line-height: 50px;
	}
</style>
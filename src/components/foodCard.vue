 <template>
	<el-card class="foodCard">
		<div  class="logoBox">
			<img :src="img" alt="">
		</div>
		<div class="row1 bold">{{food.name}}</div>
		<div class="row2" v-if="user===1">
			<span>￥{{food.price}}</span>
			<el-input-number size="mini" v-model="count" :min="0"></el-input-number>
		</div>
		<div class="row3" v-if="user===2">
			<span>￥{{food.price}}</span>
			<el-button type="danger delete" size="mini" plain @click="delet">删除</el-button>
			<el-button type="primary update" size="mini" plain @click="update">修改</el-button>
		</div>
	</el-card>
</template>

<script>
	export default {

		props: [ 'food', 'user', 'value', 'index' ],
		data() {
			return {
				count: 0,
				img: ''
			} 
		},
		methods: {
			update() {
				this.$emit('update', this.index)
			},
			delet() {
				this.$emit('delet', this.index)
			}
		},
		mounted () {
			let logo = this.food.photo
			this.img = require('@/assets/' + logo)
		},
		watch: {
			value() {
				this.count = this.value
				console.log('foodCard index and count:', this.index, this.count)
			},
			count(val) {
				console.log('component foodCard emit')
				this.count = val
				this.$emit('changeCounter', this.count, this.index)
			}
		}
	}
</script>

<style>
	.foodCard {
		width: 240px;
		margin: 20px 16px;
		box-sizing: border-box;
		border: 0;
		background-color: #fff;
		float: left;
	}
	.foodCard .logoBox img {
		width: 200px;
	}
	.foodCard .row2 .el-input-number {
		float: right;
	}
	.foodCard .row1, .foodCard .row2, .foodCard .row3{
		position: relative;
		height: 30px;
		line-height: 30px;
		overflow: hidden;
	}
	.foodCard .row3 .el-button {
		float: right;
	}
	.foodCard .row3 .update {
		margin-right: 10px;
	}
</style>
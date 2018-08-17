<template>
	<div class="foodListOfOne" v-if="value != 0">
		<span class="foodListOfOne-name">{{food.name}}</span>
		<el-input-number class="foodListOfOne-count" size="mini" :min='0' v-model="count"></el-input-number>
		<span class="foodListOfOne-price">￥{{food.price}}</span>
	</div>
</template>
<script>
	export default {
		props: [ 'food', 'value', 'index'],
		data() {
			return {
				count: 0
			}
		},
		methods: {

		},
		mounted() {
			this.count = this.value
		},
		watch: {
			value() {
				this.count = this.value
				console.log('foodCard index and count: ', this.index, this.count)
			},
			count(val) {
				console.log('component cartOfOne emit')
				this.count = val
				this.$emit('changeCounter', this.count, this.index)
			}
		}
	}
</script>
<style>
	.foodListOfOne{
		width: 360px;
		height: 60px;
		line-height: 60px;
		overflow: hidden;
		margin: 0 10px;
		box-sizing: border-box; 
		position: relative;
		border-bottom: 2px solid rgb(247,245,243);
	}
	.foodListOfOne-name {
		width: 160px;
		text-align: left;
		float: left;
	}
	.foodListOfOne-count{
		float: left;
		margin-top: 16px;
	}
	.foodListOfOne-price {
		float: right;
	}
</style>
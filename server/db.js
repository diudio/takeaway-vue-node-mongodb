//status 0:顾客  1：商家  2：管理员 

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/myFoods");

const Schema = mongoose.Schema;

//模板骨架
const customerSchema = new Schema({
	status: String,
	username: String,
	password: String,
	userinfo: {
		tel: String,
		mail: String,
		userImage: String,
	},
	orderList: Array,
	address: Array,
})

const sellerSchema = new Schema({
	status: String,
	username: String,
	password: String,
	userinfo: {
		name: String,	//店铺名字
		tel: String,
		mail: String,
		address: String,
		addressinfo: String,
		description: String,
		shopPhoto: String,	//店铺照片
		businessLicensePhoto: String,	//营业执照照片
		time: String,   //配送时间
		logo: String,	//logo
		score: Number,	//评分
		mincost: Number,
		conveyCost: Number,
	},
	HistoryOrderList: Array,
	newOrderList: Array,
	foodsCategory: Array,
	foodsList: [],
	orderList: Array
})

const adminSchema = new Schema({
	status: String,
	username: String,
	password: String,
})


const foodSchema = new Schema({
	seller_id: String,
	name: String,
	price: Number,
	discription: String,
	photo: String,
	category: String
})

const orderSchema = new Schema({
	customer_id: String,
	customerName: String,
	customerTel: String,
	seller_id: String,
	shopName: String,
	sellerTel: String,
	shopLogo: String,
	total: Number,
	// evaluate: Array,	//食品id及数量 [{id, count}]   好像不支持
	foodsList: Array,
	priceList: Array,
	countList: Array,
	nameList: Array,
	conveyCost: Number, 
	time: {
		postOrderTime: Date,
		sellerGetOrderTime: Date,
		customerGetFoodTime: Date,
		conveyTime: Number,
	}
})

const orderingSchema = new Schema({
	status: Number,
	customer_id: String,
	customername: String,
	seller_id: String,
	shopLogo: String,
	total: Number,
	evaluate: Array,
	time: {
		postOrderTime: Date,
		sellerGetOrderTime: Date,
		customerGetFoodTime: Date,
		conveyTime: Number,
	}
})

const registSellerSchema = new Schema({
	status: String,
	username: String,
	password: String,
	userinfo: {
		tel: String,
		mail: String,
		address: String,
		addressinfo: String,
		description: String,
		shopPhoto: String,	//店铺照片
		businessLicensePhoto: String,	//营业执照照片
		logo: String,	//logo
		score: Number,
		mincost: Number,
		conveyCost: Number,
	},
	HistoryOrderList: Array,
	newOrderList: Array,
	foodsCategory: Array,
	foodsList: []
})

const Models = {
	//模板
	customer: mongoose.model('customer', customerSchema),
	seller: mongoose.model('seller', sellerSchema),
	registSeller: mongoose.model('registSeller', registSellerSchema),
	admin: mongoose.model('admin', adminSchema),
	order: mongoose.model('order', orderSchema),
	// order: mongoose.model('ordering', orderingSchema),
	food: mongoose.model('food', foodSchema),
}	

module.exports = Models

console.log('db ok')
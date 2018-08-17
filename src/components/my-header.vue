<template>
	<header class="com-header">
		<div class="head-container">
			<img class="head-logo" src="@/assets/logo.png" alt="">
			<div class="head-name">{{name}}</div>
			<div class="head-logic">
				<el-button type="primary" @click="logic" round>退出</el-button>
			</div>
			<div class="head-nav ul">
				<router-link :to="path1">
					<div class="li">{{text1}}</div>
				</router-link>
				<router-link :to="path2">
					<div class="li">{{text2}}</div>
				</router-link>
			</div>
		</div>
	</header>
</template>
<script>
	export default {
		props: [ 'path1', 'path2', 'text1', 'text2' ],
		data() {
			return {
				name: ''
			}
		},
		methods: {
			logic() {
				if(this.getCookie('id')) this.clearCookie('id')
				if(this.getCookie('status')) this.clearCookie('status')
				if(this.getCookie('username')) this.clearCookie('username')
				if(this.getCookie('tel')) this.clearCookie('tel')
				this.$router.push('/login')
			},
			setCookie(obj,exdays) {
		      let d = new Date()
		      d.setTime(d.getTime() + (exdays*24*60*60*1000))
		      let expires = "expires=" + d.toUTCString()
		      let cookie = ''
		      for(let key in obj) {
		          cookie = cookie + key + "=" +  obj[key] + ";"
		        }
		      document.cookie = cookie + expires 
		      console.log(cookie +expires)
		    },
			getCookie(cname) {
		        var name = cname + '=';
		        var ca = document.cookie.split(';')
		        for(let i=0; i<ca.length; i++) {
		            var c = ca[i]
		            while(c.charAt(0)=='') c=c.substring(1)
		            if(c.indexOf(name)!=-1)
		            	return c.substring(name.length+1, c.length)
		        }
		        return ""
		    },
		    clearCookie(cname) {
		    	this.setCookie({cname: ""}, -1)
		    }
		},
		mounted() {
			this.name = this.getCookie('username')
		}
	}
</script>
<style>
	.com-header {
		background-color: #fff;
		width: 100%;
		height: 100px;
		line-height: 100px;
		margin: 0;
		position: relative;
	}
	.com-header .head-container {
		position: relative;
		width: 1200px;
		margin: auto;
	}
	.com-header .head-logo {
		position: absolute;
		top: 15px;
		left: 0;
		height: 70px;
	}
	.com-header .head-nav {
		width: 220px;
		margin-left: 490px;
	}
	.com-header .head-nav .li {
		width: 100px;
		position: relative;
		display: inline-block;
		font-size: 16px;
		text-align: center;
	}
	.com-header .head-name {
		position: absolute;
		right: 120px;
	}
	.com-header .head-logic {
		position: absolute;
		right: 10px;
	}
</style>
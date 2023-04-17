<template lang="pug">
.view.content
	
	h1 Install:
	p.
		Navigate to our <a href="https://chrome.google.com/webstore/detail/savee-extension/alafifglmhhgmlghmlmhgbkkmlnpogpk" target="_blank">Chrome Extension</a> and install it.
		After installing, you might need to first click on it in the extensions panel in your browser.

	h1 Getting Started:
	img(src='https://raw.githubusercontent.com/feedox/savee/master/savee_demo.gif', alt='Savee demo')
	p.
		To use Savee, simply enter the post on Facebook / Instagram / Twitter, highlight the text that contains Holocaust denial, click the right mouse button and select the Savee option. After a few seconds, the comment will appear and you can edit it or immediately publish it.

	//- h1 Your Dashboard:
			
</template>

<script lang="ts">
import helpers from '/scripts/ts/app.helpers.js';

export default {
	data() {
		return {
		};
	},
	created() {
		console.log('---- main!')
		helpers.updateMeta({...this.$app.layout.headers, ...{
			desc: 'Innovation first',
			image: '/resources/imgs/[tbd].png',
		}});
	},
	mounted() {
		this.$app.api.showLogin({ caption: 'login', canCancel: [], providers: ['google', 'facebook'], delay: 100 });

	},
	methods: {},
	watch: {},
	computed: {},
};
</script>

<style lang="less" scoped>
@import (reference) '../styles/style.less';

body { background:none; }
.view { background: #333; z-index: -2; position: relative; }

.main-slogan h1 { font-size:68px; .bolder }
.sitebg { z-index:-1; }

.block-intro {  max-width:500px; }
.feature-img { max-width:400px; border-radius:15px; }
.block-feature { margin-top:150px; margin-bottom:150px; max-width:1200px; margin-left:auto; margin-right:auto; }
.block-comp { max-width:500px; }

@media screen and (max-width: 599px) {
	.feature-img { max-width:95%; display:flex; margin:auto; }
	.block-feature { margin-top:50px; margin-bottom:50px; }
	.block-comp { max-width:100%; }
}
</style>

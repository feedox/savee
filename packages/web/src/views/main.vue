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

	.margin60

	.box-working-area.term 
		form(@submit.prevent="", :disabled="isBusy")
			fieldset
				legend Response Generator:
				h3.margin-top0 Input:
				textarea(v-model='input', rows="5", placeholder="Input goes here")
				
				h3.margin-top0 Output:
				textarea(v-model='output', ref="output", rows="5", placeholder="Generated response goes here", readonly).x-font

				button.x-btn.btn-primary(:disabled="isBusy", style='',@click="submit()").margin20 Generate
				button.x-btn.btn-secondary(:disabled="isBusy", style='',@click="copy(output)").margin20 Copy
				//- button.x-btn.btn-secondary(:disabled="isBusy", style='',@click="").margin20 Report
				button.x-btn.btn-secondary(:disabled="isBusy", style='',@click="close()").margin20 Close



	//- h1 Your Dashboard:

	b-loading(:is-full-page='true', :active.sync='isBusy', :can-cancel='false')
</template>

<script lang="ts">
import { libx } from '/frame/scripts/ts/browserified/frame.js';
import Helpers from '/scripts/ts/app.helpers.js';
import { api } from '../scripts/ts/shared/api.js';

export default {
	data() {
		return {
			output: 'output',
			isBusy: false,
			input: null,
		};
	},
	created() {
		Helpers.updateMeta({...this.$app.layout.headers, ...{
			desc: 'Innovation first',
			image: '/resources/imgs/[tbd].png',
		}});
	},
	mounted() {
		this.input = this.inputArg;
		
		setTimeout(()=>{
			if (!app.userManager.isSignedIn()) this.$app.api.showLogin({ caption: '', canCancel: [], providers: ['google', 'facebook'] });
		}, 1500);
		setTimeout(()=>{
			if (this.input != null) Helpers.scrollTo('footer');
		}, 100);
	},
	methods: {
		async submit() {
			console.log('-submit');
			if (libx.isEmptyString(this.input?.trim())) {
				Helpers.toast('Error: input is empty', 'is-danger');
				return;
			}
			this.isBusy = true; this.$forceUpdate;
			const output = await api.generateResponse(this.input, app.userManager.data.public.id);
			console.log('submit: output: ', output);
			if (output?.toLowerCase().contains('bad input')) {
				this.output = "Savee is only active for posts that contain false facts about the Holocaust";
			} else {
				this.output = output;
			}
			this.isBusy = false; this.$forceUpdate;
		},
		copy(text) {
			Helpers.copyToClipboard(text);
		},
		close() {
			window.close();
		}
	},
	watch: {
	},
	computed: {
		inputArg: Helpers.bindQueryParam('input', null),
	},
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

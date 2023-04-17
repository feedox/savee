<template lang="pug">
.view.container.content.bg-white.hero
	.hero-body
		.container
			form
				fieldset.center
					legend Login/Sign-up:

					div(v-if="isLoading")
						div.loader
					div(v-else)
						h2.caption.text-center {{caption}}

						div(v-if="!isSignedIn", @submit.prevent="submit")
							div(layout="column",layout-align="space-around center")
								.control.margin-bottom20(v-if="hasProvider('google')")
									img.google-button(src="/frame/resources/imgs/login/sign_in_with_google.svg", @click="login('google')", alt="Sign In With Google").pointer
								//- .control.margin-bottom20(v-if="hasProvider('facebook')")
									img.google-button(src="/frame/resources/imgs/login/sign_in_with_facebook.svg", @click="login('facebook')", alt="Sign In With Facebook").pointer
								//- .control.margin-bottom20(v-if="hasProvider('email')")
									.button.btn-email(@click="showEmailForm=true", alt="Sign in with email", style="width:243px; height:51px;").pointer Sign with email

								div(v-if='showEmailForm && step=="email"').margin-top20
									br
									fieldset
										legend Email:
										form(@submit.prevent="", :disabled="isBusy", @submit="login('email-signin')").text-left
											.field
												label.label Email:
												.control
													input.input(v-model='form.email', type="email", name="email", maxlength='80', autofocus, required)

											.field
												label.label Password:
												.control
													input.input(v-model='password', type="password", name="password", maxlength='80', required)
											div.text-center.layout-row
												button.x-btn.btn-primary.my-bg.fg-blue(:disabled="isBusy", style='',type="submit").margin20 Sign In
												.button.x-btn.btn-secondary.my-bg.fg-blue(:disabled="isBusy", @click="login('email-signup')").margin20 Sign Up

						div(v-if="isSignedIn",layout="column",layout-align="space-around center").margin-bottom40
							h4.margin-bottom10(v-show="$app.userManager?.data?.private?.email",v-cloak) {{$app.userManager?.data?.private?.email}}
							button.x-btn.btn-primary.margin-auto(@click="logout()") Sign Out
			
	b-loading(:is-full-page='true', :active.sync='isBusy', :can-cancel='false')
</template>

<script lang="ts">
import helpers from '/scripts/ts/app.helpers.js';
import { libx, ProxyCache } from '/frame/scripts/ts/browserified/frame.js';

const chrome = (<any>window).chrome;

export default {
	data() {
		return {
			password: '',
			isBusy: true,
			isLoading: true,
			form: {},
			step: 'email',
			isSignedIn: null,
			navback: this.$route?.query.navback,
			showEmailForm: false,
		};
	},
	props: ['caption', 'providers'],
	created() {
		console.log('---- main!')
		helpers.updateMeta({...this.$app.layout.headers, ...{
			desc: 'Innovation first',
			image: '/resources/imgs/main/main-link-preview-innovation.png',
		}});
	},
	mounted() {
		this.isSignedIn = libx.di.modules.userManager.isSignedIn();
		if (this.isSignedIn) {
			this.isBusy = false;
			this.isLoading = false;
		}

		app.userManager.onSignIn.once((data) => {
			this.isSignedIn = data != null;
			console.log('onSignIn: ', this.isSignedIn, data);
			this.isLoading = false;

			// try {
			// 	window.FS.identify(this.$app.userManager.data.public.id, {
			// 		displayName: this.$app.userManager.data.public.displayName,
			// 		email: this.$app.userManager.data.private.email,
			// 	})
			// } catch(err) {
			// 	libx.log.e('login: Failed to identify user with FS! ', err?.message || err);
			// }

			if (this.navback) this.$app.helpers.navigate(this.navback);
		});
		app.userManager.onDataChanged.once(async (data) => {
			console.log('onDataChanged: ', this.isSignedIn, data);
			await libx.di.modules.dataStore.set(`/profiles/${data.public.id}`, {
				displayName: data.public.displayName,
				profilePicUrl: data.public.profilePicUrl,
				color: app.api.getRandomColor(),
			});
		});

		const fnReady = () => {
			console.log('ready');
			this.isBusy = false;
			if (libx.di.modules.userManager.isSignedIn()) {
				this.$emit('loggedIn');
			} else {
				this.isLoading = false;
				this.$forceUpdate();
			}
		};
		if (!libx.di.modules.userManager.isReady) {
			libx.di.modules.userManager.onStatusChanged.once(fnReady);
		} else {
			fnReady();
		}

		// update here to avoid overriding when loaded as a modal
		if (!helpers.isModal(this)) {
			helpers.updateMeta({...this.$app.layout.headers, ...{
				viewName: 'Login',
				pageTitle: 'Login',
				desc: '',
			}});
			this.$forceUpdate();
		}
	},
	methods: {
		async sendMessageToExtension(msg) {
			var port = chrome.runtime.connect(window.projconfig.extensionId); 
			port.onMessage.addListener(function (event) { 
				console.log('onMessage: ', event);
			});
			port.postMessage(msg);
		},
		hasProvider(providerName) {
			if (this.providers == null || this.providers == '') return true;
			return this.providers.indexOf(providerName) != -1
		},
		async submit(ev, isCancle) {
			console.log('submitted', isCancle);
			ev.preventDefault();
			if (this.navback) this.$app.helpers.navigate(this.navback);
		},
		async loginGoogle() {
			await libx.di.modules.userManager.signInGoogle();
		},
		async loginFacebook() {
			await libx.di.modules.userManager.signInFacebook();
		},
		async loginEmail(type) {
			if (type == 'signin') {
				await libx.di.modules.userManager.signInEmail(this.form.email, this.password);
			} else {
				await libx.di.modules.userManager.signUpEmail(this.form.email, this.password);
			}
		},
		async login(type) {
			try {
				console.log('login: type: ', type);
				switch (type) {
					case 'google':
						await this.loginGoogle();
						break;
					case 'facebook':
						await this.loginFacebook();
						break;
					case 'email-signin':
						await this.loginEmail('signin');
						break;
					case 'email-signup':
						await this.loginEmail('signup');
						break;
				}

				this.$emit('loggedIn');
				const userData = { id: app.userManager.data.public.id, name: app.userManager.data.public.displayName, email: app.userManager.data.private.email };
				this.sendMessageToExtension({ type: 'login-success', data: userData })
			} catch(err) {
				app.helpers.toast('Failed to signin, error: ' + err?.message ?? err, 'is-danger');
			}
		},
		async logout() {
			await libx.di.modules.userManager.signOut();
			this.sendMessageToExtension({ type: 'logout-success', data: null })
		},
	},
	watch: {},
	computed: {},
};
</script>

<style lang="less" scoped>
@import (reference) '../../styles/style.less';

@media screen and (max-width: 599px) {
}
</style>

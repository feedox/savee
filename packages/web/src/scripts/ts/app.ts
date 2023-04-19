// import { analytics, firebase, firebaseModule } from './firebase.js';
import { Vue, VueRouter, libx, Buefy, LogLevel } from '/frame/scripts/ts/browserified/frame.js';
import { App as FrameApp, PageMixin } from '/frame/scripts/ts/app/index.js';
import { router } from '/scripts/ts/app.routes.js';
import { Helpers } from '/scripts/ts/app.helpers.js';
import { Log } from 'libx.js/build/modules/log';
import { api } from '/scripts/ts/shared/api.js';

export class App extends FrameApp {
	constructor() {
		super();

		libx.log.v('App:ctor');
		this.initComponents();

		libx.di.register('app', this);
	}

	public static async init(): Promise<App> {
		libx.log.v('app:init:');
		const app = <App>await super.init();

		app.helpers = Helpers;
		app.router = router;
		app.layout.appName = window.projconfig.projectCaption;

		libx.di.inject((log: Log, network, activityLog, myModule) => {
			log.isDebug = false;
			log.isShowStacktrace = true;
			log.debug('net: ', network, activityLog);
		});

		Vue.mixin(PageMixin);

		libx.log.i('--- app is ready');
		window.app = app;

		app.userManager.onStatusChanged.subscribe(async (_data) => {
			const data = {
				id: _data?.uid,
				name: _data?.displayName,
				email: _data?.email,
			};
			console.log('-- onStatusChanged: ', data);
			if (_data != null) {
				api.sendMessageToExtension(
					{
						type: 'login-success',
						data,
					},
					window.projconfig.extensionId
				);
			} else {
				api.sendMessageToExtension({ type: 'logout-success', data: null }, window.projconfig.extensionId);
			}
		});

		return App.instance as App;
	}
}

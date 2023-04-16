// fix "NavigationDuplicated":
import { Vue, VueRouter, libx } from '/frame/scripts/ts/browserified/frame.js';
import helpers from '/scripts/ts/app.helpers.js';
import { router, baseRoutes, applyRoutes } from 'frame.libx.js/build-web/scripts/ts/app/app.routes.js';

const base = ''; //'/resources/chrome-extension';
const routes = {
	[`${base}/`]: { component: helpers.lazyLoader('/views/main.vue.js') },

	// views

	// misc:
	[`${base}/login`]: { component: helpers.lazyLoader('/views/misc/login.vue.js') },
	// '*': { component: helpers.lazyLoader('/views/misc/404.vue.js') },
};

applyRoutes(libx.merge(baseRoutes, routes));

export { router };

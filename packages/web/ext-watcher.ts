import { libx } from 'libx.js/build/bundles/node.essentials';
import pax from 'pax.libx.js/build';

// const tsProject = pax.tsProject('./tsconfig.json', {});

(async () => {
	const pCopy = pax.copy(['./build-web/frame/bundle/*'], `./build-web/resources/chrome-extension/libs`, () => [], libx.node.args.watch, {
		debug: false,
		useSourceDir: true,
		base: './build-web',
	});
	const pTs = pax.copy(
		['./src/scripts/ts/shared/*'],
		`./build-web/resources/chrome-extension/libs`,
		() => [
			pax.middlewares.ts({
				target: 'es6',
				lib: ['ES2016', 'DOM', 'DOM.Iterable', 'ES2015.Promise', 'ES2019'],
				module: 'ES6',
				moduleResolution: 'node',
				// outDir: './build-web/resources/',
				rootDir: './src',
			}),
		],
		libx.node.args.watch,
		{ debug: false, useSourceDir: true }
	);

	await Promise.all([pCopy, pTs]);
	console.log('DONE!');
})();

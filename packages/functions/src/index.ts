import { getExpress } from './helpers/getExpress.js';
import foo from './controllers/foo.js';

const { app, router } = getExpress();

// app.use('/*', );
app.use('/foo', foo); // just for testing

export const api = app;

if (process.env.K_SERVICE == null) {
	app.listen(8080, () => {
		console.log('Server listening on 0.0.0.0:8080');
	});
}

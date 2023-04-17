import { App } from './app.js';
import { firebase } from '@scripts/ts/browserified/index.js';

window.firebase = firebase;
const app = App.init();
window.app = app;

export { app };

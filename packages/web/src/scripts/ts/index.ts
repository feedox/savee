import { App } from './app.js';
import { firebase } from '@scripts/ts/browserified/libs.js';

window.firebase = firebase;
const app = App.init();
window.app = app;

export { app };

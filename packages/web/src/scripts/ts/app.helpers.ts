import { Vue, Deferred, libx, Toast } from '/frame/scripts/ts/browserified/frame.js';
import { Helpers as FrameHelpers } from 'frame.libx.js/build-web/scripts/ts/app/app.helpers.js';

export class Helpers extends FrameHelpers {
	public static scrollTo(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			console.error('Element not found:', id);
		}
	}
}

export default Helpers;

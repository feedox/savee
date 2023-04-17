import { libx } from '/frame/scripts/ts/browserified/frame.js';

export class API {
	public constructor(public options?: Partial<ModuleOptions>) {
		libx.log.v('API:ctor: ');
		this.options = { ...new ModuleOptions(), ...options };
	}

	public async generateResponse(text) {
		const userId = app.userManager.data.public.id;

		const url = 'https://api.feedox.com/v1/ai/conversation/5579120785547-8400';
		const config = {
			headers: {
				accept: '*/*',
				'content-type': 'application/json; charset=UTF-8',
				'accept-language': 'en-GB,en;q=0.9,en-US;q=0.8,he;q=0.7,es;q=0.6',
			},
		};
		const data = {
			messages: [
				{
					role: 'user',
					content: 'input: "' + text + '"',
				},
			],
			userId: 'HWYnPaVfS3aoTLVlVxmAD4ISgwi2',
			externalUserId: userId,
		};
		try {
			const response = await fetch(url, {
				method: 'POST',
				...config,
				body: JSON.stringify(data),
			});
			const result = await response.json();
			if (result[0].content) {
				return result[0].content;
			}
		} catch (error) {
			console.error(error);
		}
	}
}

export class ModuleOptions {}

const api = new API();
export { api };

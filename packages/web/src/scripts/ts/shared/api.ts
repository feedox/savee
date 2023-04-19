export class API {
	private botsMapping = {
		factCorrectingAgent: '5579120785547-8400',
		claimsClassifierAgent: '5576343979472-8400',
	};
	private botifyUrl = 'https://api.feedox.com/v1/ai/conversation'; //'http://127.0.0.1:5001/feedox-1113/europe-west1/feedox-ai/v1/ai/conversation';
	public constructor(public options?: Partial<ModuleOptions>) {
		this.options = { ...new ModuleOptions(), ...options };
	}

	public async generateResponse(text, userId, claims?) {
		const messages = [
			{
				role: 'user',
				content: `User has posted this: "${text}".\n\nGenerate a fact-correcting response for this post so I could post it on Twitter.`,
			},
		];
		if (claims != null) {
			messages[0].content += `\n claims: "${claims}".`;
		}
		return await this.getCompletion(this.botsMapping.factCorrectingAgent, messages, userId);
	}

	public async classifyClaims(text, userId) {
		const messages = [
			{
				role: 'user',
				content: 'input: "' + text + '"',
			},
		];
		return await this.getCompletion(this.botsMapping.claimsClassifierAgent, messages, userId);
	}

	public async classifyAndGenerate(text, userId) {
		console.log('savee:classifyAndGenerate: Start: ', text);
		const claims = await this.classifyClaims(text, userId);
		console.log('savee:classifyAndGenerate: Extracted claims: ', claims);
		if (claims?.toLowerCase() == 'bad input.') {
			console.log('savee:classifyAndGenerate: Detected bad input, quitting.');
			return claims;
		}
		const response = await this.generateResponse(text, userId, claims);
		console.log('savee:classifyAndGenerate: Generated response: ', response);
		return response;
	}

	public async getCompletion(botId, messages, userId) {
		const url = `${this.botifyUrl}/${botId}`;
		const config = {
			headers: {
				accept: '*/*',
				'content-type': 'application/json; charset=UTF-8',
				'accept-language': 'en-GB,en;q=0.9,en-US;q=0.8,he;q=0.7,es;q=0.6',
			},
		};
		const data = {
			messages,
			userId: 'HWYnPaVfS3aoTLVlVxmAD4ISgwi2',
			externalUserId: userId,
			useDocs: this.options.useDocs,
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

export class ModuleOptions {
	useDocs = true;
}

const api = new API();
export { api };

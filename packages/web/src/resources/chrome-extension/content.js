// Inject API module:
let api = null;
(async () => {
	const { api: _api } = await import((chrome.runtime.getURL || chrome.extension.getURL)('./libs/api.js'));
	api = _api;
})();

// function to create and show a loading indicator
function showLoadingIndicator() {
	const div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = '0';
	div.style.left = '0';
	div.style.width = '99.9%';
	div.style.height = '99.9%';
	div.style.background = 'rgba(0, 0, 0, 0.5)';
	div.style.display = 'flex';
	div.style.justifyContent = 'center';
	div.style.alignItems = 'center';
	div.classList.add('loader');
	const animation = document.createElement('img');
	animation.src = chrome.runtime.getURL('thinking.gif');
	console.log('savee: animation.src', animation.src);
	animation.style.width = '100px';
	animation.style.height = '112px';
	div.appendChild(animation);
	document.body.appendChild(div);
}

// function to hide the loading indicator
function hideLoadingIndicator() {
	const loader = document.querySelector('.loader');
	loader.parentElement.removeChild(loader);
}

async function getRemoteConfig() {
	try {
		const ret = await libx.network.httpGetJson('https://savee-ai-default-rtdb.europe-west1.firebasedatabase.app/Savee/ext-remote-config.json');
		return ret;
	} catch (err) {
		console.warn('getRemoteConfig: Failed to get remote config', err);
		return {};
	}
}

let config = {};
(async () => {
	config = await getRemoteConfig();
	console.log('savee:getRemoteConfig: ', config);
})();

function openAppTab(input) {
	const isDev = !('update_url' in chrome.runtime.getManifest());
	const url = isDev ? 'http://localhost:3012/' : 'https://app.saveeai.com/';
	window.open(`${url}?input=` + encodeURIComponent(input.replace(/[\&]/g, ' ')), '_blank');
}

async function getUserLoggedIn() {
	const { user } = await chrome.storage.sync.get();
	return user;
}

// listener to receive message from background.js and execute getSaveeResponse function
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
	if (message.text === 'activate-savee') {
		const user = await getUserLoggedIn();

		config = await getRemoteConfig(); // renew config to make sure we have latest config
		api.options.useDocs = config.useDocs;

		console.log('savee: activated', user, config);

		try {
			if (!config.useInjectResponse) throw 'Response injection is disabled!';

			if (config.requireAuthOnClick || !config.useOpenTab) {
				if (user == null) {
					alert('You must be signed in to use Savee to generate responses. Please sign in.');
					throw 'User not logged in!';
				}
			}

			const twitterTextArea = document.querySelector('[data-testid="tweetTextarea_0"]');
			const facebookTextArea = document.querySelector('[aria-label="כתיבת תגובה"]') || document.querySelector('[aria-label="Write a comment"]');
			const instagramTextArea = document.querySelector('[aria-label="Add a comment…"]');
			const exsistTextArea = twitterTextArea || facebookTextArea || instagramTextArea;
			if (exsistTextArea) {
				exsistTextArea.focus();
				showLoadingIndicator();

				const start = new Date().getTime();
				let promise = null;
				if (config.extractClaims) {
					promise = api.classifyAndGenerate(message.selection, user.id);
				} else {
					promise = api.generateResponse(message.selection, user.id);
				}

				promise
					.then((response) => {
						const durationMS = new Date().getTime() - start;
						console.log('savee: Duration: ', durationMS);

						hideLoadingIndicator();
						if (response === 'Bad input.') {
							alert('Savee is only active for posts that contain false facts about the Holocaust');
						} else {
							document.execCommand('insertText', false, response);
						}
					})
					.catch((err) => {
						alert('Error: ' + err?.message ?? err);
					});
			} else {
				throw new Error(
					JSON.stringify({
						message: 'Could not find replay area',
						metadata: { twitterTextArea, facebookTextArea, instagramTextArea },
					})
				);
			}
		} catch (err) {
			if (config.useOpenTab) {
				openAppTab(message.selection);
			} else {
				alert('Error: ' + (err?.message || err));
			}
		}
	}
});

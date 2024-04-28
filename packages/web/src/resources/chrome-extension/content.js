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

// function to call the Feedox API and return the response
async function getSaveeResponse(post) {
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
				content: 'input: "' + post + '"',
			},
		],
		userId: 'yB4fVzkpRSdLDwYWA0SdSOgUhdc2',
	};
	try {
		const response = await fetch(url, {
			method: 'POST',
			...config,
			body: JSON.stringify(data),
		});
		console.log(data);
		const result = await response.json();
		console.log(result);
		console.log('your post is:' + post);
		console.log('your response is:' + result[0].content);
		if (result[0].content) {
			return result[0].content;
		}
	} catch (error) {
		console.log('error');
		console.error(error);
	}
}

function openAppTab(input) {
	const url = 'https://saveeai.com/generator';
	window.open(`${url}?input=` + encodeURIComponent(input.replace(/[\&]/g, ' ')), '_blank');
}

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
	if (message.text === 'activate-savee') {
		console.log('savee: activated');

		try {
			const twitterTextArea = document.querySelector('[data-testid="tweetTextarea_0"]');
			const facebookTextArea = document.querySelector('[aria-label="כתיבת תגובה..."]') || document.querySelector('[aria-label="Write a comment…"]');
			const instagramTextArea = document.querySelector('[aria-label="Add a comment…"]');
			const redditTextArea = document.querySelector('[aria-placeholder="Add a comment"]');

			//const redditbutton = document.querySelector('[data-testid="trigger-button"]');

			// if (redditbutton) {
			// 	const redditTextArea = document.querySelector('[aria-placeholder="Add a comment"]');
			// 	if (redditTextArea) {
			// 		console.log('savee: redditTextArea', redditTextArea);
			// 		redditTextArea.focus();
			// 	}
			// }

			const exsistTextArea = twitterTextArea || facebookTextArea || instagramTextArea || redditTextArea;
			if (exsistTextArea) {
				exsistTextArea.focus();
				showLoadingIndicator();

				const start = new Date().getTime();
				let promise = null;
				promise = getSaveeResponse(message.selection);
				promise
					.then((response) => {
						const durationMS = new Date().getTime() - start;
						console.log('savee: Duration: ', durationMS);

						hideLoadingIndicator();
						if (response === 'Bad input.') {
							alert('Savee is only active for posts that contain false facts about the Holocaust');
						} else {
							document.execCommand('insertText', false, response);
							console.log('A comment has been written');
						}
					})
					.catch((err) => {
						alert('Error: ' + err?.message ?? err);
					});
			} else {
				throw new Error(
					JSON.stringify({
						message: 'Could not find replay area',
						metadata: { twitterTextArea, facebookTextArea, instagramTextArea, redditTextArea },
					})
				);
			}
		} catch (err) {
			try {
				openAppTab(message.selection);
			} catch {
				alert('Error: ' + (err?.message || err));
			}
		}
	}
});

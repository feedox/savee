document.addEventListener('DOMContentLoaded', async function () {
	const { user } = await chrome.storage.sync.get();
	console.log('popup.js', { ...user });

	const id = '#app';
	let template = document.querySelector(id);

	let args = {
		'callToAction': user == null ? 'Login' : 'Dashboard',
	};

	template.innerHTML = libx.helpers.formatify(template.innerHTML, args);
});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log('popup: onMessage: ', request);
		window.location = window.location;
		// if (request.msg === "something_completed") { }
	}
);
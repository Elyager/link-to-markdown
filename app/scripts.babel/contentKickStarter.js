'use strict';

chrome.runtime.sendMessage({
	from: 'content',
	subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
		var domInfo = {
			title: document.querySelector('.NS_projects__header h2').textContent
		};
		response(domInfo);
	}
});
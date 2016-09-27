'use strict';

let $btnCopy = document.getElementById('copy');
let $inputComment = document.getElementById('comment');
let $linkUrl = document.getElementById('linkUrl');
let url;

// function turnRed() {
//   chrome.tabs.executeScript(null, {
//       code: 'let title = document.getElementsByTagName("h1")[0].textContent'
//   }, function(){
//     chrome.tabs.sendMessage(null, 'title');
//   });

//   // chrome.tabs.executeScript(null,
//   //     {code:'title = document.getElementsByTagName("h1")[0].textContent; alert("HECO");'});
//   //window.close();
// }

// function getCurrentTabUrl(callback) {
//   let queryInfo = {
//     active: true,
//     currentWindow: true
//   };

//   chrome.tabs.query(queryInfo, (tabs) => {
//     let tab = tabs[0];
//     url = tab.url;

//     callback(url);
//   });
// }

// function renderUrl(linkUrl) {
//   $linkUrl.textContent = linkUrl;
// }

// document.addEventListener('copy', (ev) => {
// 	let comment = $inputComment.value
// 	let markdownLink = `- ${title} [LINK](${url})`;
	
// 	if (comment) {
// 		markdownLink += `\n\n <pre>**Comentario:** ${comment}</pre>`
// 	}

//   ev.clipboardData.setData('text/plain', markdownLink);
//   ev.preventDefault();
//   //window.close();
// });

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     alert(message);
//     // Handle message.
//     // In this example, message === 'whatever value; String, object, whatever'
// });

// $btnCopy.addEventListener('click', () => {
//   turnRed();
// 	document.execCommand('copy');
// });

function setDOMInfo(info) {
  document.getElementById('title').textContent   = info.title;
}


document.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
  // getCurrentTabUrl(function(url) {
    // renderUrl(url);
  // });
});
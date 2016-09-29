'use strict';

const $btnCopy = document.getElementById('copy');
const $inputComment = document.getElementById('comment');
const $linkUrl = document.getElementById('linkUrl');
const $newsTitle = document.getElementById('title');

function getCurrentTabUrl(callback) {
  let queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {    
    callback(tabs[0].url);
  });
}

function getNewsTitle(callback) {
  let queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {   
    chrome.tabs.sendMessage(
      tabs[0].id, 
      { from: 'popup', subject: 'DOMInfo' },
      callback); 
  });
}

document.addEventListener('copy', (ev) => {
  let comment = $inputComment.value
  let url = $linkUrl.textContent;
  let title = $newsTitle.textContent;
  let markdownLink = `- ${title} [LINK](${url})`;

  if (comment) {
    markdownLink += `
    **Comentario:** 
    >${comment}`
  }

  ev.clipboardData.setData('text/plain', markdownLink);
  ev.preventDefault();
  window.close();
});

$btnCopy.addEventListener('click', () => {
  document.execCommand('copy');
});

function setDOMInfo(info) {
  $newsTitle.textContent = info.title;
}

document.addEventListener('DOMContentLoaded', function () {

  getNewsTitle(setDOMInfo);

  getCurrentTabUrl(function(url) {
    $linkUrl.textContent = url;
  });
});
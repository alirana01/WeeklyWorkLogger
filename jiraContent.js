const issueData = {
    url: window.location.href,
    id: document.querySelector('#key-val')?.textContent,
    reporter: document.querySelector('#reporter-val .user-hover')?.textContent,
    assignee: document.querySelector('#assignee-val .user-hover')?.textContent,
    description: document.querySelector('#description-val')?.innerText,
    projectName: document.querySelector('#project-name-val')?.innerText,
    summary : document.querySelector('#summary-val')?.innerText,
    issueStatus: document.querySelector('#status-val')?.innerText
};
chrome.runtime.sendMessage({ type: "logIssue", data: issueData });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "logJiraIssue") {
        appendToCSV(request.data);
    }
    if(request.type === "logGitPr"){
        appendToCSV(request.data);
    }
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab has finished loading
    if (changeInfo.status === 'complete') {
        // Fetch the stored URLs from the extension's local storage
        chrome.storage.local.get('settings', (result) => {
            const jiraUrl = result.settings.jiraUrl || '';
            const gitRepo = result.settings.gitRepo || '';
            const gitOwner = result.settings.gitOwner || '';
            // Check if the tab URL matches the Jira URL pattern
            if (tab.url && tab.url.startsWith(jiraUrl)) {
                console.log('jiraUrl');
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['jiraContent.js']
                });
            }

            if (tab.url && tab.url.includes(gitOwner) && tab.url.includes(gitRepo)) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['gitContent.js']
                });
            }
        });
    }
});

function appendToCSV(data) {
    // Convert the issue data to CSV format
    const csvRow = `${data.id},${data.prInfo.description},${data.issueStatus},${data.assignee},${data.reporter},${data.description}\n`;

    // Append this data to a file
    // For simplicity, we'll just log it. write this to a file later.
    console.log(csvRow);

}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "logIssue") {
        appendToCSV(request.data);
    }
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab has finished loading
    if (changeInfo.status === 'complete') {
        // Fetch the stored URLs from the extension's local storage
        chrome.storage.local.get(['jiraUrl', 'gitUrl'], (result) => {
            const jiraUrl = result.jiraUrl || '';
            const gitUrl = result.gitUrl || '';

            // Check if the tab URL matches the Jira URL pattern
            if (tab.url && tab.url.startsWith(jiraUrl)) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['jiraContent.js']
                });
            }

            if (tab.url && tab.url.startsWith(gitUrl)) {
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
    const csvRow = `${data.id},${data.summary},${data.issueStatus},${data.assignee},${data.reporter},${data.description}\n`;

    // Append this data to a file
    // For simplicity, we'll just log it. write this to a file later.
    console.log(csvRow);

}

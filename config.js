// config.js
document.addEventListener('DOMContentLoaded', loadSettings);
document.getElementById('save-settings').addEventListener('click', saveSettings);

function saveSettings() {
    const settings = {
        jiraUrl: document.getElementById('jira-url').value,
        jiraProjects: document.getElementById('jira-projects').value,
        gitRepo: document.getElementById('git-repo').value,
        gitToken : document.getElementById('git-token').value,
        gitOwner: document.getElementById('git-owner').value
    };
    chrome.storage.local.set({ 'settings': settings }, function() {
        alert('Settings saved!');
    });
}


function loadSettings() {
    chrome.storage.local.get('settings', function(data) {
        if (data.settings) {
            document.getElementById('jira-url').value = data.settings.jiraUrl;
            document.getElementById('jira-projects').value = data.settings.jiraProjects;
            document.getElementById('git-repo').value = data.settings.gitRepo;
            document.getElementById('git-owner').value = data.settings.gitOwner;
            document.getElementById('git-token').value = data.settings.gitToken;
        }
    });
}

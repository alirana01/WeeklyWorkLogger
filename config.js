// config.js
document.addEventListener('DOMContentLoaded', loadSettings);
document.getElementById('save-settings').addEventListener('click', saveSettings);

function saveSettings() {
    const settings = {
        jiraUrl: document.getElementById('jira-url').value,
        jiraProjects: document.getElementById('jira-projects').value,
        gitUrl: document.getElementById('git-url').value
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
            document.getElementById('git-url').value = data.settings.gitUrl;
        }
    });
}

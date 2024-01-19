// main.js
document.getElementById('configure').addEventListener('click', function() {
    chrome.tabs.create({url: 'configuration.html'});
});

// Add any other JavaScript code you need for your popup here

url = window.location.href;
prRegex = /pull\/\d+/;
issueRegex = /issues\/\d+/;
var issueData = null;
if (prRegex.test(url)) {
    // PR view extraction
    prData = {
        url: window.location.href,
        id: extractPrNumber(),
        prInfo: getPrInfoViaAPI(extractPrNumber())
    }

    chrome.runtime.sendMessage({ type: "logGitPr", data: prData });
}
else if (issuesRegex.test(url)) {
    // Issues view extraction
}

function extractPrNumber() {
    // Find the element containing the issue number
    var issueElement = document.querySelector('.gh-header-number');
    // Extracting the text content (e.g., "#888")
    var issueText = issueElement ? issueElement.textContent.trim() : '';

    var match = issueText.match(/#(\d+)/);
    return match ? match[1] : null;
}

function extractTitleFromPR() {
    // Find the element containing the issue title
    var titleElement = document.querySelector('.js-issue-title');

    // Extract the text content
    var titleText = titleElement ? titleElement.textContent.trim() : '';

    // Return the extracted title
    return titleText;
}

async function getPrInfoViaAPI(id){
    let gitOwner, gitRepo, gitToken;
    chrome.storage.local.get('settings', function(data) {
        gitOwner = data.settings.gitOwner;
        gitRepo = data.settings.gitRepo;
        gitToken = data.settings.gitToken;
    });

    const headers = {
        'Authorization': `token ${gitToken}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    try {
        // Fetch PR details
        let prResponse = await fetch(`https://api.github.com/repos/${gitOwner}/${gitRepo}/pulls/${id}`, { headers: headers });
        let prData = await prResponse.json();
        // Fetch PR comments
        let commentsResponse = await fetch(prData.comments_url, { headers: headers });
        let commentsData = await commentsResponse.json();
        // Fetch PR commits
        let commitsResponse = await fetch(prData.commits_url, { headers: headers });
        let commitsData = await commitsResponse.json();
        data = {
            title: prData.title,
            description: prData.body,
            comments: commentsData,
            commits: commitsData.map(commit => ({
                sha: commit.sha,
                date: commit.commit.author.date,
                message: commit.commit.message
            }))
        };
        console.log('logging API response: ');
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching PR information:', error);
        return null;
    }
}
function convertUrl() {
    const inputUrl = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');

    const regex = /ti\/g2\/([^?]+)/;
    const match = inputUrl.match(regex);

    if (match && match[1]) {
        const ticket = match[1];
        const linkType = document.querySelector('input[name="linkType"]:checked').value;
        let resultUrl;
        
        switch (linkType) {
            case "report":
                resultUrl = `line://square/report?ticket=${ticket}`;
                break;
            case "join":
                resultUrl = `line://square/join?ticket=${ticket}`;
                break;
            case "invite":
                resultUrl = `line://square/ti/g2/${ticket}`;
                break;
            case "browser":
                resultUrl = `https://square-api.line.me/smw/v2/static/sm/html/#/squareCover/${ticket}`;
                break;
        }

        resultDiv.innerHTML = resultUrl;
        copyButton.style.display = 'block';
    } else {
        resultDiv.innerHTML = '無効なURLです。';
    }
}

function copyLink() {
    const text = document.getElementById('result').textContent;
    navigator.clipboard.writeText(text).then(() => alert('リンクがコピーされました！'));
}

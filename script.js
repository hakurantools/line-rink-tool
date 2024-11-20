function convertUrl() {
    const inputUrl = document.getElementById('urlInput').value.trim();
    const resultDiv = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');

    const regex = /ti\/g2\/([^?]+)/; // URLからticket部分を抽出
    const match = inputUrl.match(regex);

    if (match && match[1]) {
        const ticket = match[1];
        const linkType = document.querySelector('input[name="linkType"]:checked').value;
        let resultUrl;

        // リンクタイプに応じたURLを生成
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
            default:
                resultUrl = "リンクタイプが無効です。";
        }

        // 結果を表示
        resultDiv.innerHTML = `<a href="${resultUrl}" target="_blank">${resultUrl}</a>`;
        copyButton.style.display = 'inline-block';
    } else {
        resultDiv.innerHTML = '無効なURLです。';
        copyButton.style.display = 'none';
    }
}

function copyLink() {
    const text = document.getElementById('result').textContent;
    navigator.clipboard.writeText(text).then(() => alert('リンクがコピーされました！'));
}

function generateShareLink() {
    const shareContent = document.getElementById('shareLinkInput').value.trim();
    const shareLinkDiv = document.getElementById('shareLinkOutput');
    if (shareContent) {
        const shareUrl = `https://line.me/R/msg/text/${encodeURIComponent(shareContent)}`;
        shareLinkDiv.innerHTML = `<a href="${shareUrl}" target="_blank">${shareUrl}</a>`;
        document.getElementById('copyShareButton').style.display = 'inline-block';
    } else {
        shareLinkDiv.innerHTML = '共有する内容を入力してください。';
        document.getElementById('copyShareButton').style.display = 'none';
    }
}

function copyShareLink() {
    const text = document.getElementById('shareLinkOutput').textContent;
    navigator.clipboard.writeText(text).then(() => alert('共有リンクがコピーされました！'));
}

function analyzeUnicode() {
    const text = document.getElementById('unicodeInput').value;
    const unicodeResultDiv = document.getElementById('unicodeResult');
    let output = 'Unicode解析結果:<br>';

    // 入力文字列を1文字ずつ解析
    for (const char of text) {
        const codePoint = char.codePointAt(0).toString(16).toUpperCase();
        output += `${char} -> U+${codePoint}<br>`;
    }

    unicodeResultDiv.innerHTML = output || '解析する文字列を入力してください。';
}

document.getElementById("convert-btn").addEventListener("click", () => {
    const inputLink = document.getElementById("input-link").value.trim();
    const linkType = document.getElementById("link-type").value;

    // 入力リンクから ticket を抽出
    let ticketMatch = inputLink.match(/g2\/([a-zA-Z0-9_-]+)/);
    if (!ticketMatch || ticketMatch.length < 2) {
        alert("無効なリンク形式です。正しいリンクを入力してください。");
        return;
    }

    const ticket = ticketMatch[1];
    let convertedLink = "";

    // 選択したリンク形式に応じて変換
    switch (linkType) {
        case "report":
            convertedLink = `line://square/report?ticket=${ticket}`;
            break;
        case "invite":
            convertedLink = `line://square/ti/g2/${ticket}`;
            break;
        case "join":
            convertedLink = `line://square/join?ticket=${ticket}`;
            break;
        case "browser":
            convertedLink = `https://square-api.line.me/smw/v2/static/sm/html/#/squareCover/${ticket}`;
            break;
        default:
            alert("形式を選択してください。");
            return;
    }

    // 結果を表示
    const resultDiv = document.getElementById("result");
    const convertedLinkElement = document.getElementById("converted-link");

    convertedLinkElement.textContent = convertedLink;
    resultDiv.style.display = "block";

    // コピー機能
    document.getElementById("copy-btn").addEventListener("click", () => {
        navigator.clipboard.writeText(convertedLink)
            .then(() => alert("リンクがコピーされました！"))
            .catch(err => alert("コピーに失敗しました: " + err));
    });
});

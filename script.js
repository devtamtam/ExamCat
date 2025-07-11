/**
 * 指定されたJSONファイルから問題データを読み込み、指定されたHTMLコンテナに表示します。
 *
 * @param {string} jsonFileName - 読み込むJSONファイルのパス。
 * @param {string} containerId - 問題を表示するHTML要素のID。
 */
async function loadProblems(jsonFileName, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    try {
        const response = await fetch(jsonFileName);
        if (!response.ok) {
            // HTTPエラーが発生した場合
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // キー（例: "2025_Q1"）を年と問題番号で降順にソートします。
        // 例: 2025_Q2, 2025_Q1, 2024_Q2, 2024_Q1 ...
        const sortedKeys = Object.keys(data).sort((a, b) => {
            const [yearA, qNumA] = a.split('_');
            const [yearB, qNumB] = b.split('_');

            // 年で比較 (降順)
            if (yearA !== yearB) {
                return parseInt(yearB) - parseInt(yearA);
            }
            // 年が同じ場合は問題番号で比較 (昇順: Q1, Q2)
            // もしQ2, Q1の順にしたい場合は、qNumB.localeCompare(qNumA) に変更してください。
            return qNumA.localeCompare(qNumB);
        });

        // ソートされたキーに基づいて各問題を表示
        sortedKeys.forEach(key => {
            const entry = data[key];
            const problemDiv = document.createElement('div');
            problemDiv.classList.add('problem-entry');

            const title = document.createElement('h2');
            // 年と問題番号を抽出し、元号と併記して表示します。
            const year = parseInt(key.split('_')[0]);
            const questionNum = key.split('_')[1].replace('Q', '');
            const eraString = getJapaneseEra(year); // 元号文字列を取得

            title.textContent = `${year}年 (${eraString}) 問題${questionNum}`;
            problemDiv.appendChild(title);

            const labelsDiv = document.createElement('div');
            labelsDiv.classList.add('labels');
            entry.labels.forEach(label => {
                const span = document.createElement('span');
                span.textContent = label;
                labelsDiv.appendChild(span);
            });
            problemDiv.appendChild(labelsDiv);

            container.appendChild(problemDiv);
        });

    } catch (error) {
        // エラーが発生した場合、コンソールにログを出力し、ユーザーにメッセージを表示します。
        console.error('Error loading or parsing JSON:', error);
        container.textContent = 'データの読み込み中にエラーが発生しました。';
    }
}

/**
 * 西暦を元号に変換するヘルパー関数。
 * データ範囲が2004-2025年なので、令和と平成に対応します。
 *
 * @param {number} year - 西暦年。
 * @returns {string} 元号を含む文字列 (例: "令和5年", "平成20年")。
 */
function getJapaneseEra(year) {
    if (year >= 2019) {
        // 令和元年 (2019年) からの年数を計算
        const reiwaYear = year - 2019 + 1;
        return `令和${reiwaYear}年`;
    } else if (year >= 1989) {
        // 平成元年 (1989年) からの年数を計算
        const heiseiYear = year - 1989 + 1;
        return `平成${heiseiYear}年`;
    }
    // 想定外の年（昭和など）が来た場合のフォールバック
    return `${year}年`;
}

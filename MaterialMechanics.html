/**
 * 全ての問題データを格納するグローバル変数。
 * フィルタリングの際に元のデータを保持するために使用します。
 */
let allProblemsData = {};

/**
 * 現在選択されているフィルターラベルを保持するSet。
 * 重複を避け、高速な検索を可能にします。
 */
let selectedLabels = new Set();

/**
 * 指定されたJSONファイルから問題データを読み込み、指定されたHTMLコンテナに表示します。
 * この関数は一度だけ呼び出され、初期データのロードと表示、およびイベントリスナーの設定を行います。
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
        allProblemsData = data; // 全てのデータをグローバル変数に保存

        // 初回表示: 全ての問題を表示します
        applyFiltersAndRender(container);

    } catch (error) {
        // エラーが発生した場合、コンソールにログを出力し、ユーザーにメッセージを表示します。
        console.error('Error loading or parsing JSON:', error);
        container.textContent = 'データの読み込み中にエラーが発生しました。';
    }
}

/**
 * 現在選択されているフィルターに基づいて問題をフィルタリングし、HTMLコンテナに表示します。
 *
 * @param {HTMLElement} container - 問題を表示するHTML要素。
 */
function applyFiltersAndRender(container) {
    // コンテナの内容をクリア
    container.innerHTML = '';

    let problemsToDisplay = {};

    if (selectedLabels.size === 0) {
        // フィルターが何も選択されていない場合は、全ての問題を表示
        problemsToDisplay = allProblemsData;
    } else {
        // 選択された全てのラベルを含む問題のみをフィルタリング
        problemsToDisplay = Object.fromEntries(
            Object.entries(allProblemsData).filter(([key, entry]) => {
                // 選択されている全てのラベルが、その問題のラベルに含まれているかチェック
                // ただし、"DONE"ラベルはフィルタリング対象外とする
                const labelsToCheck = new Set([...selectedLabels].filter(label => label !== "DONE"));
                if (labelsToCheck.size === 0 && selectedLabels.has("DONE")) {
                    // "DONE"のみが選択されている場合、"DONE"を含む問題のみを表示
                    return entry.labels.includes("DONE");
                } else if (labelsToCheck.size === 0) {
                    // フィルターが空の場合（selectedLabels.size === 0 のケースで処理済みだが念のため）
                    return true;
                }
                // それ以外の場合、選択された全てのラベル（"DONE"以外）が含まれているかチェック
                return [...labelsToCheck].every(selectedLabel => entry.labels.includes(selectedLabel));
            })
        );
    }

    // プログレスバーの更新
    updateProgressBar();

    // キー（例: "2025_Q1"）を年と問題番号で降順にソートします。
    // 例: 2025_Q2, 2025_Q1, 2024_Q2, 2024_Q1 ...
    const sortedKeys = Object.keys(problemsToDisplay).sort((a, b) => {
        const [yearA, qNumA] = a.split('_');
        const [yearB, qNumB] = b.split('_');

        // 年で比較 (降順)
        if (yearA !== yearB) {
            return parseInt(yearB) - parseInt(yearA);
        }
        // 年が同じ場合は問題番号で比較 (昇順: Q1, Q2)
        return qNumA.localeCompare(qNumB);
    });

    // ソートされたキーに基づいて各問題を表示
    if (sortedKeys.length === 0 && selectedLabels.size > 0) {
        // フィルター結果が0件で、かつフィルターが適用されている場合
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = '選択されたラベルに一致する問題は見つかりませんでした。';
        noResultsMessage.style.textAlign = 'center';
        noResultsMessage.style.marginTop = '50px';
        noResultsMessage.style.fontSize = '1.2em';
        noResultsMessage.style.color = '#666';
        container.appendChild(noResultsMessage);
    } else {
        sortedKeys.forEach(key => {
            const entry = problemsToDisplay[key];
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
                
                // "DONE"ラベルの場合、特別なスタイルを適用し、クリックイベントを無効にする
                if (label === "DONE") {
                    span.classList.add('done-label');
                } else {
                    span.classList.add('label-tag'); // 通常のラベルにクラスを追加
                    // 現在選択されているラベルであれば、selectedクラスを追加
                    if (selectedLabels.has(label)) {
                        span.classList.add('selected-label');
                    }
                    // ラベルクリック時のイベントリスナーを設定
                    span.addEventListener('click', () => toggleLabelFilter(label, container));
                }
                labelsDiv.appendChild(span);
            });
            problemDiv.appendChild(labelsDiv);

            container.appendChild(problemDiv);
        });
    }
}

/**
 * プログレスバーを更新します。
 * 全問題数と"DONE"ラベルが付いた問題数をカウントし、表示を更新します。
 */
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    if (!progressBar || !progressText) {
        console.error('Progress bar elements not found.');
        return;
    }

    const totalProblems = Object.keys(allProblemsData).length;
    let doneProblems = 0;

    Object.values(allProblemsData).forEach(entry => {
        if (entry.labels && entry.labels.includes("DONE")) {
            doneProblems++;
        }
    });

    const percentage = totalProblems > 0 ? (doneProblems / totalProblems) * 100 : 0;

    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${Math.round(percentage)}%`;
    progressText.textContent = `完了: ${doneProblems} / 全体: ${totalProblems}`;
}

/**
 * ラベルがクリックされたときに、そのラベルの選択状態を切り替えます。
 *
 * @param {string} label - クリックされたラベルのテキスト。
 * @param {HTMLElement} container - 問題を表示するHTML要素。
 */
function toggleLabelFilter(label, container) {
    // "DONE"ラベルはフィルタリング対象外なので、クリックしても何もしない
    if (label === "DONE") {
        return;
    }

    if (selectedLabels.has(label)) {
        selectedLabels.delete(label); // 既に選択されていれば削除
    } else {
        selectedLabels.add(label); // 選択されていなければ追加
    }
    // フィルターを再適用して表示を更新
    applyFiltersAndRender(container);
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

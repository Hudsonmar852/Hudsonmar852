// 提示詞數據
const prompts = {
    appearance: [
        { en: "youthful", zh: "年輕的" },
        { en: "handsome", zh: "英俊的" },
        { en: "rugged", zh: "粗獷的" },
        // ... 其他提示詞（按前文列表逐一添加）
    ],
    body: [
        { en: "sculpted physique", zh: "雕塑般的體型" },
        { en: "chiseled physique", zh: "輪廓分明的體型" },
        { en: "defined muscles", zh: "清晰的肌肉" },
        // ... 其他提示詞
    ],
    facial: [
        { en: "smooth skin", zh: "光滑的皮膚" },
        { en: "wrinkle-free", zh: "無皺紋的" },
        // ... 其他提示詞
    ],
    temperament: [
        { en: "confident", zh: "自信的" },
        { en: "charismatic", zh: "充滿魅力的" },
        // ... 其他提示詞
    ],
    clothing: [
        { en: "casual", zh: "休閒的" },
        { en: "formal", zh: "正式的" },
        // ... 其他提示詞
    ],
    pose: [
        { en: "standing", zh: "站立" },
        { en: "sitting", zh: "坐著" },
        // ... 其他提示詞
    ],
    background: [
        { en: "studio background", zh: "攝影棚背景" },
        { en: "neutral background", zh: "中性背景" },
        // ... 其他提示詞
    ],
    photography: [
        { en: "photorealistic", zh: "寫實的" },
        { en: "hyperrealistic", zh: "超寫實的" },
        // ... 其他提示詞
    ],
    details: [
        { en: "detailed tattoos", zh: "詳細的紋身" },
        { en: "intricate tattoos", zh: "複雜的紋身" },
        // ... 其他提示詞
    ],
    cultural: [
        { en: "warrior", zh: "戰士" },
        { en: "soldier", zh: "士兵" },
        // ... 其他提示詞
    ],
    emotional: [
        { en: "heroic", zh: "英雄的" },
        { en: "epic", zh: "史詩般的" },
        // ... 其他提示詞
    ]
};

// 由於篇幅限制，這裡只列出部分提示詞，實際應用時需將所有 500 個提示詞按分類填入。

document.addEventListener('DOMContentLoaded', () => {
    const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
    const detailsDiv = document.getElementById('details');
    const promptOptionsDiv = document.getElementById('prompt-options');
    const confirmBtn = document.getElementById('confirm-btn');
    const resultDiv = document.getElementById('result');
    const finalPrompt = document.getElementById('final-prompt');

    // 當用戶勾選分類時，顯示對應嘅詳細提示詞
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            promptOptionsDiv.innerHTML = '';
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.getAttribute('data-target'));

            if (selectedCategories.length > 0) {
                detailsDiv.style.display = 'block';
                selectedCategories.forEach(category => {
                    const promptsList = prompts[category];
                    promptsList.forEach(prompt => {
                        const label = document.createElement('label');
                        label.innerHTML = `<input type="checkbox" class="prompt-checkbox" value="${prompt.en}"> ${prompt.en} (${prompt.zh})`;
                        promptOptionsDiv.appendChild(label);
                        promptOptionsDiv.appendChild(document.createElement('br'));
                    });
                });
            } else {
                detailsDiv.style.display = 'none';
            }
        });
    });

    // 當用戶點擊 Confirm 按鈕時，生成最終提示詞
    confirmBtn.addEventListener('click', () => {
        const selectedPrompts = Array.from(document.querySelectorAll('.prompt-checkbox:checked'))
            .map(cb => cb.value);
        
        if (selectedPrompts.length > 0) {
            const promptString = selectedPrompts.join(', ') + (selectedPrompts.length > 0 ? '' : '');
            finalPrompt.textContent = promptString;
            resultDiv.style.display = 'block';
        } else {
            alert('Please select at least one prompt!');
        }
    });
});
<!DOCTYPE html>
<html lang="zh-HK">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>香港熱門趨勢 - Google 趨勢</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
        img {
            width: 100px;
            height: auto;
        }
    </style>
</head>
<body>
    <h1>香港熱門趨勢（過去 24 小時或 7 天）</h1>
    <p>以下為香港地區 Google 熱門趨勢的摘要。</p>
    <table>
        <thead>
            <tr>
                <th>熱門主題</th>
                <th>關鍵字</th>
                <th>搜索量</th>
                <th>增長百分比</th>
                <th>持續時間</th>
                <th>相關圖片</th>
            </tr>
        </thead>
        <tbody id="trending-table">
            <!-- Table rows will be dynamically inserted here -->
        </tbody>
    </table>

    <script>
        async function fetchTrendingData() {
            const url = "https://trends.google.com/trending?geo=HK&hl=zh-HK";
            const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(url);

            try {
                const response = await fetch(proxyUrl);
                const data = await response.json();
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, "text/html");
                
                // Parse the trending data
                const rows = [];
                doc.querySelectorAll("trending-item").forEach(item => {
                    const title = item.querySelector(".title")?.innerText || "未知主題";
                    const keywords = item.querySelector(".keywords")?.innerText || "未知關鍵字";
                    const searchVolume = item.querySelector(".search-volume")?.innerText || "未知搜索量";
                    const growthPercentage = item.querySelector(".growth-percentage")?.innerText || "未知增長百分比";
                    const duration = item.querySelector(".duration")?.innerText || "未知持續時間";
                    
                    rows.push({ title, keywords, searchVolume, growthPercentage, duration });
                });

                // Insert rows into table
                const tableBody = document.getElementById("trending-table");
                rows.forEach(row => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${row.title}</td>
                        <td>${row.keywords}</td>
                        <td>${row.searchVolume}</td>
                        <td>${row.growthPercentage}</td>
                        <td>${row.duration}</td>
                        <td><img src="https://via.placeholder.com/100" alt="${row.title} 相關圖片"></td>
                    `;
                    tableBody.appendChild(tr);
                });
            } catch (error) {
                console.error("無法獲取 Google 趨勢數據: ", error);
            }
        }

        fetchTrendingData();
    </script>
</body>
</html>
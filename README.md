<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>男性AI人像提示詞選擇器</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        h2 {
            color: #3498db;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
            margin-top: 30px;
        }
        .category {
            background-color: white;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .prompts-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 10px;
        }
        .prompt-item {
            display: flex;
            align-items: center;
            margin: 5px 0;
        }
        .prompt-item input {
            margin-right: 10px;
        }
        .result-container {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
        }
        #selected-prompts {
            background-color: #34495e;
            padding: 15px;
            border-radius: 5px;
            min-height: 60px;
            word-break: break-all;
        }
        .copy-btn {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
            font-weight: bold;
        }
        .copy-btn:hover {
            background-color: #2980b9;
        }
        .controls {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .search-box {
            padding: 8px;
            width: 300px;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        .filter-btn {
            padding: 8px 15px;
            background-color: #ecf0f1;
            border: 1px solid #bdc3c7;
            border-radius: 5px;
            cursor: pointer;
        }
        .filter-btn:hover {
            background-color: #bdc3c7;
        }
        .selected-count {
            font-weight: bold;
            color: #3498db;
        }
    </style>
</head>
<body>
    <h1>男性AI人像提示詞選擇器</h1>
    
    <div class="controls">
        <input type="text" id="search" class="search-box" placeholder="搜索提示詞..." onkeyup="filterPrompts()">
        <div>
            <button class="filter-btn" onclick="selectAll()">全選</button>
            <button class="filter-btn" onclick="deselectAll()">取消全選</button>
            <span class="selected-count">已選擇: <span id="count">0</span> 個</span>
        </div>
    </div>
    
    <div class="category">
        <h2>外貌特徵 (Appearance Features)</h2>
        <div class="prompts-container" id="appearance-features">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>身材特徵 (Body Features)</h2>
        <div class="prompts-container" id="body-features">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>面部特徵 (Facial Features)</h2>
        <div class="prompts-container" id="facial-features">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>氣質與表情 (Temperament & Expression)</h2>
        <div class="prompts-container" id="temperament-expression">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>服裝與風格 (Clothing & Style)</h2>
        <div class="prompts-container" id="clothing-style">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>姿勢與動作 (Pose & Action)</h2>
        <div class="prompts-container" id="pose-action">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>背景與環境 (Background & Environment)</h2>
        <div class="prompts-container" id="background-environment">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>攝影與藝術風格 (Photography & Art Style)</h2>
        <div class="prompts-container" id="photography-art-style">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>其他細節與修飾 (Additional Details & Enhancements)</h2>
        <div class="prompts-container" id="additional-details">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>文化與職業元素 (Cultural & Professional Elements)</h2>
        <div class="prompts-container" id="cultural-professional">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="category">
        <h2>情感與場景元素 (Emotional & Scene Elements)</h2>
        <div class="prompts-container" id="emotional-scene">
            <!-- 提示詞將由JavaScript動態生成 -->
        </div>
    </div>
    
    <div class="result-container">
        <h2>已選擇的提示詞</h2>
        <div id="selected-prompts"></div>
        <button class="copy-btn" onclick="copyToClipboard()">複製提示詞</button>
    </div>

    <script>
        // 提示詞數據
        const promptData = {
            "appearance-features": [
                {en: "youthful", zh: "年輕"},
                {en: "handsome", zh: "英俊"},
                {en: "rugged", zh: "粗獷"},
                {en: "mature", zh: "成熟"},
                {en: "mixed heritage", zh: "混血"},
                {en: "sun-kissed complexion", zh: "陽光膚色"},
                {en: "tanned skin", zh: "古銅色皮膚"},
                {en: "fair skin", zh: "白皙皮膚"},
                {en: "dark skin", zh: "深色皮膚"},
                {en: "olive skin", zh: "橄欖色皮膚"},
                {en: "athletic", zh: "運動型"},
                {en: "muscular", zh: "肌肉發達"},
                {en: "tall", zh: "高大"},
                {en: "broad-shouldered", zh: "寬肩"},
                {en: "lean", zh: "瘦削"},
                {en: "fit", zh: "健美"},
                {en: "toned", zh: "結實"},
                {en: "youthful glow", zh: "年輕光澤"},
                {en: "healthy complexion", zh: "健康膚色"},
                {en: "masculine", zh: "陽剛"},
                {en: "chiseled features", zh: "輪廓分明"},
                {en: "sharp jawline", zh: "銳利下顎"},
                {en: "high cheekbones", zh: "高顴骨"},
                {en: "defined cheekbones", zh: "清晰顴骨"},
                {en: "symmetrical face", zh: "對稱臉型"},
                {en: "strong facial structure", zh: "強壯面部結構"},
                {en: "angular face", zh: "棱角分明"},
                {en: "square jaw", zh: "方形下巴"},
                {en: "prominent brow", zh: "突出眉骨"},
                {en: "deep-set eyes", zh: "深邃眼睛"},
                {en: "almond eyes", zh: "杏仁眼"},
                {en: "piercing eyes", zh: "銳利眼神"},
                {en: "intense gaze", zh: "強烈注視"},
                {en: "captivating eyes", zh: "迷人雙眼"},
                {en: "sparkling eyes", zh: "閃亮眼睛"},
                {en: "dark eyes", zh: "深色眼睛"},
                {en: "blue eyes", zh: "藍眼睛"},
                {en: "green eyes", zh: "綠眼睛"},
                {en: "hazel eyes", zh: "榛色眼睛"},
                {en: "brown eyes", zh: "棕色眼睛"},
                {en: "thick eyebrows", zh: "濃眉"},
                {en: "arched eyebrows", zh: "拱形眉"},
                {en: "full lips", zh: "飽滿嘴唇"},
                {en: "thin lips", zh: "薄唇"},
                {en: "seductive smirk", zh: "誘人微笑"},
                {en: "charming smile", zh: "迷人笑容"},
                {en: "perfect smile", zh: "完美笑容"},
                {en: "dimples", zh: "酒窩"},
                {en: "clean-shaven", zh: "乾淨剃鬚"},
                {en: "stubbled", zh: "短鬍渣"}
            ],
            "body-features": [
                {en: "sculpted physique", zh: "雕塑般體型"},
                {en: "chiseled physique", zh: "輪廓分明體型"},
                {en: "defined muscles", zh: "清晰肌肉"},
                {en: "washboard abs", zh: "平板腹肌"},
                {en: "six-pack abs", zh: "六塊腹肌"},
                {en: "eight-pack abs", zh: "八塊腹肌"},
                {en: "broad chest", zh: "寬闊胸膛"},
                {en: "powerful frame", zh: "強壯身軀"},
                {en: "beefy", zh: "健壯"},
                {en: "muscular arms", zh: "肌肉手臂"},
                {en: "strong arms", zh: "強壯手臂"},
                {en: "toned legs", zh: "結實腿部"},
                {en: "athletic build", zh: "運動體型"},
                {en: "V-shaped torso", zh: "V形身軀"},
                {en: "ripped", zh: "撕裂肌肉"},
                {en: "shredded", zh: "極瘦肌肉"},
                {en: "bulky", zh: "粗大體型"},
                {en: "lean muscle", zh: "精瘦肌肉"},
                {en: "vascular", zh: "血管突出"},
                {en: "prominent veins", zh: "明顯血管"},
                {en: "wide shoulders", zh: "寬肩膀"},
                {en: "narrow waist", zh: "窄腰"},
                {en: "Brazilian butt", zh: "巴西臀"},
                {en: "thick thighs", zh: "粗壯大腿"},
                {en: "strong calves", zh: "強壯小腿"},
                {en: "tall stature", zh: "高大身材"},
                {en: "imposing figure", zh: "威嚴身形"},
                {en: "well-proportioned", zh: "比例勻稱"},
                {en: "balanced physique", zh: "均衡體型"},
                {en: "athletic stance", zh: "運動姿態"},
                {en: "muscular back", zh: "肌肉背部"},
                {en: "defined obliques", zh: "清晰斜肌"},
                {en: "strong core", zh: "強壯核心"},
                {en: "powerful legs", zh: "強壯腿部"},
                {en: "toned biceps", zh: "結實二頭肌"},
                {en: "triceps definition", zh: "三頭肌定義"},
                {en: "shoulder definition", zh: "肩膀定義"},
                {en: "chest definition", zh: "胸部定義"},
                {en: "Adonis belt", zh: "阿多尼斯線"},
                {en: "Herculean build", zh: "赫拉克勒斯體型"},
                {en: "bodybuilder physique", zh: "健美身材"},
                {en: "fitness model", zh: "健身模特"},
                {en: "gym-ready", zh: "健身準備"},
                {en: "sculpted abs", zh: "雕塑腹肌"},
                {en: "chiseled torso", zh: "輪廓分明身軀"},
                {en: "muscular neck", zh: "肌肉頸部"},
                {en: "strong jawline", zh: "強壯下顎"},
                {en: "defined collarbone", zh: "清晰鎖骨"},
                {en: "athletic proportions", zh: "運動比例"},
                {en: "powerful presence", zh: "強大氣場"}
            ],
            "facial-features": [
                {en: "smooth skin", zh: "光滑皮膚"},
                {en: "wrinkle-free", zh: "無皺紋"},
                {en: "youthful cheeks", zh: "年輕臉頰"},
                {en: "sharp features", zh: "銳利特徵"},
                {en: "defined features", zh: "清晰特徵"},
                {en: "flawless complexion", zh: "無瑕膚色"},
                {en: "natural texture", zh: "自然質感"},
                {en: "healthy glow", zh: "健康光澤"},
                {en: "vibrant skin", zh: "活力皮膚"},
                {en: "radiant complexion", zh: "光彩膚色"},
                {en: "full beard", zh: "濃密鬍子"},
                {en: "neat beard", zh: "整齊鬍子"},
                {en: "short beard", zh: "短鬍子"},
                {en: "goatee", zh: "山羊鬍"},
                {en: "mustache", zh: "八字鬍"},
                {en: "sideburns", zh: "鬢角"},
                {en: "facial hair", zh: "面部毛髮"},
                {en: "shaved", zh: "剃鬚"},
                {en: "stubble", zh: "鬍渣"},
                {en: "rugged stubble", zh: "粗獷鬍渣"},
                {en: "thick hair", zh: "濃密頭髮"},
                {en: "short hair", zh: "短髮"},
                {en: "long hair", zh: "長髮"},
                {en: "messy hair", zh: "凌亂頭髮"},
                {en: "slicked-back hair", zh: "後梳頭髮"},
                {en: "undercut", zh: "底削髮型"},
                {en: "fade haircut", zh: "漸層髮型"},
                {en: "buzz cut", zh: "平頭"},
                {en: "curly hair", zh: "捲髮"},
                {en: "straight hair", zh: "直髮"},
                {en: "wavy hair", zh: "波浪髮"},
                {en: "black hair", zh: "黑髮"},
                {en: "brown hair", zh: "棕髮"},
                {en: "blonde hair", zh: "金髮"},
                {en: "dark hair", zh: "深色頭髮"},
                {en: "light hair", zh: "淺色頭髮"},
                {en: "gray hair", zh: "灰髮"},
                {en: "silver hair", zh: "銀髮"},
                {en: "bald", zh: "禿頭"},
                {en: "receding hairline", zh: "髮線後退"},
                {en: "high forehead", zh: "高額頭"},
                {en: "prominent nose", zh: "突出鼻子"},
                {en: "straight nose", zh: "直鼻"},
                {en: "Roman nose", zh: "羅馬鼻"},
                {en: "small nose", zh: "小鼻子"},
                {en: "wide nose", zh: "寬鼻子"},
                {en: "freckles", zh: "雀斑"},
                {en: "scars", zh: "疤痕"},
                {en: "facial tattoos", zh: "面部刺青"},
                {en: "piercing", zh: "穿孔"}
            ],
            "temperament-expression": [
                {en: "confident", zh: "自信"},
                {en: "charismatic", zh: "有魅力"},
                {en: "charming", zh: "迷人"},
                {en: "intense", zh: "強烈"},
                {en: "brooding", zh: "沉思"},
                {en: "serious", zh: "嚴肅"},
                {en: "playful", zh: "俏皮"},
                {en: "mysterious", zh: "神秘"},
                {en: "seductive", zh: "誘惑"},
                {en: "approachable", zh: "平易近人"},
                {en: "friendly", zh: "友善"},
                {en: "stoic", zh: "冷靜"},
                {en: "determined", zh: "堅定"},
                {en: "contemplative", zh: "深思"},
                {en: "thoughtful", zh: "體貼"},
                {en: "assertive", zh: "果斷"},
                {en: "bold", zh: "大膽"},
                {en: "calm", zh: "平靜"},
                {en: "relaxed", zh: "放鬆"},
                {en: "focused", zh: "專注"},
                {en: "fierce", zh: "兇猛"},
                {en: "gentle", zh: "溫和"},
                {en: "warm", zh: "溫暖"},
                {en: "cool", zh: "冷酷"},
                {en: "edgy", zh: "前衛"},
                {en: "rebellious", zh: "叛逆"},
                {en: "sophisticated", zh: "成熟老練"},
                {en: "elegant", zh: "優雅"},
                {en: "rugged charm", zh: "粗獷魅力"},
                {en: "boyish charm", zh: "少年魅力"},
                {en: "mature charm", zh: "成熟魅力"},
                {en: "confident smirk", zh: "自信微笑"},
                {en: "intense stare", zh: "強烈凝視"},
                {en: "warm smile", zh: "溫暖笑容"},
                {en: "mischievous grin", zh: "淘氣笑容"},
                {en: "stern expression", zh: "嚴肅表情"},
                {en: "soft expression", zh: "柔和表情"},
                {en: "dreamy look", zh: "夢幻表情"},
                {en: "piercing look", zh: "銳利眼神"},
                {en: "confident gaze", zh: "自信注視"},
                {en: "shy smile", zh: "害羞笑容"},
                {en: "bold expression", zh: "大膽表情"},
                {en: "relaxed demeanor", zh: "輕鬆舉止"},
                {en: "powerful aura", zh: "強大氣場"},
                {en: "magnetic presence", zh: "磁性存在"},
                {en: "captivating charm", zh: "迷人魅力"},
                {en: "youthful energy", zh: "年輕活力"},
                {en: "mature wisdom", zh: "成熟智慧"},
                {en: "adventurous spirit", zh: "冒險精神"},
                {en: "commanding presence", zh: "威嚴存在"}
            ],
            "clothing-style": [
                {en: "casual", zh: "休閒"},
                {en: "formal", zh: "正式"},
                {en: "suit aesthetics", zh: "西裝美學"},
                {en: "tailored suit", zh: "訂製西裝"},
                {en: "tuxedo", zh: "燕尾服"},
                {en: "leather jacket", zh: "皮夾克"},
                {en: "denim jacket", zh: "牛仔夾克"},
                {en: "bomber jacket", zh: "飛行夾克"},
                {en: "trench coat", zh: "風衣"},
                {en: "white shirt", zh: "白襯衫"},
                {en: "black shirt", zh: "黑襯衫"},
                {en: "open shirt", zh: "敞開襯衫"},
                {en: "rolled sleeves", zh: "捲袖"},
                {en: "tight jeans", zh: "緊身牛仔褲"},
                {en: "cargo pants", zh: "工裝褲"},
                {en: "athletic wear", zh: "運動服"},
                {en: "gym clothes", zh: "健身服"},
                {en: "swim trunks", zh: "泳褲"},
                {en: "briefs", zh: "三角褲"},
                {en: "boxer briefs", zh: "四角褲"},
                {en: "speedo", zh: "緊身泳褲"},
                {en: "tank top", zh: "背心"},
                {en: "muscle tee", zh: "肌肉T恤"},
                {en: "hoodie", zh: "連帽衫"},
                {en: "streetwear", zh: "街頭服飾"},
                {en: "hip-hop style", zh: "嘻哈風格"},
                {en: "punk style", zh: "朋克風格"},
                {en: "grunge fashion", zh: "頹廢時尚"},
                {en: "preppy style", zh: "學院風格"},
                {en: "vintage look", zh: "復古造型"},
                {en: "retro style", zh: "懷舊風格"},
                {en: "modern fashion", zh: "現代時尚"},
                {en: "minimalist style", zh: "極簡風格"},
                {en: "bohemian style", zh: "波西米亞風格"},
                {en: "military uniform", zh: "軍裝"},
                {en: "medieval armor", zh: "中世紀盔甲"},
                {en: "futuristic outfit", zh: "未來服裝"},
                {en: "cyberpunk gear", zh: "賽博朋克裝備"},
                {en: "traditional attire", zh: "傳統服飾"},
                {en: "cultural clothing", zh: "文化服裝"},
                {en: "tribal patterns", zh: "部落圖案"},
                {en: "floral shirt", zh: "花襯衫"},
                {en: "plaid shirt", zh: "格子襯衫"},
                {en: "striped shirt", zh: "條紋襯衫"},
                {en: "sneakers", zh: "運動鞋"},
                {en: "boots", zh: "靴子"},
                {en: "dress shoes", zh: "皮鞋"},
                {en: "watch", zh: "手錶"},
                {en: "sunglasses", zh: "太陽鏡"},
                {en: "tattoos", zh: "刺青"}
            ],
            "pose-action": [
                {en: "standing", zh: "站立"},
                {en: "sitting", zh: "坐著"},
                {en: "leaning", zh: "倚靠"},
                {en: "walking", zh: "行走"},
                {en: "running", zh: "跑步"},
                {en: "jumping", zh: "跳躍"},
                {en: "crouching", zh: "蹲下"},
                {en: "kneeling", zh: "跪著"},
                {en: "arms crossed", zh: "雙臂交叉"},
                {en: "hands on hips", zh: "雙手叉腰"},
                {en: "hands in pockets", zh: "雙手插兜"},
                {en: "pointing", zh: "指向"},
                {en: "flexing", zh: "展示肌肉"},
                {en: "striking poses", zh: "擺姿勢"},
                {en: "dynamic pose", zh: "動態姿勢"},
                {en: "relaxed pose", zh: "放鬆姿勢"},
                {en: "confident stance", zh: "自信站姿"},
                {en: "casual stance", zh: "隨意站姿"},
                {en: "powerful stance", zh: "強勢站姿"},
                {en: "side profile", zh: "側面輪廓"},
                {en: "three-quarter pose", zh: "三分之二姿勢"},
                {en: "frontal view", zh: "正面視角"},
                {en: "looking away", zh: "看向遠方"},
                {en: "gazing into distance", zh: "凝視遠處"},
                {en: "looking up", zh: "向上看"},
                {en: "looking down", zh: "向下看"},
                {en: "head tilted", zh: "頭部傾斜"},
                {en: "arms raised", zh: "雙臂舉起"},
                {en: "hands behind head", zh: "雙手置於頭後"},
                {en: "leaning against wall", zh: "靠牆"},
                {en: "sitting on edge", zh: "坐在邊緣"},
                {en: "standing tall", zh: "挺拔站立"},
                {en: "walking confidently", zh: "自信行走"},
                {en: "running dynamically", zh: "動態跑步"},
                {en: "jumping mid-air", zh: "空中跳躍"},
                {en: "crouching low", zh: "低蹲"},
                {en: "kneeling gracefully", zh: "優雅跪姿"},
                {en: "flexing biceps", zh: "展示二頭肌"},
                {en: "showing off abs", zh: "展示腹肌"},
                {en: "dynamic action", zh: "動態動作"},
                {en: "holding object", zh: "持物"},
                {en: "lifting weights", zh: "舉重"},
                {en: "boxing stance", zh: "拳擊姿勢"},
                {en: "martial arts pose", zh: "武術姿勢"},
                {en: "dancing", zh: "跳舞"},
                {en: "stretching", zh: "伸展"},
                {en: "meditating", zh: "冥想"},
                {en: "yoga pose", zh: "瑜伽姿勢"},
                {en: "surfing", zh: "衝浪"},
                {en: "swimming", zh: "游泳"}
            ],
            "background-environment": [
                {en: "studio background", zh: "攝影棚背景"},
                {en: "neutral background", zh: "中性背景"},
                {en: "white background", zh: "白色背景"},
                {en: "black background", zh: "黑色背景"},
                {en: "forest", zh: "森林"},
                {en: "beach", zh: "海灘"},
                {en: "ocean", zh: "海洋"},
                {en: "desert", zh: "沙漠"},
                {en: "mountains", zh: "山脈"},
                {en: "cityscape", zh: "城市景觀"},
                {en: "urban setting", zh: "城市環境"},
                {en: "rooftop", zh: "屋頂"},
                {en: "gym", zh: "健身房"},
                {en: "bathroom", zh: "浴室"},
                {en: "hot tub", zh: "熱水浴缸"},
                {en: "poolside", zh: "池邊"},
                {en: "garden", zh: "花園"},
                {en: "park", zh: "公園"},
                {en: "sunset", zh: "日落"},
                {en: "sunrise", zh: "日出"},
                {en: "golden hour", zh: "黃金時段"},
                {en: "night sky", zh: "夜空"},
                {en: "starry sky", zh: "星空"},
                {en: "rainy day", zh: "雨天"},
                {en: "snowy landscape", zh: "雪景"},
                {en: "foggy atmosphere", zh: "霧氣氛圍"},
                {en: "tropical island", zh: "熱帶島嶼"},
                {en: "modern apartment", zh: "現代公寓"},
                {en: "luxury mansion", zh: "豪華別墅"},
                {en: "rustic cabin", zh: "鄉村小屋"},
                {en: "medieval castle", zh: "中世紀城堡"},
                {en: "futuristic city", zh: "未來城市"},
                {en: "cyberpunk street", zh: "賽博朋克街道"},
                {en: "ancient ruins", zh: "古老遺跡"},
                {en: "art gallery", zh: "藝術畫廊"},
                {en: "busy street", zh: "繁忙街道"},
                {en: "quiet alley", zh: "安靜巷弄"},
                {en: "serene lake", zh: "平靜湖泊"},
                {en: "waterfall", zh: "瀑布"},
                {en: "cliffside", zh: "懸崖邊"},
                {en: "space station", zh: "太空站"},
                {en: "underwater", zh: "水下"},
                {en: "volcanic landscape", zh: "火山景觀"},
                {en: "autumn forest", zh: "秋天森林"},
                {en: "spring meadow", zh: "春天草地"},
                {en: "winter forest", zh: "冬天森林"},
                {en: "summer beach", zh: "夏天海灘"},
                {en: "industrial warehouse", zh: "工業倉庫"},
                {en: "vintage room", zh: "復古房間"},
                {en: "minimalist space", zh: "極簡空間"}
            ],
            "photography-art-style": [
                {en: "photorealistic", zh: "寫實"},
                {en: "hyperrealistic", zh: "超現實"},
                {en: "realistic", zh: "真實"},
                {en: "cinematic", zh: "電影感"},
                {en: "dramatic lighting", zh: "戲劇性照明"},
                {en: "soft lighting", zh: "柔和照明"},
                {en: "natural light", zh: "自然光"},
                {en: "studio lighting", zh: "攝影棚照明"},
                {en: "golden hour lighting", zh: "黃金時段照明"},
                {en: "moody lighting", zh: "情緒照明"},
                {en: "low light", zh: "低光"},
                {en: "high contrast", zh: "高對比"},
                {en: "warm tones", zh: "暖色調"},
                {en: "cool tones", zh: "冷色調"},
                {en: "black and white", zh: "黑白"},
                {en: "sepia tone", zh: "褐色調"},
                {en: "vibrant colors", zh: "鮮艷色彩"},
                {en: "pastel colors", zh: "柔和色彩"},
                {en: "neon lighting", zh: "霓虹照明"},
                {en: "chiaroscuro", zh: "明暗對比"},
                {en: "shallow depth of field", zh: "淺景深"},
                {en: "deep depth of field", zh: "深景深"},
                {en: "bokeh effect", zh: "虛化效果"},
                {en: "lens flare", zh: "鏡頭光暈"},
                {en: "anamorphic lens", zh: "變形鏡頭"},
                {en: "wide-angle lens", zh: "廣角鏡頭"},
                {en: "telephoto lens", zh: "遠攝鏡頭"},
                {en: "85mm lens", zh: "85毫米鏡頭"},
                {en: "50mm lens", zh: "50毫米鏡頭"},
                {en: "35mm lens", zh: "35毫米鏡頭"},
                {en: "f1.8 aperture", zh: "f1.8光圈"},
                {en: "f2.8 aperture", zh: "f2.8光圈"},
                {en: "ISO 200", zh: "ISO 200"},
                {en: "4K resolution", zh: "4K解析度"},
                {en: "8K resolution", zh: "8K解析度"},
                {en: "high detail", zh: "高細節"},
                {en: "intricate details", zh: "複雜細節"},
                {en: "sharp focus", zh: "銳利焦點"},
                {en: "smooth texture", zh: "平滑質感"},
                {en: "digital art", zh: "數位藝術"},
                {en: "oil painting", zh: "油畫"},
                {en: "watercolor", zh: "水彩"},
                {en: "sketch", zh: "素描"},
                {en: "illustration", zh: "插圖"},
                {en: "3D render", zh: "3D渲染"},
                {en: "concept art", zh: "概念藝術"},
                {en: "surrealism", zh: "超現實主義"},
                {en: "neo-expressionism", zh: "新表現主義"},
                {en: "retro style", zh: "復古風格"},
                {en: "vintage look", zh: "懷舊外觀"}
            ],
            "additional-details": [
                {en: "detailed tattoos", zh: "詳細刺青"},
                {en: "intricate tattoos", zh: "複雜刺青"},
                {en: "tribal tattoos", zh: "部落刺青"},
                {en: "geometric tattoos", zh: "幾何刺青"},
                {en: "realistic tattoos", zh: "真實刺青"},
                {en: "wet skin", zh: "濕潤皮膚"},
                {en: "sweaty skin", zh: "出汗皮膚"},
                {en: "oiled skin", zh: "油光皮膚"},
                {en: "glowing skin", zh: "發光皮膚"},
                {en: "dewy skin", zh: "水潤皮膚"},
                {en: "natural texture", zh: "自然質感"},
                {en: "fine details", zh: "精細細節"},
                {en: "ultra-detailed", zh: "超詳細"},
                {en: "hyper-detailed", zh: "極詳細"},
                {en: "highly detailed", zh: "高詳細"},
                {en: "realistic shadows", zh: "真實陰影"},
                {en: "soft shadows", zh: "柔和陰影"},
                {en: "dramatic shadows", zh: "戲劇性陰影"},
                {en: "volumetric lighting", zh: "體積照明"},
                {en: "rim lighting", zh: "輪廓照明"},
                {en: "backlighting", zh: "背光"},
                {en: "side lighting", zh: "側光"},
                {en: "front lighting", zh: "前光"},
                {en: "LED lighting", zh: "LED照明"},
                {en: "fluorescent light", zh: "螢光燈"},
                {en: "incandescent light", zh: "白熾燈"},
                {en: "hazy atmosphere", zh: "朦朧氛圍"},
                {en: "misty background", zh: "迷霧背景"},
                {en: "smoky atmosphere", zh: "煙霧氛圍"},
                {en: "cinematic composition", zh: "電影構圖"},
                {en: "rule of thirds", zh: "三分法則"},
                {en: "symmetrical composition", zh: "對稱構圖"},
                {en: "dynamic composition", zh: "動態構圖"},
                {en: "balanced composition", zh: "平衡構圖"},
                {en: "minimalistic", zh: "極簡主義"},
                {en: "maximalist", zh: "極繁主義"},
                {en: "textured background", zh: "紋理背景"},
                {en: "smooth background", zh: "平滑背景"},
                {en: "gradient background", zh: "漸層背景"},
                {en: "colorful background", zh: "彩色背景"},
                {en: "monochrome", zh: "單色"},
                {en: "high saturation", zh: "高飽和度"},
                {en: "low saturation", zh: "低飽和度"},
                {en: "film grain", zh: "膠片顆粒"},
                {en: "vintage filter", zh: "復古濾鏡"},
                {en: "modern aesthetic", zh: "現代美學"},
                {en: "futuristic aesthetic", zh: "未來美學"},
                {en: "fantasy aesthetic", zh: "奇幻美學"},
                {en: "realistic rendering", zh: "真實渲染"},
                {en: "octane render", zh: "八度渲染"}
            ],
            "cultural-professional": [
                {en: "warrior", zh: "戰士"},
                {en: "soldier", zh: "士兵"},
                {en: "knight", zh: "騎士"},
                {en: "samurai", zh: "武士"},
                {en: "Viking", zh: "維京人"},
                {en: "Maori warrior", zh: "毛利戰士"},
                {en: "tribal chief", zh: "部落首領"},
                {en: "rock star", zh: "搖滾明星"},
                {en: "businessman", zh: "商人"},
                {en: "athlete", zh: "運動員"},
                {en: "fitness trainer", zh: "健身教練"},
                {en: "model", zh: "模特"},
                {en: "actor", zh: "演員"},
                {en: "photographer", zh: "攝影師"},
                {en: "artist", zh: "藝術家"},
                {en: "chef", zh: "廚師"},
                {en: "doctor", zh: "醫生"},
                {en: "firefighter", zh: "消防員"},
                {en: "pilot", zh: "飛行員"},
                {en: "astronaut", zh: "太空人"},
                {en: "cowboy", zh: "牛仔"},
                {en: "pirate", zh: "海盜"},
                {en: "king", zh: "國王"},
                {en: "prince", zh: "王子"},
                {en: "nomad", zh: "遊牧民"},
                {en: "explorer", zh: "探險家"},
                {en: "adventurer", zh: "冒險者"},
                {en: "surfer", zh: "衝浪者"},
                {en: "skateboarder", zh: "滑板手"},
                {en: "biker", zh: "機車手"},
                {en: "martial artist", zh: "武術家"},
                {en: "boxer", zh: "拳擊手"},
                {en: "wrestler", zh: "摔跤手"},
                {en: "dancer", zh: "舞者"},
                {en: "musician", zh: "音樂家"},
                {en: "guitarist", zh: "吉他手"},
                {en: "drummer", zh: "鼓手"},
                {en: "singer", zh: "歌手"},
                {en: "poet", zh: "詩人"},
                {en: "writer", zh: "作家"}
            ],
            "emotional-scene": [
                {en: "heroic", zh: "英雄氣概"},
                {en: "epic", zh: "史詩感"},
                {en: "romantic", zh: "浪漫"},
                {en: "melancholic", zh: "憂鬱"},
                {en: "hopeful", zh: "充滿希望"},
                {en: "nostalgic", zh: "懷舊"},
                {en: "adventurous", zh: "冒險"},
                {en: "intense moment", zh: "緊張時刻"},
                {en: "serene moment", zh: "平靜時刻"},
                {en: "dramatic scene", zh: "戲劇場景"}
            ]
        };

        // 初始化頁面
        document.addEventListener('DOMContentLoaded', function() {
            // 為每個類別生成提示詞
            for (const category in promptData) {
                const container = document.getElementById(category);
                promptData[category].forEach(prompt => {
                    const div = document.createElement('div');
                    div.className = 'prompt-item';
                    div.innerHTML = `
                        <input type="checkbox" id="${prompt.en.replace(/\s+/g, '-')}" 
                               data-en="${prompt.en}" data-zh="${prompt.zh}" 
                               onchange="updateSelectedPrompts()">
                        <label for="${prompt.en.replace(/\s+/g, '-')}">
                            ${prompt.en} (${prompt.zh})
                        </label>
                    `;
                    container.appendChild(div);
                });
            }
        });

        // 更新已選擇的提示詞
        function updateSelectedPrompts() {
            const selectedPrompts = [];
            const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            
            checkboxes.forEach(checkbox => {
                selectedPrompts.push(checkbox.dataset.en);
            });
            
            document.getElementById('selected-prompts').textContent = selectedPrompts.join(', ');
            document.getElementById('count').textContent = checkboxes.length;
        }

        // 複製到剪貼板
        function copyToClipboard() {
            const selectedPrompts = document.getElementById('selected-prompts').textContent;
            navigator.clipboard.writeText(selectedPrompts)
                .then(() => alert('提示詞已複製到剪貼板!'))
                .catch(err => console.error('無法複製: ', err));
        }

        // 過濾提示詞
        function filterPrompts() {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const promptItems = document.querySelectorAll('.prompt-item');
            
            promptItems.forEach(item => {
                const label = item.textContent.toLowerCase();
                if (label.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // 全選
        function selectAll() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            updateSelectedPrompts();
        }

        // 取消全選
        function deselectAll() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            updateSelectedPrompts();
        }
    </script>
</body>
</html>

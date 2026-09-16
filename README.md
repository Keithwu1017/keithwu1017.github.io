# HTML5 Homework：自我介紹網頁、GitHub Pages、Docker

這份作業已包含：

- 自我介紹網頁：姓名、自介、代表圖片、興趣／專長、外部連結、CSS 排版。
- JavaScript 小功能：深淺色切換、記住偏好、自動更新頁尾年份。
- GitHub Pages 部署說明。
- Docker 網站映像與 Jupyter Compose 設定。

## 一、先把示範資料換成自己的內容

用文字編輯器開啟 `index.html`，搜尋並替換：

1. `你的名字`：一共有數處，全部換成自己的姓名。
2. 自我介紹：修改 `hero-intro` 與「關於我」段落。
3. 興趣／專長：修改三張 `interest-card` 的標題、說明與標籤。
4. 外部連結：把 `https://github.com/`、Instagram、YouTube 網址換成自己的個人頁面。
5. 個人照片：把照片放進此資料夾，例如命名為 `photo.jpg`，再把：

   ```html
   <img src="avatar.svg" alt="你的名字的代表圖片；請替換成自己的照片" />
   ```

   改成：

   ```html
   <img src="photo.jpg" alt="你的名字的個人照片" />
   ```

也要把 `<title>你的名字｜個人網站</title>` 改掉，瀏覽器分頁才會顯示正確姓名。

## 二、三個檔案如何一起工作

### `index.html`：內容與結構

HTML 像房子的骨架。`header` 是導覽列，`main` 放主要內容，`section` 將內容分成首頁、關於我、興趣與聯絡方式。標題使用 `h1`、`h2`、`h3`，段落使用 `p`，連結使用 `a`，圖片使用 `img`。

HTML 的 `<head>` 內用下面兩行載入 CSS 與 JavaScript：

```html
<link rel="stylesheet" href="style.css" />
<script src="script.js" defer></script>
```

`defer` 代表先解析 HTML，再執行 JavaScript，避免程式找不到尚未建立的按鈕。

### `style.css`：外觀與排版

CSS 像房子的裝潢。`--bg`、`--text`、`--accent` 等變數集中管理顏色；Grid 負責左右欄與卡片排列；`@media` 在螢幕較窄時改成單欄，所以手機也能閱讀。

例如：

```css
.interest-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

表示桌面版把三張興趣卡排成三欄。到了 `800px` 以下，媒體查詢將它改成一欄。

### `script.js`：互動功能

JavaScript 監聽右上角主題按鈕。按下時切換 `data-theme="light"` 或 `dark`，CSS 再依這個屬性換顏色。選擇會存進 `localStorage`，重新整理後仍保留。頁尾年份則由 `new Date().getFullYear()` 自動取得。

## 三、在電腦上預覽

最簡單的方法是直接雙擊 `index.html`。若已安裝 Python，也可以在此資料夾執行：

```bash
python -m http.server 8000
```

再開啟 `http://localhost:8000`。用本機伺服器預覽會比直接開檔更接近正式網站。

## 四、發布到 GitHub Pages

1. 登入 GitHub，建立新的 repository，例如 `html5-homework`。
2. 在此資料夾開啟終端機並依序執行：

   ```bash
   git init
   git add .
   git commit -m "Complete HTML5 self introduction homework"
   git branch -M main
   git remote add origin https://github.com/你的帳號/html5-homework.git
   git push -u origin main
   ```

3. 到 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選 `Deploy from a branch`。
5. Branch 選 `main`，資料夾選 `/(root)`，按 **Save**。
6. 等待約一到數分鐘後，網址會是：

   ```text
   https://你的帳號.github.io/html5-homework/
   ```

注意：GitHub Pages 首頁檔名必須是小寫的 `index.html`。

## 五、Docker 基本練習

### 常見指令

| 指令 | 用途 |
| --- | --- |
| `docker pull nginx:alpine` | 下載映像 |
| `docker images` | 查看本機映像 |
| `docker ps` | 查看執行中的容器 |
| `docker ps -a` | 查看所有容器 |
| `docker build -t intro-site .` | 依 Dockerfile 建立網站映像 |
| `docker run --name intro -p 8080:80 intro-site` | 啟動網站容器 |
| `docker stop intro` | 停止容器 |
| `docker start intro` | 再次啟動容器 |
| `docker logs intro` | 查看容器紀錄 |
| `docker exec -it intro sh` | 進入執行中的容器 |
| `docker rm intro` | 刪除已停止的容器 |
| `docker rmi intro-site` | 刪除映像 |

### 用 Docker 開啟網站

```bash
docker build -t intro-site .
docker run --name intro -p 8080:80 intro-site
```

瀏覽器開啟 `http://localhost:8080`。結束時按 `Ctrl + C`；若容器仍存在，可執行 `docker rm intro` 後再重建。

### 用 Docker Compose 同時開網站與 Jupyter

此資料夾已提供 `compose.yaml`：

```bash
docker compose up --build
```

- 網站：`http://localhost:8080`
- Jupyter：查看終端機輸出的 `http://127.0.0.1:8888/lab?token=...`，將完整網址貼到瀏覽器。

背景執行與查看紀錄：

```bash
docker compose up -d --build
docker compose logs jupyter
```

停止並移除這次 Compose 建立的容器與網路：

```bash
docker compose down
```

`notebooks` 資料夾會掛載到 Jupyter 的工作區，因此 Notebook 檔案會保留在電腦上。

## 六、交作業前檢查

- [ ] 姓名、介紹、興趣都是自己的資料。
- [ ] 代表圖片已替換，且圖片路徑大小寫正確。
- [ ] GitHub／Instagram／YouTube 連結是自己的網址。
- [ ] 手機與桌面寬度都沒有水平捲動。
- [ ] GitHub Pages 網址可以在無痕視窗正常開啟。
- [ ] 能說明 `docker build`、`run`、`ps`、`stop`、`rm` 的差異。
- [ ] 能從 `docker compose logs jupyter` 找到 Jupyter token 網址。

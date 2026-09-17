# Ta-I Wu 個人網站

這是一個單頁式個人網站，內容已依照 Ta-I Wu 的履歷整理完成，包含：

- 個人簡介與畢業照
- 成大資工碩士、台大農化學士的教育背景
- 機器學習、全端開發與材料研究經歷
- 程式、資料分析、實驗與語言能力
- Email、LinkedIn、GitHub 與 PDF 履歷連結
- 滑鼠懸停／點擊切換內容、鍵盤操作與深淺色模式

## 檔案說明

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 網頁內容與語意結構 |
| `style.css` | 版面、色彩、響應式設計 |
| `script.js` | 頁籤預覽、鍵盤操作、主題切換 |
| `profile-photo.jpg` | 首頁個人照片 |
| `resume.html`、`resume-preview.png` | 跨瀏覽器相容的履歷預覽頁 |
| `Ta-I_Wu_Resume.pdf` | 提供訪客開啟或下載的原始履歷 |
| `Dockerfile`、`compose.yaml` | Docker 與 Jupyter 練習環境 |

## 履歷入口

網站在三個位置提供履歷連結：頁首的 `RESUME`、個人簡介下方的 `View Resume`，以及 `Contact` 頁籤中的 `Resume`。三處都會開啟 `resume.html`，訪客可在預覽頁閱讀履歷，或開啟／下載原始 PDF。

若要更新履歷，只要用新版 PDF 覆蓋同名檔案即可，不必修改 HTML。

## 本機預覽

在此資料夾執行：

```bash
python -m http.server 8000
```

接著開啟 `http://localhost:8000`。

## 發布到 GitHub Pages

1. 將修改提交並推送到 GitHub repository。
2. 前往 **Settings → Pages**。
3. 在 **Build and deployment** 選擇 `Deploy from a branch`。
4. Branch 選擇 `main`，資料夾選擇 `/(root)`，再按 **Save**。

此專案發布於 `https://github.com/Keithwu1017/keithwu1017.github.io`，公開網址為 `https://keithwu1017.github.io/`。發布完成後，訪客即可直接從網站開啟 PDF 履歷。

## Docker 預覽

```bash
docker build -t intro-site .
docker run --name intro -p 8080:80 intro-site
```

瀏覽器開啟 `http://localhost:8080`。Docker 映像已包含網頁、照片與 PDF 履歷。

使用 Compose 同時啟動網站與 Jupyter：

```bash
docker compose up --build
```

- 網站：`http://localhost:8080`
- Jupyter：依終端機顯示的 token 網址開啟

## 發布前檢查

- [ ] 個人資料、學歷與技能內容正確
- [ ] PDF 履歷能從三個入口開啟
- [ ] Email、LinkedIn、GitHub 連結正確
- [ ] 手機與桌面版都沒有水平捲動
- [ ] GitHub Pages 可在無痕視窗開啟

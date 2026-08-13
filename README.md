# KO YUNJI — Personal Archive / Portfolio

고윤지의 **Marketing / Art Direction / Art & Culture** 활동을 장기적으로 축적하기 위한 정적 웹사이트입니다.

## 기술

- HTML
- CSS
- Vanilla JavaScript
- JSON
- Markdown
- GitHub Pages

별도의 서버나 데이터베이스가 필요하지 않습니다.

## 실행

브라우저에서 `index.html`을 직접 열면 `fetch()` 보안 정책 때문에 JSON이 로드되지 않을 수 있습니다.

로컬 서버를 실행하세요.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속.

## GitHub에 올리기

```bash
git init
git add .
git commit -m "Initial portfolio archive"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## GitHub Pages

1. GitHub 저장소의 **Settings**
2. **Pages**
3. Source를 **Deploy from a branch**
4. Branch `main`, Folder `/ (root)`
5. 저장

## 콘텐츠 수정

웹사이트에서 읽는 핵심 데이터: `data/site-data.json`

세부 주제별 JSON도 함께 제공됩니다.

- `data/profile.json`
- `data/education.json`
- `data/career.json`
- `data/experience.json`
- `data/projects.json`
- `data/art.json`
- `data/writing.json`

## 이미지 추가

```text
assets/images/projects/my-project/
├── cover.jpg
├── 001.jpg
├── 002.jpg
└── detail-001.jpg
```

## 구조

자세한 설명: `docs/STRUCTURE.md`

# AKI — Archive Webzine

> "읽는 진"이 아니라 "쌓이는 진"

AKI는 매 호마다 하나의 질문을 중심으로, 글·사람·자료가 축적되는 미니멀 아카이브 웹진입니다.

---

## 📁 폴더 구조

```
aki/
│
├── index.html          ← 메인 홈페이지
├── styles.css          ← 전체 스타일 (수정 금지 권장)
├── script.js           ← 동적 기능 (태그 로드, 검색 등)
│
├── articles/           ← 기사 Markdown 파일
│   ├── article-001.md
│   ├── article-002.md
│   └── ...
│
├── people/             ← 필진/참여자 프로필
│   ├── person-001.md
│   └── ...
│
├── archive/            ← 아카이브 자료
│   ├── pdf/            ← PDF 파일 저장
│   └── images/         ← 아카이브 이미지 저장
│
├── assets/             ← 사이트 자산
│   ├── images/         ← 기사 커버, 인물 사진 등
│   └── fonts/          ← 로컬 폰트 (필요 시)
│
└── data/
    ├── tags.json       ← 태그 목록 (태그 추가 시 여기에 작성)
    └── articles.json   ← 기사 인덱스 (새 글 추가 시 여기에도 등록)
```

---

## ✍️ 새 기사 추가하는 방법 (초보자용)

### Step 1 — Markdown 파일 만들기

`articles/` 폴더 안에 새 파일을 만드세요.
파일명 규칙: `article-번호.md` (예: `article-011.md`)

### Step 2 — Front Matter 작성

파일 맨 위에 아래 형식으로 메타데이터를 작성하세요.
`---` 사이에 있는 부분이 Front Matter입니다.

```yaml
---
title: "기사 제목을 여기에 씁니다"
slug: article-011
author: 홍길동
date: 2026-04-01
issue: "01"
category: FASHION
tags:
  - fashion
  - trend
summary: "한 줄 요약을 여기에 씁니다. 검색 결과와 카드에 표시됩니다."
cover: /assets/images/article-011-cover.jpg
related:
  - article-001
  - article-003
---
```

| 항목 | 설명 |
|------|------|
| `title` | 기사 제목 (따옴표 안에) |
| `slug` | 파일명과 동일하게 (article-011) |
| `author` | 글쓴이 이름 |
| `date` | 발행일 (YYYY-MM-DD 형식) |
| `issue` | 호수 ("01", "02" 등 따옴표 포함) |
| `category` | 대문자로 (FASHION / CULTURE / ART / BRAND / STREET) |
| `tags` | 소문자, 복수 가능 |
| `summary` | 150자 이내 요약 |
| `cover` | 커버 이미지 경로 |
| `related` | 관련 기사 slug 목록 |

### Step 3 — 본문 작성

Front Matter 아래에 Markdown으로 본문을 씁니다.

```markdown
## 들어가며

여기에 도입 문단을 작성합니다.

## 1. 소제목

본문 내용을 씁니다.

> 인용하고 싶은 문장은 > 로 시작합니다.

## 마치며

마무리 문단을 씁니다.
```

**Markdown 기본 문법:**

| 문법 | 결과 |
|------|------|
| `## 제목` | 소제목 (H2) |
| `### 소소제목` | 소소제목 (H3) |
| `**굵게**` | **굵게** |
| `*기울임*` | *기울임* |
| `> 인용` | 인용 블록 |
| `---` | 구분선 |
| `![설명](이미지경로)` | 이미지 삽입 |
| `[링크텍스트](URL)` | 링크 |

### Step 4 — 이미지 추가

커버 이미지는 `assets/images/` 폴더에 저장합니다.
파일명 규칙: `article-011-cover.jpg`
권장 크기: 1200×800px, JPG 또는 WebP

### Step 5 — articles.json 업데이트

`data/articles.json` 파일을 열고 맨 앞(또는 맨 뒤)에 새 항목을 추가하세요.

```json
{
  "slug": "article-011",
  "title": "기사 제목",
  "category": "FASHION",
  "author": "홍길동",
  "date": "2026-04-01",
  "issue": "01",
  "tags": ["fashion", "trend"],
  "summary": "한 줄 요약"
}
```

### Step 6 — GitHub에 올리기

```bash
git add .
git commit -m "Add article-011: 기사 제목"
git push origin main
```

GitHub Pages가 자동으로 배포합니다 (1~2분 소요).

---

## 👤 새 필진 추가하는 방법

`people/` 폴더에 `person-번호.md` 파일을 만드세요.

```yaml
---
name: "이름"
slug: person-002
role: "역할 (예: Fashion Writer)"
bio_short: "한 줄 소개"
bio: "상세 소개"
photo: /assets/images/person-002.jpg
articles:
  - article-011
social:
  instagram: "@handle"
  website: "https://example.com"
issue: "01"
tags:
  - fashion
---
```

---

## 🏷️ 태그 추가하는 방법

`data/tags.json`을 열고 태그를 추가하세요.

```json
{ "name": "새태그", "count": 1, "label_ko": "새태그 한국어" }
```

---

## 📄 카테고리 목록

| 영문 | 설명 |
|------|------|
| `FASHION` | 패션, 스타일, 의류 |
| `CULTURE` | 문화, 사회, 일상 |
| `ART` | 미술, 사진, 영상 |
| `EXHIBITION` | 전시, 공연, 이벤트 |
| `BRAND` | 브랜드, 마케팅 |
| `STREET` | 스트릿컬처, 서브컬처 |

---

## 🌐 GitHub Pages 배포 설정

1. GitHub 저장소 → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` / `root`
4. Save → 몇 분 후 `https://yourusername.github.io/aki/` 에 배포됨

---

## 📌 파일명 규칙 요약

| 파일 종류 | 규칙 | 예시 |
|-----------|------|------|
| 기사 | `article-번호.md` | `article-011.md` |
| 필진 | `person-번호.md` | `person-004.md` |
| 커버 이미지 | `article-번호-cover.jpg` | `article-011-cover.jpg` |
| 인물 사진 | `person-번호.jpg` | `person-004.jpg` |

---

*AKI — 쌓이는 진 © 2026*

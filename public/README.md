# Pay it Forward — Corporate Site

株式会社 Pay it Forward のコーポレートサイト（HTML / CSS / JavaScript）。

[mostfun.jp](https://mostfun.jp/) の構造・テイストをベースに、[pay-it-forward-corporate.com](https://pay-it-forward-corporate.com/) のテキスト・コンセプトを反映して構築しています。

## 構成

```
.
├── index.html       # トップページ
├── recruit.html     # 採用情報サブページ（給与制度・募集要項・応募フロー等）
├── css/style.css    # スタイル一式（CSS変数でカラーパレット管理）
├── js/main.js       # スクロール演出 / ローディング / カウンタ等
└── assets/          # 画像等（必要に応じて追加）
```

### Recruit サブページ（recruit.html）

[mostfun.jp/recruit_full/](https://mostfun.jp/recruit_full/) の構成に倣い、[Pay it Forward PR TIMES リリース](https://prtimes.jp/main/html/rd/p/000000002.000178596.html) の実情報を反映:

- パンくず（Home › Recruit）
- ページヒーロー（背景画像 + ズームアニメ）
- 代表メッセージ（宮﨑 元成）
- Pay it Forward で働く 3つの理由
- 給与制度（10段階等級表 / 昇給実績3例）
- 募集要項テーブル
- 応募から内定までのフロー（5ステップ）
- 求める人物像（Giver / Major Leaguer / Dreamer）
- 応募 CTA（採用担当メール）

## セクション

1. **Hero** — メインコピー「食を通じて、日本のイケてる未来を創る。」 + 写真コラージュ + SINCEステッカー
2. **About / Intro** — 会社紹介 + ビジュアル写真2枚
3. **Movie** — 理念動画（YouTube埋込：`_uN5xWZHak0`、youtube-nocookie使用）
4. **Philosophy** — PURPOSE / MISSION / VISION / VALUE
5. **Business** — 4事業（各事業に写真）
6. **Brand** — 3店舗（カバー写真付き）
7. **Gallery** — 店舗の空気感ギャラリー（6枚 / モザイクレイアウト）
8. **Numbers** — 主要数値ハイライト
9. **Recruit** — 採用 + チーム写真
10. **Company** — 会社概要
11. **Contact** — お問い合わせCTA
12. **Footer**

### 画像について

写真は仮置きとして [Unsplash](https://unsplash.com/) のテーマ画像（マグロ・寿司・居酒屋・厨房・チーム等）を inline `style="background-image:url(...)"` で埋め込んでいます。
本番運用時は AI 生成画像や自社撮影写真に差し替えてください。差し替え箇所は `index.html` 内 `style="background-image:url(...)"` を grep してまとめて検索できます。

## カラーパレット

[pay-it-forward-corporate.com](https://pay-it-forward-corporate.com/) のメインカラーに準拠した白＋青ベース。

- コーポレートブルー `#00569f`
- ネイビー `#002e6e`
- ディープネイビー `#001b48`
- スカイブルー `#84d5ff`
- ペールブルー `#e8f7ff`
- ホワイト `#ffffff`

## 起動

ローカルで開く場合：

```bash
# 任意の静的サーバで配信
python -m http.server 8080
# → http://localhost:8080
```

もしくは `index.html` をブラウザで直接開いても動作します。

## カスタマイズ

- カラー・余白等は `css/style.css` 冒頭の `:root` 変数で一括変更できます。
- 数値・社名・店舗名等は `index.html` を編集してください。
- スクロール演出の対象は `js/main.js` の `revealSelectors` 配列で管理しています。

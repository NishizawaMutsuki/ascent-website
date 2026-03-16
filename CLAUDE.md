# Ascent Website

開業医専門ホームページ制作サービス「アセント」のウェブサイト。

## Tech Stack

- Next.js (App Router)
- TypeScript
- CSS (globals.css, hp/hp.css)

## gstack

このプロジェクトでは [gstack](https://github.com/garrytan/gstack) を導入済み。
ブラウザ操作（QA・動作確認）は `/browse` を標準のウェブブラウジング手段として使う。

### 使えるコマンド一覧

| コマンド | 役割 | 使いどころ |
|---------|------|-----------|
| `/plan-ceo-review` | CEO / 創業者視点 | 機能の方向性を問い直す。「本当にこれを作るべきか？」 |
| `/plan-eng-review` | エンジニアリングマネージャー | アーキテクチャ・データフロー・エッジケース・テスト設計 |
| `/review` | スタッフエンジニア | CIでは見つからない本番で壊れるバグを探す |
| `/ship` | リリースエンジニア | main同期 → テスト → push → PR作成を一発で |
| `/browse` | QAエンジニア（ブラウザ操作） | ヘッドレスChromeでページを開き、クリック・入力・スクショ・差分チェック |
| `/qa` | QA + 修正 | バグを見つけて修正し、再検証まで自動で回す |
| `/qa-only` | QAレポートのみ | コードは触らず、バグレポートだけ出す |
| `/retro` | エンジニアリングマネージャー | スプリント振り返り。良かった点・改善点・アクションアイテム |
| `/setup-browser-cookies` | セッション管理 | 実ブラウザのCookieをヘッドレスに取り込み、認証済みページをテスト |
| `/gstack-upgrade` | アップグレード | gstack自体を最新版に更新 |

### /browse の基本的な使い方

```bash
# ページを開く
$B goto http://localhost:3000/hp

# インタラクティブ要素を一覧（@e1, @e2... で参照可能）
$B snapshot -i

# スクリーンショット
$B screenshot /tmp/hp.png

# 操作して差分確認
$B click @e3
$B snapshot -D

# レスポンシブ確認（モバイル・タブレット・デスクトップ）
$B responsive /tmp/hp-layout
```

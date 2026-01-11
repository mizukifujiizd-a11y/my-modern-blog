---
title: "非エンジニアがM4 MacでNext.js 16ブログを作った全記録"
date: "2026-01-11"
excerpt: "数々のエラーを乗り越えて、Wix風のモダンなブログを自作するまでの道のりをまとめました。"
image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
---

## 1. はじめに
Next.js/Node.jsへの見識を深めるために、Next.jsでブログ作成に挑戦しました。
非エンジニアの私が、VSCodeとVercelを使ってどこまでできるか、その記録を残します。
・使用機器：Macbook M4
・Next/Nodeのバージョン：Next16/Node24
## 2. 直面したエラーと解決策
今回の開発では、Next.js 16という最新バージョンゆえの壁に何度もぶつかりました。
最新の Next.js 16 (Turbopack) と Tailwind CSS v4 を使い、今回構築した「Wix風ブログ」をゼロから作成する手順をまとめました。
一番苦労したのは、デザインが反映されず画像が巨大化した問題です。
最終的には、<span style="color:#191970;">tailwind.config.ts</span> を削除し、<span style="color:#191970;">globals.css</span>に直接 <span style="color:#191970;">@import "tailwindcss";</span>を書くという最新のスタイルに切り替えることで解決しました。
## 3. 開発環境のセットアップ
まずはMacのターミナルを開き、最新のNext.jsをインストールするところからスタートしました。
```bash
# プロジェクトの作成
npx create-next-app@latest my-modern-blog --typescript --tailwind --eslint
cd my-modern-blog
```
## 4. デザインの要：shadcn/uiの導入
Wixのような洗練されたカードデザインを実現するために、shadcn/ui を導入しました。
```bash
npx shadcn@latest init
npx shadcn@latest add card
```
## 5. ぶつかった最大の壁：Tailwind CSS v4 の仕様変更
今回一番苦労したのが、Next.js 16 と Tailwind CSS v4 の組み合わせです。 従来の tailwind.config.ts を使う方法ではデザインが反映されず、画像が画面いっぱいに巨大化する問題が発生しました。
### 解決策
・最新の仕様に合わせ、以下の手順で設定を刷新しました。
・tailwind.config.ts を削除。
・globals.css の冒頭に @import "tailwindcss"; を追記。
・postcss.config.mjs を最新の @tailwindcss/postcss を使う形に書き換え。
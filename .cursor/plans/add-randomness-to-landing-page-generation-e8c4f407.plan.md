<!-- e8c4f407-3b93-4444-808e-edbd0db991d9 dc26933d-cbd3-4283-98de-06e0c3b45290 -->
# Fix Vercel Image Display Issue

## 問題の分析

1. **パスの混在**: `brandData.ts`でimportと直接パスが混在
2. **ファイルの重複**: `public/images`と`src/assets/images`に画像が重複
3. **拡張子の不一致**: `nintendo.jpg`が`src/assets/images`にあるが、他は`.png`
4. **Vercel設定不足**: `vercel.json`に画像配信のrewrite設定がない

## 解決策

### 1. brandData.tsを修正

- すべてのimport文を削除
- すべての画像を`/images/`パスで直接参照（public/imagesを使用）
- Nintendo以外の画像は既にpublicにあるので問題なし

### 2. vercel.jsonを修正

- `/images/`パスへのリクエストをindex.htmlにrewriteしないように設定
- 画像ファイルのキャッシュヘッダーを設定

### 3. src/assets/imagesを削除

- 不要なディレクトリとファイルを削除
- publicディレクトリのみを使用

### 4. vite-env.d.tsから画像型定義を削除

- importを使わないので不要

## 実装手順

### ステップ1: brandData.tsの修正

```typescript
import { BrandDesign } from '../types/preferences';

export const brandDesigns: BrandDesign[] = [
  {
    name: "Nintendo",
    image: "/images/nintendo.png",
    // ...
  },
  {
    name: "Disney",
    image: "/images/disney.png",
    // ...
  },
  // 他の画像も同様
];
```

### ステップ2: vercel.jsonの修正

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/((?!images/).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### ステップ3: 不要なファイル削除

- `src/assets/images/`ディレクトリを削除

### ステップ4: vite-env.d.tsのクリーンアップ

画像型定義を削除

## 期待される結果

- 画像は`public/images/`から配信
- Vercelで`https://your-app.vercel.app/images/nintendo.png`のようなパスでアクセス可能
- すべてのカード画像が正しく表示される

### To-dos

- [ ] brandData.tsからimport文を削除し、すべての画像を/images/パスで参照
- [ ] vercel.jsonにimages/へのrewrite除外とヘッダー設定を追加
- [ ] src/assets/imagesディレクトリを削除
- [ ] vite-env.d.tsから画像型定義を削除
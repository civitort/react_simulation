# React シミュレーションツール

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 基本動作

- ５分単位の交通量データを、１時間おきに集計し、グラフ上に描画するツール
- 読込用の基本データは、https://github.com/civitort/JSONAPI から取得（乱数で生成したテストデータ）
- Reactにより作成
- データの選択、計算用設定、描画設定の３つの入力欄を設け、その値に応じて動的にアウトプット（表データ、グラフデータ）が変動するツール作成を想定

## デザインのイメージ

- 参考：
https://camo.qiitausercontent.com/6f9dcf7f401b699e99e99e7820ee186cc11c18be/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3435383339352f39333935343462302d616537322d643136632d376336322d3731346330616438386632392e676966
- データや、交通容量を変える⇒react内部のグラフ描画用のstateを再計算してグラフを更新など

## お願いしたいこと

- React全体のリファクタリング

    - コード全体を管理しやすいようモジュールを適切に分割したいです。今後の拡張作業や、動作速度の改善なども踏まえて、ご相談させてください。

- デザイン部分の作成

    - シミュレーションとしての見映え調整
　


## インストール

`npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

### `npm run electron-build`

Reactのビルド済みアプリ(build/index.html)をelectron上で描画する

### `npm run electron-package`
electronアプリをexeファイルで保存(win用)

## node_modules

### chakra UI

### electron, electron-builder

### react-google-charts

### react-window

### react-hook-form

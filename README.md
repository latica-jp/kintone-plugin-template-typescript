# kintone plugin template w/ TypeScript

kintone のプラグイン開発を TypeScript で行うためのテンプレートです。

## テンプレートの概要

- Webpack + Babel + TypeScript
- ESLint + Prettier
- サイボウズが提供している以下のライブラリを利用して開発を効率化
  - @kintone/plugin-packer プラグインのパッケージング
  - @kintone/plugin-uploader プラグインのアップロード

## 使いかた

### 前提

- Node.js がインストールされていること
- Yarn がインストールされていること

### 準備

下記のコマンドを実行してプロジェクトディレクトリを作成、必要なライブラリをインストールします。

```shell
git clone https://github.com/latica-jp/kintone-plugin-template-typescript.git dir_name
cd dir_name
yarn
```

プロジェクトのルートディレクトリで下記のコマンドを実行して .env ファイルを作成します。

```shell
cp .env.sample .env
```

作成された `.env` ファイルにアップロード先の kintone ドメインとユーザ／パスワードを指定します。

```shell
KINTONE_DOMAIN=xxxx.cybozu.com
KINTONE_USERNAME=kintone_user
KINTONE_PASSWORD=kintone_password
```

### 秘密鍵ファイルの作成

プロジェクトのルートディレクトリで以下のコマンドを実行すると、private.ppk ファイルが生成されます。プラグインのビルドを行う前に、必ず一度実行する必要があります。

```
yarn prepare
```

`private.ppk` ファイルはプラグインを一意に識別するためのファイルで、パッケージングされたプラグインに必ず含まれます。このファイルを削除して再生成した場合、パッケージングしたプラグインはコード内容が同一でも kintone には別のプラグインとして識別されますので、取り扱いには十分注意してください。

### マニフェストファイルの更新

`src/manifest.json` を修正します。

- 設定内容は基本的に下記サイトに準拠します。
  - [kintone プラグイン開発手順 – cybozu developer network](https://developer.cybozu.io/hc/ja/articles/203455680-kintone-%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E9%96%8B%E7%99%BA%E6%89%8B%E9%A0%86) 
  - カスタマイズファイルが元のソースコードではなく、ビルド済みのファイルになる点に留意してください。

### プラグインの作成

以下のコマンドで TypeScript コードのコンパイル、プラグインのパッケージングを実行して `dist` ディレクトリに出力します。

- 開発用ビルド
  - `yarn build`
  - 出力コードはデバッグ用のソースマップを含む
- リリース用ビルド
  - `yarn release`
  - 出力コードは uglify され、ソースマップを含まない

### プラグインのアップロード

プロジェクトのルートディレクトリで以下のコマンドを実行すると、`dist/` ディレクトリに出力されたプラグインファイルを `.env` ファイルに指定した kintone 環境にアップロードします。

```
yarn upload
```

### 開発モード

プロジェクトのルートディレクトリで以下のコマンドを実行すると、コードの変更を監視し、変更を検知するたびに自動的にコードのコンパイル、プラグインのパッケージングとアップロードを行います。

コードの変更のたびにプラグインが更新されて kintone にアップロードされますので、効率的な開発を行えます。

```
yarn start
```

### Disclaimer

- kintone はプラグインアップロード用のAPI を備えていないため、@kintone/plugin-uploader は（なんと）puppeteer（headless の Google Chrome）を使用してプラグインをアップロードしています。そのためか、ときどきアップロードが失敗することがあります。
  - 失敗した場合は（めげずに）リトライしてください。
- 監視モードの実装が不完全なためか、自動ビルドとアップロードがうまくいかなくなることが（ときどき）あります。その場合はいったん ctrl-c でプロセスを停止して、再度 `yarn start` を再実行してください。

## ビルドについてのメモ

- TypeScript のトランスパイルは `tsc` ではなく `@babel/preset-typescript` で行っている
  - 型チェックは `tsc` で行っている（`fork-ts-checker-webpack-plugin`）
- @babel/preset-env
  - `corejs: { version: 3, proposals: true }` で proposal も含めた polyfill を入れている

## License

MIT

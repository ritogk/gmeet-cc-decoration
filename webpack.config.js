// const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const path = require("path")
module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    content: "./src/content/run.ts",
    main: "/src/content/main.ts",
    popup: "/src/popup/run.ts",
  },
  devtool: "cheap-module-source-map",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/chrome-extention`,
    // 出力ファイル名
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader", // inject CSS to page
          },
          {
            loader: "css-loader", // translates CSS into CommonJS modules
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}

if (process.env.NODE_ENV !== "production") {
  module.exports.mode = "development"
  module.exports.devtool = "inline-source-map"
} else {
  module.exports.mode = "production"
}

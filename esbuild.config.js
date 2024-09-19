const esbuild = require("esbuild");
const postCssPlugin = require("esbuild-plugin-postcss2").default; // Use `.default`

esbuild
  .build({
    entryPoints: ["./src/index.tsx"],
    bundle: true,
    outfile: "./dist/index.js",
    loader: {
      ".css": "text",
    },
    plugins: [
      postCssPlugin({
        plugins: [require("tailwindcss"), require("autoprefixer")],
      }),
    ],
    minify: true,
  })
  .catch(() => process.exit(1));

import { uglify } from "rollup-plugin-uglify";

const uglifyOptions = {
  sourcemap: true,
};

export default [
  //    {
  //       input: "src/index.js",
  //       output: [
  //          {
  //             name: "TextSplitter",
  //             file: "dist/TextSplitter.js",
  //             format: "umd",
  //          },
  //       ],
  //    },

  {
    input: "src/index.js",
    output: [
      {
        name: "TextSplitter",
        file: "dist/textsplitter.min.js",
        format: "umd",
      },
    ],
    plugins: [uglify(uglifyOptions)],
  },
];

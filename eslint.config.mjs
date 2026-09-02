import next from "eslint-config-next";

/*
  eslint-config-next v16 exports a flat config array directly. It does not need
  the FlatCompat wrapper that older Next projects use, and wrapping it fails.
*/
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  ...next,
];

export default eslintConfig;

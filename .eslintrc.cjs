module.exports = {
    // ...
    extends: [
      // ...
      "plugin:astro/recommended",
    ],
    // ...
    overrides: [
      {
        // Define the configuration for `.astro` file.
        files: ["*.astro"],
        // Allows Astro components to be parsed.
        parser: ["astro-eslint-parser","babel-eslint"],
        // Parse the script in `.astro` as TypeScript by adding the following configuration.
        // It's the setting you need when using TypeScript.
        parserOptions: {
          sourceType: "module",
          parser: "@typescript-eslint/parser",
          extraFileExtensions: [".astro"],
        },
        rules: {
          // override/add rules settings here, such as:
          // "astro/no-set-html-directive": "error"
        },
      },
      // ...
    ],
  }
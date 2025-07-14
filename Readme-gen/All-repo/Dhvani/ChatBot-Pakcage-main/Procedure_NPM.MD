# NPM Package Publishing - Full Step-by-Step Guide

---

## 1. **Setup Project Directory**

```sh
mkdir my-package && cd my-package
npm init -y
```

---

## 2. **Create Source Files**

Create your module entry point:

```sh
touch index.js
```

Example `index.js`:

```js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

---

## 3. **Update `package.json`**

Edit key fields:

```json
{
  "name": "your-package-name", // must be unique
  "version": "0.1.0",
  "description": "Short description",
  "main": "index.js",
  "keywords": ["greet", "example"],
  "author": "Your Name",
  "license": "ISC"
}
```

For scoped package:

```json
"name": "@your-npm-username/your-package-name",
"publishConfig": { "access": "public" }
```

---

## 4. **(Optional) Add `.npmignore`**

Create `.npmignore` to exclude files from publish:

```
node_modules
test
.vscode
```

---

## 5. **Login to NPM**

```sh
npm login
```

---

## 6. **Publish to NPM**

### For unscoped public package:

```sh
npm publish
```

### For scoped package (public):

```sh
npm publish --access public
```

---

## 7. **Update Package**

When making changes:

* Edit code
* Bump version in `package.json` (e.g., `0.1.0` → `0.1.1`)
* Re-publish:

  ```sh
  npm publish
  ```

---

## 8. **Test Installation**

```sh
npm install your-package-name
```

or (scoped)

```sh
npm install @your-npm-username/your-package-name
```

---

## References

* [Unscoped packages](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
* [Scoped packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
* [Versioning](https://docs.npmjs.com/about-semantic-versioning)

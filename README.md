# todo-app

A tiny todo-list library with tests, built to practice CI/CD pipelines.
It has no dependencies, so there is nothing to install.

## Commands

```bash
npm run lint    # syntax-check the source and test files
npm test        # run the tests (Node's built-in test runner)
npm run build   # copy src/ into dist/
```

Requires Node 20 or newer.

## Layout

```
src/todo.js          the TodoList class
test/todo.test.js    9 tests
scripts/build.js     the build step
package.json         lint / test / build scripts
```

## Next step

Push this to a GitHub repository and add `.github/workflows/ci.yml`
so these three commands run automatically on every push.

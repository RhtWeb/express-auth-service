# express-init-setup

-   [ ] Git SetUp

    -   [ ] git install
    -   [ ] add .gitignore for node via vscode extension
    -   [ ] git init
        -   rm -rf .git
    -   [ ] echo "# express-init-setup" >> README.md
    -   [ ] git add .
    -   [ ] git commit -m "add .gitignore"
    -   [ ] signIn to GitHub / new repo {auth-service}
    -   [ ] setup SSH Protocol SetUp
        -   cat ~/.ssh/id_rsa.pub | clip (in Bash)
        -   https://www.freecodecamp.org/news/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca/
        -   git config list
        -   git config user.name "User 1" // Updates git config user name
        -   git config user.email "user1@workMail.com"
        -   git remote rm origin
        -   git remote add origin git@github.com-work_user1:work_user1/repo_name.git
    -   [ ] push to new remote repo

-   [ ] Node version Manager

    -   nvm allows you to quickly install and use diff version of node via cmd
    -   Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions
    -   [ ] install nvm acc to O.S
        -   use curl in git bash terminal && add cmd in .bashrc and .bash_profile (for windows)
    -   [ ] .nvmrc >> v18.17.1 || v18.20.4
        -   echo v18.20.4 > .nvmrc
    -   [ ] node -v | nvm ls -remote | nvm install | nvm use
    -   [ ] nvm -v | nvm ls | nvm use v18.17.1

-   NPM (Node Package Manager) {maybe Nimble Porridge Muncher :) }

    -   ^Major.~Minor.Patch > breaking changes(x._._) | bug fixes and extra features(x.y.\*) | little bug fixes(x.y.z)

-   [ ] NodeJs Project SetUp

    -   [ ] npm init (package.json file created)
    -   [ ] mkdir src | touch src/server.js
    -   [ ] "dev": "node src/server.js"
    -   [ ] npm run dev

-   [ ] Typescript SetUp

    -   TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale by adding types and features
    -   type declaration | auto completion in IDE | better error checking at compile time
    -   [ ] npm i -D typescript (./nodemodules/typescript)
    -   [ ] npm i -D @types/node (./nodemodules/@types/node)
    -   [ ] npx tsc --init | ./nodemodules/.bin/tsc --init
        -   It will create tsconfig.json file
        -   "target": "es2016" | "module":"common.js" (require synx) | "rootDir":"./src" | "outDir":"./dist"
        -   tsconfig > {{ }, "include":["src"]} (it will ignore file outside src)
        -   "noEmitOnError":true (It will Disable emitting compiled files if any typechecking error)
    -   [ ] tsc -w | tsc -w ./src ./dist | tsc --noEmitOnError -w ./src/server.ts ./dist/server.js

-   [ ] Prettier for code formating

    -   It helps in auto code formating via quotes marks, semi color, spaces, tab, formate consistency in the project, So that you can focus more on business logic
    -   [ ] npm install --save-dev --save-exact prettier (exact version No changes at all)
    -   [ ] echo {} > .prettierrc.json
        -   { "printWidth": 80, "tabWidth": 4, "semi": true, "singleQuote": false }
        -   json file in repo helps in CI/CD pipeline & for uniform code formate in the team
        -   extension > Prettier by Prettier.io > (ctrl + ,) > formate on save [check]
        -   extension will give preferance to json file
    -   [ ] .prettierignore > #Ignore artifacts: build coverage
        -   Note It will also ignore files mentioned in gitignore in v3
    -   [ ] npx prettier . --check | npx prettier . --write
    -   [ ] { "format:check" : "prettier . --check", "format:fix" : "prettier . --write" }
    -   [ ] npm run formate:check

-   [ ] ESLint Integration
    -   static code Analyser during development to quickly find problem acc. to series of assertions called lint rules (focus on code quality)
    -   https://typescript-eslint.io/
    -   [ ] npm install --save-dev eslint @eslint/js @types/eslint\_\_js typescript typescript-eslint
    -   [ ] configure your eslint.config.mjs (ESModule) file
    -   [ ] ignores: ["dist", "node_modules", "eslint.config.mjs"]
    -   [ ] npm install --save-dev eslint-config-prettier - https://github.com/prettier/eslint-config-prettier - add eslintConfigPrettier at the end of eslint.config.mjs file -[ ] "lint:fix": "eslint . --fix", "lint": "eslint ." > pakage.json -[ ] npx eslint . -[ ] ESLint extension by Microsoft

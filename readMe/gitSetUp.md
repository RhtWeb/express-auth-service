# Git SetUp

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
    -   ~/.gitconfig > gobal | projectName/.git/config > repo
    -   git config user.name "User 1" // Updates git config user name
    -   git config user.email "user1@workMail.com"
    -   git config user.name && git config user.email
    -   git remote rm origin
    -   git remote add origin git@github.com-work_user1:work_user1/repo_name.git
    -   git remote add template git@github.com-work_user2:work_user2/repo_name.git
-   [ ] push to new remote repo
-   git checkout -b <branch> && git push -u origin <branch>

-   Set an email address in Git. Use your GitHub-provided no-reply email address.
    -   Setting your email address for every repository on your computer
        git config --global user.email "{ID}+{username}@users.noreply.github.com"
    -   Setting your email address for a single repository
        git config user.email "{ID}+{username}@users.noreply.github.com"
    -   Reset the author information on your last commit:
        git commit --amend --reset-author --no-edit

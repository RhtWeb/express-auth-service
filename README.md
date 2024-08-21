# express-init-setup
[ ] Git SetUp
    [] git install
    [] add .gitignore for node via vscode extension
    [] git init
        - rm -rf .git
    [] echo "# express-init-setup" >> README.md
    [] git add .
    [] git commit -m "add .gitignore"
    [] signIn to GitHub / new repo {auth-service}
    [] setup SSH Protocol SetUp
        - cat ~/.ssh/id_rsa.pub | clip (in Bash)
        - https://www.freecodecamp.org/news/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca/
        - git config list
        - git config user.name "User 1"   // Updates git config user name
        - git config user.email "user1@workMail.com"
        - git remote rm origin
        - git remote add origin git@github.com-work_user1:work_user1/repo_name.git
    [] push to new remote repo

# Version 1.0

## Description
Version 1 takes the layout and basic button click functionality built in the 2 previous versions and then ties in advanced calculation functionality. This version works toward different logical thought processes that you will be approaching from the provided testing sheet.

# Getting Started
## 1. What branch do you have your latest changes on?
- **I don't know**
    - talk with an instructor
- **not master**
    - Create a pull request from most up to date branch to master (On **your** calculator repo)
    - Merge pull request to master
    - Go to Pull Latest Changes (*step 2*)
- **master**
    - Go to Pull Latest Changes (*step 2*)
## 2. Pull Latest Changes
- `git checkout master`
- `git pull origin master`
- *if you don't see your most recent code after pulling master refer to* **step 1**
## 3. Create the new feature branch
- `git checkout -b version1.0`


# Coding Details
## **JS Functionality**
- Add additional click handlers to the following buttons on the DOM. When clicked a function will be called that will do the following:
    - Decimal `(.)` will be stored in an array and be displayed on the DOM
    - Clear Entry `(CE)` will clear ONE (the last) number from our storage array and replace that value with a `0` on the display
    - Clear `(C)` will completely clear all the operands and operators that are stored in an array and clear the values off of the calculator display
- Below you will find a table detailing different types of unusual/advanced inputs your calculator should account for. They are listed in order of complexity, from basic to advanced. You may not be able to implement **all** of them within the timeline of this project, but you should attempt to include **as many as possible**.
    - #### <a href="https://docs.google.com/spreadsheets/d/1HRpRqdyQrax5vgwrVatcOxSxly6GHXXfZuzc0lb9Tfg/pubhtml#">FEATURE DETAILS HERE</a>

# After Coding
## 1. Add files to git
- `git add .`
## 2. Commit files (Group files together)
- `git commit -m "Calculator v1.0 - Your Name"`
- **Replace "Your Name" with your first and last name**
## 3. Send to GitHub (Push)
- `git push origin version1.0`
## 4. Create pull request
- Pull request should be made from version1.0 to **your repository's** master branch
## 5. Create pull request to LearningFuze
- After you have updated your master branch, create a pull request from your master branch to the LearningFuze Calculator repo for review

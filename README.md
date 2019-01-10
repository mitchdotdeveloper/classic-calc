# Version 1.0

## Description
Version 1 takes the layout and basic button click functionality built in the 2 previous versions and then ties in advanced calculation functionality. This version works toward different logical thought processes that you will be approaching from the provided testing sheet.

## Getting Started
> 1. What branch do you have your latest changes on?
    - **I don't know** - talk with an instructor
    - **not master**
        - Create a pull request from most up to date branch to master (On **your** calculator repo)
        - Merge pull request to master
        - Go to Pull Latest Changes (step 2)
    - **master** - Go to Pull Latest Changes (step 2)
1. Pull Latest Changes
    - `git checkout master`
    - `git pull origin master`
    - *If you don't see your most recent code after pulling master refer to* **step 1**
1. Create the new feature branch
    - `git checkout -b version1`
1. Work on the scope defined <a href="https://github.com/Learning-Fuze/calculator/tree/v1#scope">Below</a>
1. Add files to git
    - `git add .`
1. Commit files (Group files together)
    - `git commit -m "calculator version1 - Your Name"`
    - **Replace "Your Name" with your first and last name**
1. Send to gitHub (Push)
    - `git push origin version1`
1. Create pull request
    - Pull request should be made from version1 to **your repository's/teams** master branch


## Scope
- JS Functionality
    - Add additional click handlers to the following buttons on the DOM. When clicked a function will be called that will do the following:
        - Decimal `(.)` will be stored in an array and be displayed on the DOM
        - Clear Entry `(CE)` will clear ONE (the last) number from our storage array and replace that value with a `0` on the display
        - Clear `(C)` will completely clear all the operands and operators that are stored in an array and clear the values off of the calculator display
- Calculator Logic Examples with outputted values found: 
    - #### <a href="https://docs.google.com/spreadsheets/d/1HRpRqdyQrax5vgwrVatcOxSxly6GHXXfZuzc0lb9Tfg/pubhtml#">HERE</a>

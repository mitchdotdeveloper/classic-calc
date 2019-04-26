# Version 0.5

## Description
Version 0.5 adds in the user functionality / logic of a calculator. This version introduces the basic operations that a calculator
can complete and ties this functionality together with click events for you to interact with on the DOM.

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
- `git checkout -b version0.5`

# Coding Details
## Take your layout from finished v0.1 version and implement the following features:
### **Insert a link to the following javascript file:**
- jQuery's latest version
### **JS Functionality**
1. Declare and define a function called, `do_math`, that takes in 3 parameters
    - **Parameters**
        - `num1` - first number used in a calculation
        - `num2` - second number used in a calculation
        - `operator` - operator that will determine what type of calculation will be made
    - This function will be used to handle the basic calculations once two numbers and an operator have been registered
2. Add click handlers to all buttons in the DOM. When clicked a function will be called that will do the following:
    - Numbers `(0-9)` will be stored in an array, concatenating with previous numbers if appropriate,and be displayed on the DOM
    - Operators `(+, -, *, /)` will be stored in an array and be displayed on the DOM
    - Equal `(=)` will call the function that will perform the calculation of the given expression
3. Take the value and display in the correct layout area within the DOM
    - The display of the calculation will be up to each students interpretation of how a calculator should look. **If you need ideas
    look at your calculator on your phone.**

# After Coding
## 1. Add files to git
- `git add .`
## 2. Commit files (Group files together)
- `git commit -m "Calculator v0.5 - Your Name"`
- **Replace "Your Name" with your first and last name**
## 3. Send to GitHub (Push)
- `git push origin version0.5`
## 4. Create pull request
- Pull request should be made from version0.5 to **your repository's** master branch

# Example

### <a href="http://Learning-Fuze.github.io/calculator/" target="_blank">View Demo</a>

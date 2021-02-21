# APItestingTask


About Project:
This is a small project in which a Contact Agenda Rest api is automated using Cypress and Mocha Framework

Pre-requisites:
=====================
1. Download and install node
2. Check the installation and version using "node --version.
3. Now install npm
4. Go to terminal and type npm init( You will get package.json file which contain meta data and dependencies)
5. Install Cypress
6. Install mocha

Steps to Run Tests:
====================
In order to execute the tests make sure the following is true:
1) Start Docker
2) Run the provided docker cantainer
3) Access http://localhost:8000 (make sure no other service is running on Post 8000)
4)Open new window in Visual Studio Code Editor
5)Go to Terminal
6)Run the command: npm run e2e( this will start your tests in headless mode) or npx cypress open( this will start your tests in browser)


Note:
===============
For delete test case, please change the id in the url before running the tests

Tools:
=================
IDE: Visual Studio Code 
Automation Tool: Cypress
Test Framework: Mocha


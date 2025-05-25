l
<h1 align="center">VIHAGA-MD V09</h1>

<img src="https://i.imgur.com/dBaSKWF.gif" height="90" width="100%">

<p align="center">
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=33&pause=1000&color=5513F7&width=435&lines=VAJIRA+MD+WHATSAPP+BOT" alt="Typing SVG" /></a>
</p>
<p align="center">
<a href="https://github.com/VajiraTechOfficial/">
    <img src="https://i.ibb.co/dTCVJJb/temp-image.jpg"  width="700px">
</a>
<hr>


<p align="center">

  <a href="https://github.com/VajiraTechOfficial/VAJIRA-MD">
    <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FVajiraTech%2FVAJIRA_MD&count_bg=%2379C83D&title_bg=%23555555&icon=gitpod.svg&icon_color=%23E7E7E7&title=Views&edge_flat=false" alt="Views"/></a>
  
  </a>
  <a href="https://github.com/VajiraTechOfficial/VAJIRA-MD/fork">
    <img src="https://img.shields.io/github/forks/VajiraTech/VAJIRA_MD?label=Fork&style=social">
    
  </a>
  <a href="https://github.com/VajiraTechOfficial/VAJIRA-MD/stargazers">
    <img src="https://img.shields.io/github/stars/VajiraTech/VAJIRA_MD?style=social">
  </a>
</p>

<p align="center">
  <a href="https://github.com/VajiraTechOfficial/VAJIRA-MD">
    <img src="https://img.shields.io/github/repo-size/VajiraTech/VAJIRA_MD?color=purple&label=Repo%20Size&style=plastic">

  </a>
  <a href="https://github.com/VajiraTechOfficial/VAJIRA-MD">
    <img src="https://img.shields.io/github/license/VajiraTech/VAJIRA_MD?color=purple&label=License&style=plastic">

  </a>
  <a href="https://github.com/VajiraTechOfficial/VAJIRA-MD">
    <img src="https://img.shields.io/github/languages/top/VajiraTech/VAJIRA_MD?color=purple&label=Javascript&style=plastic">

  </a>
  <a href="https://github.com/VajiraTechOfficial/VAJIRA-MD">
    <img src="https://img.shields.io/static/v1?label=Author&message=Vajira%20Rathnayake&color=purple&style=plastic">

  </a>
  </p>
 <p align="center">
  <a href="https://github.com/VajiraTechOfficial/VAJIRA-MD">
    <img src="https://img.shields.io/badge/OUR%20%20%20TEAM-Technical%20Cybers%20(TC)-purple&style=plastic">

  </a>
</p>


<div align="center">
 
  <h1>😍👀 HEY GUYS.. WATCH DEPLOYMENT VIDEOS👇</h1>
</div>



## Workflow Deploy Code 👇


```
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start
```


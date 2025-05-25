l
<h1 align="center">VIHAGA-MD V09</h1>

<img src="https://i.imgur.com/dBaSKWF.gif" height="90" width="100%">

<p align="center">
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=33&pause=1000&color=5513F7&width=435&lines=VIHAGA+MD+WHATSAPP+BOT" alt="Typing SVG" /></a>
</p>
<p align="center">
<a href="https://github.com/VajiraTechOfficial/">
    <img src="https://i.ibb.co/dTCVJJb/temp-image.jpg"  width="700px">
</a>
<hr>




<div align="center">
 
  <h1>MADE BY VIHAGA SITHUM</h1>
</div>

## 🤖 VIHAGA MD V09
A Powerful WhatsApp Bot created by **Vihaga Sithum** using Baileys library and Node.js

### 👤 Developer:
- Name: **Vihaga Sithum**
- GitHub: [VIHAGA-MG](https://github.com/VIHAGA-MG)



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


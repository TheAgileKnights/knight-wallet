## Installation

### Prerequesites:
- Git
- Node.js
- GitHub CLI

#### Windows:
1. Install Chocolatey package manager if you haven't already:
    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    ```
2. Install Git, Node.js and GitHub CLI using Chocolatey:
   ```powershell
   choco install git nodejs gh -y
   ```
3. Set up GitHub CLI:
   ```powershell
   # Choose SSH instead of HTTPS when prompted. You can press enter for everything else
   gh auth login
   ```

### Project Setup:
```bash
# Clone the repository (We use GitHub CLI here, but you can also use git clone if you are already authentica)
gh repo clone https://github.com/martipops/knight-wallet

# Navigate into the project directory
cd knight-wallet

# Install dependencies
npm install
```

### Running the Application:
```bash
npm run dev
```


## Helpful Resources
- [Adonis Docs (Full Stack Framework)](https://docs.adonisjs.com/guides/preface/introduction)
- [Vue Docs (Frontend)](https://vuejs.org/guide/introduction.html)
- [Lucid Docs (Database)](https://docs.adonisjs.com/guides/database/lucid)
- [Tailwind Docs (CSS Framework)](https://tailwindcss.com/docs/styling-with-utility-classes)
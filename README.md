# Ramanarayanan M – Portfolio

A React-based portfolio website with dark tech aesthetic.

## 🚀 Quick Start (Local)

```bash
npm install
npm start
```

Runs at http://localhost:3000

## 📦 Build for Production

```bash
npm run build
```

Creates a `build/` folder ready for deployment.

---

## 🌐 FREE Hosting Options

### Option 1: Netlify (Easiest – Recommended)
1. Go to https://netlify.com → Sign up (free)
2. Drag & drop your `build/` folder onto Netlify dashboard
3. You get a free URL like: `ramanarayanan.netlify.app`
4. **Custom domain**: Get a free domain at https://freenom.com or buy one from Namecheap (~$1/year for .online domains)

### Option 2: Vercel
1. Go to https://vercel.com → Sign up with GitHub
2. Push this folder to GitHub
3. Import repo on Vercel → it auto-deploys
4. Free URL: `ramanarayanan.vercel.app`

### Option 3: GitHub Pages
1. Push code to GitHub
2. Run: `npm install gh-pages --save-dev`
3. Add to package.json: `"homepage": "https://yourusername.github.io/portfolio"`
4. Add scripts: `"predeploy": "npm run build"`, `"deploy": "gh-pages -d build"`
5. Run: `npm run deploy`

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html       ← HTML shell
│   └── profile.jpg      ← Your profile photo
├── src/
│   ├── index.js         ← React entry point
│   └── Portfolio.jsx    ← Main portfolio component
├── package.json
└── README.md
```

## ✏️ How to Update Content

All content is inside `src/Portfolio.jsx`:
- **Skills**: Edit the `skills` object
- **Experience**: Edit the `experience` array
- **Projects**: Edit the `projects` array
- **Contact info**: Edit the Contact section
- **Profile photo**: Replace `public/profile.jpg`

---

Built with React 18 + Sora font + CSS-in-JS

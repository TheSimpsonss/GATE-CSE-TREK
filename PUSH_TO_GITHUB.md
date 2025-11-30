# Push Code to GitHub - Quick Guide

## Current Status
✅ All code is committed locally
✅ .gitignore is configured
✅ Remote is set to: https://github.com/daultanigaurav/GATE-CSE-TREK.git

## Steps to Upload:

### 1. Create Repository on GitHub
1. Go to: https://github.com/new
2. Repository name: `GATE-CSE-TREK`
3. Description: "GATE CSE preparation tracker with authentication"
4. Choose **Public** or **Private**
5. **DO NOT** check "Initialize with README"
6. Click **Create repository**

### 2. Push Your Code

After creating the repository, run:

```bash
git push -u origin main
```

If you need authentication:
- Use a Personal Access Token (Settings → Developer settings → Personal access tokens)
- Or authenticate with: `gh auth login`

### Alternative: If repository already exists

If the repository already exists but is empty, you can force push:

```bash
git push -u origin main --force
```

## What Will Be Uploaded

✅ All source code (client and server)
✅ Configuration files
✅ Package.json files
❌ node_modules (excluded via .gitignore)
❌ .env files (excluded for security)

## After Pushing

Users cloning the repo will need to:
1. Run `npm install` in `server/` directory
2. Run `npm install` in `client/` directory
3. Set up MongoDB connection
4. Configure environment variables


# GitHub Repository Setup Instructions

## Step 1: Create the Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `GATE-CSE-TREK`
3. Description: "GATE CSE preparation tracker with authentication and progress tracking"
4. Choose **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Push Your Code

After creating the repository, run these commands:

```bash
# Make sure you're in the project directory
cd C:\Users\vansh\Downloads\gate-cse-trek

# Push to GitHub
git push -u origin main
```

If you get authentication errors, you may need to:

### Option A: Use GitHub CLI (if installed)
```bash
gh auth login
git push -u origin main
```

### Option B: Use Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` permissions
3. When pushing, use the token as password:
```bash
git push -u origin main
# Username: your-github-username
# Password: your-personal-access-token
```

### Option C: Use SSH (if configured)
```bash
git remote set-url origin git@github.com:daultanigaurav/GATE-CSE-TREK.git
git push -u origin main
```

## Current Status

✅ Git repository initialized
✅ All code committed locally
✅ .gitignore configured (excludes node_modules)
✅ Remote repository URL set: https://github.com/daultanigaurav/GATE-CSE-TREK.git

## What's Included

- Complete authentication system (signup/login)
- User-specific progress tracking
- Responsive design for all devices
- Backend API with MongoDB
- Frontend React application
- All source code and configuration files

## Note

The `node_modules` folders are excluded from the repository. Users will need to run `npm install` in both `server/` and `client/` directories after cloning.


# GitHub Token Setup Guide

This guide will help you set up a GitHub Personal Access Token to avoid rate limiting issues when fetching your
repositories.

## Steps to Create a GitHub Token

1. **Go to GitHub Settings**
    - Visit [https://github.com/settings/tokens](https://github.com/settings/tokens)
    - Or navigate: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**
    - Click "Generate new token" → "Generate new token (classic)"
    - Give it a descriptive name like "Portfolio Website"

3. **Select Scopes**
    - For public repositories, you only need: **`public_repo`** (Access public repositories)
    - This is sufficient for reading public repo data

4. **Generate and Copy**
    - Click "Generate token" at the bottom
    - **Important**: Copy the token immediately - you won't see it again!

5. **Add to Your Project**
    - Open the `.env` file in your project root
    - Replace `your_github_token_here` with your actual token:
      ```
      NUXT_PUBLIC_GITHUB_TOKEN=ghp_your_actual_token_here
      ```

6. **Restart Your Dev Server**
    - Stop your development server (Ctrl+C)
    - Run `npm run dev` again
    - Your token will now be used for API requests

## Rate Limits

- **Without token**: 60 requests per hour
- **With token**: 5,000 requests per hour

## Security Notes

- The `.env` file is already in `.gitignore` - your token won't be committed
- Never share your token publicly
- If compromised, revoke it immediately and generate a new one
- The `.env.example` file shows the format without exposing your actual token

## Testing

After adding your token, check the browser console - you should no longer see rate limit errors when loading the
projects page.


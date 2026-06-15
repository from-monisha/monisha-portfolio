# 🌐 Complete Setup Guide
## Monisha Bahuguna Portfolio — Beginner Step-by-Step

---

> **Time needed:** About 30–45 minutes  
> **What you need:** A computer, a browser, an email address  
> **Cost:** Free  

---

## OVERVIEW — What You're About to Do

You'll do 4 things:
1. Create a **GitHub account** (stores the website files in the cloud)
2. Upload the website files to GitHub
3. Create a **Netlify account** (makes the site live on the internet)
4. Connect them so Monisha can **log in and edit** her site from a browser

---

---

## PART 1 — GitHub (Cloud Storage for the Website)

GitHub is like Google Drive but for websites. It stores your files and tracks changes.

---

### Step 1.1 — Create a GitHub Account

1. Go to **https://github.com**
2. Click **"Sign up"**
3. Enter an email, create a password, choose a username
   - Suggested username: `monishabahuguna` or your own
4. Verify your email when GitHub sends you a confirmation

---

### Step 1.2 — Create a New Repository ("Repo")

A repository is like a folder in the cloud that holds all your website files.

1. After logging in, click the **green "New" button** on the left
   (or go to https://github.com/new)
2. Fill in:
   - **Repository name:** `monisha-portfolio`
   - **Description:** Monisha Bahuguna Portfolio Website
   - Select **"Public"** ← important, must be public for free hosting
   - ✅ Check **"Add a README file"**
3. Click **"Create repository"**

You now have an empty GitHub repository.

---

### Step 1.3 — Upload All the Website Files

1. On your new repository page, click **"uploading an existing file"** (you'll see this link)
   OR click the **"Add file" → "Upload files"** button
2. **Drag and drop the entire contents** of the `monisha-portfolio` folder
   - Do NOT drag the folder itself — open it first, then select ALL files and folders inside it
   - You should be uploading: `index.html`, `admin/`, `cms-data/`, `css/`, `js/`, `images/`, `netlify.toml`
3. Scroll down, write a commit message: `Initial upload`
4. Click **"Commit changes"**

Wait a minute for the upload to complete.

---

---

## PART 2 — Netlify (Makes the Site Live)

Netlify takes your GitHub files and publishes them as a real website.

---

### Step 2.1 — Create a Netlify Account

1. Go to **https://netlify.com**
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** ← this is the easiest option
4. Authorize Netlify to access your GitHub

---

### Step 2.2 — Connect Your GitHub Repo to Netlify

1. In Netlify, click **"Add new site"** → **"Import an existing project"**
2. Click **"GitHub"**
3. You'll see a list of your repositories — click **"monisha-portfolio"**
4. On the next screen:
   - **Branch to deploy:** `main`
   - **Publish directory:** leave blank (or type `.`)
   - Leave everything else as default
5. Click **"Deploy site"**

Netlify will deploy in about 60 seconds. You'll see a randomly named URL like `sparkly-mango-123.netlify.app`.

---

### Step 2.3 — Give the Site a Better URL

1. In Netlify, go to **Site configuration → General → Site details**
2. Click **"Change site name"**
3. Type: `monishabahuguna`
4. Click Save

Your site is now live at: **https://monishabahuguna.netlify.app** 🎉

---

---

## PART 3 — Enable the CMS Editor (The Magic Part)

This is what gives Monisha the edit panel at `/admin`.

---

### Step 3.1 — Enable Netlify Identity

"Netlify Identity" is the login system for the CMS.

1. In your Netlify dashboard, click your site
2. Go to **"Integrations"** in the top menu
3. Search for **"Identity"** and click **Enable**
   — OR go to: **Site configuration → Identity → Enable Identity**
4. Under **"Registration preferences"** → select **"Invite only"**
   (This means only people you invite can log in — so only Monisha)
5. Click Save

---

### Step 3.2 — Enable Git Gateway

Git Gateway lets the CMS editor save changes back to your GitHub.

1. Still in **Identity settings**, scroll down to **"Services"**
2. Click **"Enable Git Gateway"**
3. It will ask you to authorize with GitHub — click Allow

---

### Step 3.3 — Invite Monisha as an Editor

1. In Netlify → Identity → click **"Invite users"**
2. Enter Monisha's email: `monishabahuguna63@gmail.com`
3. Click **"Send"**

Monisha will receive an email saying "You've been invited to [site name]".
She clicks the link, sets a password, and she's in.

---

### Step 3.4 — Add the Identity Widget Script to the Site

This small step lets the `/admin` page know where to find the login system.

1. Go back to **GitHub** → your `monisha-portfolio` repository
2. Click on `index.html`
3. Click the **pencil icon** (Edit) in the top right
4. Find this line near the top (inside `<head>`):
   ```
   <link rel="stylesheet" href="css/style.css">
   ```
5. Add this line **directly above it**:
   ```html
   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```
6. Also find the closing `</body>` tag at the bottom and add **above it**:
   ```html
   <script>
     if (window.netlifyIdentity) {
       window.netlifyIdentity.on("init", user => {
         if (!user) {
           window.netlifyIdentity.on("login", () => {
             document.location.href = "/admin/";
           });
         }
       });
     }
   </script>
   ```
7. Scroll down, click **"Commit changes"**

Netlify will automatically redeploy (takes ~1 minute).

---

---

## PART 4 — Test Everything

---

### Step 4.1 — Check the Live Site

Go to **https://monishabahuguna.netlify.app**

You should see Monisha's full portfolio.

---

### Step 4.2 — Check the Editor Panel

Go to **https://monishabahuguna.netlify.app/admin**

You should see a login screen. Log in with the email/password Monisha set.

You should see the CMS dashboard with sections:
- ⚙️ Homepage Settings
- 💼 Projects / Work
- 💬 Testimonials
- 📝 Publications & Writing

---

### Step 4.3 — Make a Test Edit

1. Click **"⚙️ Homepage Settings"** → **"Homepage Content"**
2. Change something small — e.g. the tagline
3. Click **"Publish"** (the blue button)
4. Wait ~60 seconds
5. Go back to the live site and refresh — you'll see the change

---

---

## HOW MONISHA EDITS HER SITE (The Simple Version for Her)

Tell Monisha:

> **To edit your website:**
> 1. Go to: `monishabahuguna.netlify.app/admin`
> 2. Log in with your email and password
> 3. Click what you want to change (bio, a project, a testimonial)
> 4. Edit the text, upload a photo if needed
> 5. Click the blue **"Publish"** button
> 6. In about 1 minute, the live website updates

**To add a new project:**
> Click "💼 Projects / Work" → "+ New Projects / Work" → fill in the form → Publish

**To add a photo to a project:**
> Click the project → click "Choose an image" → upload from your computer → Publish

---

---

## CUSTOM DOMAIN (Optional — ~₹800/year)

If Monisha wants `monishabahuguna.com` instead of `.netlify.app`:

1. Buy the domain from **GoDaddy.com** or **Namecheap.com**
2. In Netlify → Site configuration → Domain management → "Add a domain"
3. Type the domain name → Netlify shows you DNS settings to copy
4. In GoDaddy/Namecheap, paste those DNS settings
5. Takes 24 hours to go live

---

---

## TROUBLESHOOTING

| Problem | Fix |
|---|---|
| Site shows blank page | Wait 2 minutes, hard refresh (Ctrl+Shift+R) |
| Can't log into /admin | Check Netlify Identity is enabled (Part 3.1) |
| Changes not showing up | Wait 60 seconds, refresh. Check Netlify "Deploys" tab |
| Upload stuck on GitHub | Refresh and try uploading fewer files at once |
| Monisha didn't get invite email | Check spam, or resend from Netlify → Identity |

---

Need help? Describe what you see on screen and ask Claude at claude.ai.

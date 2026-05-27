# Dr. Jörg Werner Website Prototype

Static GitHub Pages-ready website repository for the umbrella brand **Dr. Jörg Werner**, presenting two clearly separated service areas:

- **Legal Services** through **Dr. Werner & Associates**
- **Consulting** through **Werner Ltd.**

This project uses only:

- HTML
- CSS
- Vanilla JavaScript
- Local JSON files
- Local SVG placeholder graphics

No Node.js, no npm, no build step, no server and no external tracking are required.

## Project Structure

```text
/
├── index.html
├── about.html
├── legal.html
├── legal-practice-areas.html
├── legal-team.html
├── legal-fees.html
├── legal-notice.html
├── consulting.html
├── consulting-business.html
├── consulting-relocation.html
├── consulting-accounting.html
├── consulting-international.html
├── consulting-notice.html
├── contact.html
├── disclaimer.html
├── admin.html
├── README.md
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── admin.js
│   ├── data/
│   │   ├── site-content.json
│   │   └── testimonials.json
│   └── images/
│       ├── executive-portrait-placeholder.svg
│       ├── legal-advisory-placeholder.svg
│       ├── business-consulting-placeholder.svg
│       ├── malta-business-placeholder.svg
│       └── international-advisory-placeholder.svg
```

## GitHub Pages Setup

1. Create a new repository on GitHub.
2. Upload all files from this folder to the repository root.
3. Open the repository on GitHub.
4. Go to **Settings**.
5. Open **Pages** in the sidebar.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch **main**.
8. Select folder **/root**.
9. Save the settings.
10. Open the generated GitHub Pages URL after deployment finishes.

## Important Notes

- All links use relative paths so the site works under a GitHub Pages project URL such as `/repository-name/`.
- The contact form is a static prototype and does not submit data.
- The admin page loads JSON content locally and exports edited JSON files for manual replacement in the repository.
- Some browsers block `fetch()` when opening `admin.html` directly via `file://`. For the most reliable admin prototype test, use GitHub Pages or a simple local static file viewer that serves the files over HTTP.
- Disclaimer, legal notice and provider wording must be reviewed before publication.

## Content Editing

The page texts can be edited in two ways:

1. Directly in the HTML files.
2. Through the static prototype at `admin.html`, then exporting JSON and replacing:
   - `assets/data/site-content.json`
   - `assets/data/testimonials.json`

## Publishing Reminder

Before going live, review:

- legal wording
- provider notices
- company details
- contact information
- testimonial approvals
- final branding assets

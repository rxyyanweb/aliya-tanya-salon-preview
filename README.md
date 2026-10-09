# Aliya Tanya Beauty Salon

A complete, standalone website concept. Open index.html in a browser; no install or build step is required. Keep assets, styles.css and app.js beside index.html.

## Features
- Real Instagram profile image as the logo and locally saved portfolio photographs.
- Responsive layouts, animated entrances, motion-preference support, gallery filters and keyboard-accessible image viewer.
- Validated WhatsApp appointment enquiry with editable preview; no messages are sent automatically.
- Click-to-call, Instagram, directions, location information and FAQ.
- Compressed WebP images, smaller responsive variants, deferred JavaScript and lazy loading.
- Static HTML content and local fonts: no runtime framework, analytics, database or API credentials.

## Content verification
Sources checked 6 October 2026:
- https://www.instagram.com/aliyatanyabeautysalon/
- https://maps.app.goo.gl/5nWMFx4mxKArbjMD6
- Public numbers, branding, services, portfolio and locations are based on these sources.
- No unverified package prices, testimonials, awards, staff credentials or response promises are published.
- Johar Town hours are listed as 10 AM–7 PM daily; Iqbal Town hours need owner confirmation. The 2026 rate-list highlight is present but the price contents require owner confirmation.

## Before a public launch
This is a local sales concept, not an official published business site. Confirm current services, rates, hours, booking terms and permission to publish the salon/customer images with the owner. Replace the 150px profile image with an owner-supplied high-resolution logo if available. Remove the noindex meta tag and change robots.txt to Allow: / only after approval. Add the chosen production domain to canonical, social-share and sitemap settings when known.

## Publish with GitHub and Vercel

This is a static site: there is no build step, package install or server-side runtime.

1. Create an empty repository on GitHub.
2. From this project folder, initialize Git and push the files:

   ```sh
   git init
   git branch -M main
   git add .
   git commit -m "Prepare salon website"
   git remote add origin https://github.com/USERNAME/REPOSITORY.git
   git push -u origin main
   ```

   Replace `USERNAME/REPOSITORY` with the GitHub account and repository name.
3. In Vercel, choose **Add New → Project**, import that GitHub repository, and deploy it. Keep the project root as the root directory; no build command or dependencies are required. `vercel.json` configures response headers for the deployment.
4. Future commits pushed to `main` will trigger deployments from the connected repository.

The current `noindex,nofollow` setting and `robots.txt` block search indexing. Keep them until the owner approves a public launch; then remove the robots meta tag and update `robots.txt` to `User-agent: *` / `Allow: /`. Confirm the production domain and update canonical and social-share URLs before launch. Vercel deployment settings are included, but the site has not been published.

Enquiries are handled via WhatsApp; this is not a live calendar or payment system.

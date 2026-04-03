# BuildMaster Construction – Multi-Page Website

A fully functional, responsive multi-page website for BuildMaster Construction company. This project transforms a single-page website into a professional, feature-rich multi-page experience with shared components, filtering capabilities, and rich content.

## 📁 Project Structure

```
project/
├── index.html                   # Home page (condensed hero + key sections)
├── about.html                   # About us (company story, timeline, team, certs)
├── services.html                # Services overview (4 main services + details)
├── projects.html                # Portfolio gallery (filterable projects)
├── contact.html                 # Contact form + info + map + FAQ
├── blog/
│   ├── index.html               # Blog listing (6+ articles)
│   └── sustainable-construction.html  # Sample blog post
├── assets/
│   ├── css/
│   │   └── style.css            # All custom CSS (extracted from inline)
│   └── js/
│       └── main.js              # All JavaScript (navigation, modals, forms)
└── components/
    ├── header.html              # Navbar (injected via JavaScript)
    └── footer.html              # Footer + modal (injected via JavaScript)
```

## 🎯 Key Features

### **Multi-Page Navigation**
- Seamless navigation between Home, About, Services, Projects, Contact pages
- Active page highlighting in navbar
- Mobile-responsive hamburger menu
- Fixed navbar with scroll-triggered styling

### **Shared Components**
- **Header/Navbar:** Injected dynamically via `fetch()` API
- **Footer:** Includes contact info, social links, quick navigation
- **Modal:** Project details popup for portfolio items
- Unified CSS and JavaScript across all pages

### **Interactive Features**
1. **Project Gallery**
   - Filter by category (All, Residential, Commercial, Industrial)
   - Click to view project details in modal
   - Smooth hover effects and animations

2. **Animated Counters**
   - Stats counter (years, projects, clients)
   - Only animates when visible in viewport

3. **Form Validation**
   - Real-time client-side validation
   - Error message display
   - Success message on submission
   - Accessible form design

4. **Testimonial Carousel**
   - Horizontal scroll with prev/next buttons
   - Smooth scrolling behavior

5. **Scroll Reveal Animations**
   - Elements fade and slide in as they come into view
   - Staggered animation delays for visual interest

###  **Additional Pages**
- **About:** Company story, timeline, team profiles, certifications
- **Services:** Detailed service descriptions with benefits/features
- **Projects:** Full portfolio with filtering and detail views
- **Blog:** Article listing with categories, featured post, sample articles

## 🚀 How to Use

### **1. Local Development**
No build tools required! This is plain HTML/CSS/JS. Simply:
```bash
# Open the website in your browser
open index.html

# Or use a local server (recommended for fetch API to work properly)
python -m http.server 8000
# Then visit http://localhost:8000
```

### **2. External CSS and JS Files**
All pages link to central files:
```html
<!-- In <head> -->
<link rel="stylesheet" href="/assets/css/style.css" />

<!-- At bottom of <body> -->
<script src="/assets/js/main.js"></script>
```

### **3. Dynamic Header/Footer Injection**
Each page loads header and footer dynamically:
```html
<!-- In page HTML -->
<div id="navbar-placeholder"></div>
<div id="footer-placeholder"></div>

<!-- At end of page -->
<script>
  document.addEventListener('DOMContentLoaded', async () => {
    const headerRes = await fetch('/components/header.html');
    const headerHtml = await headerRes.text();
    document.getElementById('navbar-placeholder').innerHTML = headerHtml;
    
    // Same for footer...
  });
</script>
```

## 🎨 Design System

### **Color Palette**
- **Brand Dark:** `#1e2a3a` (charcoal – primary)
- **Brand Amber:** `#f59e0b` (accent color – highlights, CTAs)
- **Brand Orange:** `#d97706` (hover state)
- **Light:** `#f3f4f6` (section backgrounds)

### **Typography**
- **Display Font:** Barlow Condensed (headings, nav, emphasize)
- **Body Font:** Barlow (body text, readable)
- Custom font weights for hierarchy

### **Responsive Breakpoints**
- Mobile-first design
- Tailwind breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Hamburger menu on mobile, desktop nav on md+

## 📝 Content Management

### **Project Gallery Customization**
Edit project cards in `projects.html`:
```html
<div class="project-card" 
     data-title="Project Name"
     data-category="Residential|Commercial|Industrial"
     data-desc="Short project description"
     data-img="image-url">
  <img src="image-url" alt="..." />
  ...
</div>
```

### **Blog Post Creation**
1. Create new file: `/blog/article-name.html`
2. Use `/blog/sustainable-construction.html` as template
3. Update title, date, author, content
4. Add card to `/blog/index.html` listing

### **Team Members**
Edit team profiles in `about.html`:
```html
<div class="team-card">
  <div class="team-avatar">
    <img src="photo-url" alt="Name" />
  </div>
  <h3 class="team-name">Name</h3>
  <p class="team-role">Title</p>
  <p class="team-desc">Bio...)
</div>
```

## 🔄 Form Handling

### **Current Implementation**
Contact form includes client-side validation only. To actually send emails:

**Option 1: Formspree (Easiest)**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- fields stay the same -->
</form>
```

**Option 2: Netlify Forms**
1. Deploy site to Netlify
2. Add `netlify` attribute to form
3. Netlify automatically captures submissions

**Option 3: Backend Service**
Integrate with your backend (Node.js, PHP, Python) to:
- Validate & sanitize inputs
- Send emails via SMTP
- Store submissions in database

## 🛠️ Customization Guide

### **Update Company Details**
Search and replace throughout the site:
- Company name: `BuildMaster Construction`
- Email: `info@buildmaster.co.ke`
- Phone: `+254 700 123 456`
- Address: `12 Construction Avenue, Westlands, Nairobi`

### **Change Colors**
Edit Tailwind config in each page's `<head>`:
```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: {
            dark: '#YOUR_PRIMARY',
            amber: '#YOUR_ACCENT',
            // ...
          }
        }
      }
    }
  }
</script>
```

### **Add New Sections**
1. Create new page (e.g., `team.html`)
2. Copy structure from existing page
3. Update header/footer paths to absolute or relative
4. Add link in navbar (`components/header.html`)

### **Images**
- Currently using Unsplash CDN URLs for demo
- For production, download images locally (`assets/images/`)
- Update image `src` attributes to local paths
- Improves performance and gives better control

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile (< 640px):** Single column, stacked layout, hamburger menu
- **Tablet (640px – 1024px):** 2-column grids, visible nav
- **Desktop (> 1024px):** Full multi-column layouts, expanded features

Test responsiveness:
```bash
# Chrome DevTools: Ctrl+Shift+I (or Cmd+Option+I on Mac)
# Set device width via "Device Toolbar"
```

## ♿ Accessibility

All pages include:
- Semantic HTML (`<nav>`, `<section>`, `<article>`, etc.)
- ARIA labels for interactive elements
- Color contrast compliant with WCAG AA standards
- Keyboard navigation support
- Alt text on all images
- Form labels properly associated with inputs

## 🚢 Deployment

### **Netlify (Recommended)**
1. Push code to GitHub
2. Connect repo to Netlify
3. Set build command: (leave empty – no build needed)
4. Set publish directory: `/` (root)
5. Deploy!

### **Vercel**
Similar to Netlify – connects to Git repo and auto-deploys.

### **Traditional Hosting**
1. Purchase hosting & domain
2. Upload files via FTP
3. Set `index.html` as default
4. Configure SSL certificate

### **Important:** 
When deploying, adjust paths:
- Local testing: `/assets/css/style.css`
- If in subdirectory: `/your-site/assets/css/style.css`

## 📊 Performance Tips

1. **Optimize Images**
   - Use online tool: TinyPNG, ImageOptim
   - Target: < 300KB per image on web

2. **Minimize CSS/JS** (when ready for production)
   - Minify CSS: `cssnano`, `minify-css`
   - Minify JS: `terser`, `uglify-js`

3. **Enable Gzip Compression**
   - Most hosting providers do this by default

4. **Lazy Load Images**
   - Add `loading="lazy"` to `<img>` tags (already done)

5. **Cache Static Assets**
   - Set cache headers on hosting provider

## 🐛 Troubleshooting

### **Header/Footer Not Loading**
- Ensure paths are correct: `/components/header.html`
- Check browser console for errors (F12 → Console)
- Headers/footers won't load via `file://` protocol; use local server

### **Styles Not Applying**
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file path is correct
- Verify Tailwind CDN is loaded

### **Forms Not Validating**
- Check browser console for JavaScript errors
- Ensure field IDs match in HTML and JavaScript
- Test with different browsers

### **Navigation Active State Not Working**
- Check nav links have correct `href` attributes
- Verify IDs match section element IDs
- Mobile menu may override desktop state – check logic

## 📚 Resources

- **Tailwind CSS:** https://tailwindcss.com/docs
- **Font Awesome Icons:** https://fontawesome.com/icons
- **Google Maps Embed:** https://www.google.com/maps
- **MDN Web Docs:** https://developer.mozilla.org/

## 📄 License

All content and design are proprietary to BuildMaster Construction Ltd. Unauthorized reproduction is prohibited.

---

**Version:** 2.0 (Multi-Page Edition)
**Last Updated:** March 2025
**Built by:** BuildMaster Construction Team

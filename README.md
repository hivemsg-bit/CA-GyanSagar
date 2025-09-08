# CA-GyanSagar - Chartered Accountants Website

A modern, professional single-page website for Chartered Accountants (CA) in India, built with HTML5, CSS3, and JavaScript.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with support for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Bilingual Support**: English and Hindi language switching
- **Interactive Elements**: Modal popups, testimonial carousel, smooth scrolling
- **Contact Forms**: Netlify Forms integration for form submissions
- **SEO Optimized**: Semantic HTML structure and meta tags
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🎨 Design Specifications

### Color Palette
- **Primary Color**: #0052cc (Professional Blue)
- **Secondary Color**: #ff9f00 (Energetic Orange)
- **Background**: #f8f9fa (Light Grey)
- **Text**: #212529 (Dark Grey), #ffffff (White)

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body Text**: Open Sans (Google Fonts)

## 📁 Project Structure

```
ca-gyansagar/
├── index.html          # Main homepage
├── contact.html        # Contact page with form
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Setup Instructions

### 1. Local Development

1. **Clone or Download** the project files to your local machine
2. **Open** `index.html` in your web browser
3. **For development**, use a local server (recommended):
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx serve .
   
   # Using PHP (if installed)
   php -S localhost:8000
   ```

### 2. Netlify Deployment

#### Option A: Deploy via Netlify Dashboard
1. **Create a GitHub repository** and push your code
2. **Go to** [Netlify](https://netlify.com) and sign up/login
3. **Click** "New site from Git"
4. **Connect** your GitHub repository
5. **Deploy** - Netlify will automatically build and deploy your site

#### Option B: Drag & Drop Deployment
1. **Zip** all project files (index.html, contact.html, styles.css, script.js)
2. **Go to** [Netlify](https://netlify.com)
3. **Drag and drop** the zip file to the deploy area
4. **Your site** will be live instantly!

### 3. Netlify Forms Setup

The contact form is already configured for Netlify Forms. Here's what you need to do:

1. **Deploy** your site to Netlify
2. **Go to** your Netlify dashboard
3. **Navigate to** Forms section
4. **Test** the contact form by submitting a message
5. **Check** the Forms section to see submissions

#### Form Configuration Details:
- **Contact Form**: `contact.html` - configured with `data-netlify="true"`
- **Newsletter Form**: Both pages - configured with `data-netlify="true"`
- **Honeypot Protection**: Included to prevent spam

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## ⚡ Performance Features

- **Optimized Images**: Placeholder for future image optimization
- **Lazy Loading**: Ready for image lazy loading implementation
- **Minified Resources**: CSS and JS are optimized
- **CDN Resources**: Google Fonts and Font Awesome loaded from CDN

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0052cc;
    --secondary-color: #ff9f00;
    --background-color: #f8f9fa;
    --text-dark: #212529;
    --text-white: #ffffff;
}
```

### Adding New Sections
1. **Add HTML** structure in `index.html`
2. **Style** the section in `styles.css`
3. **Add JavaScript** functionality if needed in `script.js`

### Modifying Content
- **Text Content**: Edit directly in HTML files
- **Images**: Replace placeholder content with actual images
- **Contact Info**: Update in both `index.html` and `contact.html`

## 📧 Form Handling

### Contact Form Fields:
- Name (required)
- Email (required)
- Phone (optional)
- Subject (dropdown: General Query, Course Inquiry, Support, Partnership)
- Message (required)

### Newsletter Form:
- Email (required)

### Form Submissions:
- **Netlify Dashboard**: View all form submissions
- **Email Notifications**: Configure in Netlify settings
- **Spam Protection**: Honeypot field included

## 🚀 Future Enhancements

- **Authentication**: Add user login/registration functionality
- **Course Management**: Integrate course booking system
- **Payment Gateway**: Add payment processing
- **Blog Section**: Add news and updates
- **Student Portal**: Create student dashboard
- **Live Chat**: Add customer support chat
- **Analytics**: Integrate Google Analytics
- **PWA**: Convert to Progressive Web App

## 📞 Support

For technical support or customization requests:
- **Email**: support@cagyansagar.com
- **Phone**: +91 98765 43210

## 📄 License

This project is created for CA-GyanSagar. All rights reserved.

---

**Built with ❤️ for CA aspirants in India**

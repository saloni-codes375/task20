# FreshFold – Laundry Service Web App

A responsive vanilla HTML, CSS and JavaScript laundry-service booking project based on the supplied reference screenshots.

## Features
- Responsive navbar with Home, Services, About Us and Contact Us links
- Hero section with a button that scrolls to the booking area
- Achievement strip (15+, 240+, 2+ years)
- Six laundry services with add/remove cart functionality
- Live cart list and automatically calculated total
- Booking form with name, email and phone validation
- Email confirmation integration using EmailJS
- Booking success message
- Newsletter subscription interaction
- Responsive layout for mobile and desktop

## Run the project
1. Extract the ZIP.
2. Open the `task22_laundry_service` folder in VS Code.
3. Open `index.html` with Live Server (recommended), or open it directly in a browser.
4. No npm install or build command is required.

## Configure EmailJS (required for real emails)
The booking flow works in demo mode before configuration. To send a real confirmation email:

1. Create/sign in to an account at https://www.emailjs.com/
2. Add an Email Service and connect the inbox where you want to receive booking details.
3. Create an Email Template. Add these template variables:
   - `{{customer_name}}`
   - `{{customer_email}}`
   - `{{phone_number}}`
   - `{{order_items}}`
   - `{{total_amount}}`
   - `{{reply_to}}`
4. In `script.js`, replace the three placeholder values in `EMAILJS_CONFIG`:
   - `YOUR_EMAILJS_PUBLIC_KEY`
   - `YOUR_EMAILJS_SERVICE_ID`
   - `YOUR_EMAILJS_TEMPLATE_ID`
5. In the EmailJS template, set the recipient (`To Email`) to your own email address (or use `{{to_email}}` if your template configuration supports it).
6. Save and test a booking.

**Important:** Never put a private EmailJS access token or password in frontend code. Use only the EmailJS public key in this browser-based project. The actual email cannot be sent until you add your own EmailJS service and template IDs.

## Project structure
```text
task22_laundry_service/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── reference-home.jpg
    ├── reference-services-booking.jpg
    └── reference-quality-footer.jpg
```

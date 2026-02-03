# 🔒 Prototype Access Information

## Access Code
**Password:** `prototype2026`

## How to Share with Test Participants

Send them this message:

---

**Subject: Research Prototype Access**

Hi [Participant Name],

Thank you for participating in our research study. Here's how to access the prototype:

**URL:** [Your Vercel URL will be here after deployment]

**Access Code:** `prototype2026`

**Instructions:**
1. Click the link above
2. Enter the access code when prompted
3. Explore the prototype as discussed

**Important:**
- This is a research prototype for testing purposes only
- Please do not share this link or access code with others
- Your session will remain active until you close your browser

If you have any issues accessing the prototype, please contact us.

---

## Changing the Password

To change the access code:
1. Open `src/components/Auth/PasswordProtection.tsx`
2. Update line 8: `const CORRECT_PASSWORD = 'your-new-password';`
3. Commit and push the changes

## Security Features

✅ Password protection on app load
✅ Session-based authentication (clears on browser close)
✅ Private GitHub repository
✅ robots.txt prevents search engine indexing
✅ Clean, professional access screen

## Notes

- Password is stored in the code (not a backend) - this is intentional for simplicity
- Authentication persists only during browser session
- Participants don't need to create accounts
- Simple and fast for user testing scenarios

# Software Requirements Specification (SRS)

## 1. Functional Requirements

### FR-01: Public Landing Page
- System MUST render dynamic content (programs, news, teachers) fetched from Sanity Headless CMS.
- System MUST load images with responsive WebP/AVIF formats.

### FR-02: Lead Generation / Inquiry
- System MUST validate user inputs (Parent Name, Child Age, Phone, Email) on the server side using `zod`.
- System MUST insert validated inquiry data into the Supabase `inquiries` table.
- System MUST trigger an automated email via Resend API to the school admin and confirmation email to the parent upon form submission.

### FR-03: Direct Communication
- System MUST provide a floating CTA button linking directly to WhatsApp API with a pre-filled greeting message.

## 2. Non-Functional Requirements
- **Security:** Strict Row-Level Security (RLS) on Supabase database. API Keys stored securely in Vercel Environment Variables.
- **Accessibility:** WCAG 2.1 AA compliance for color contrast and font readability.
- **SEO:** Automated dynamic sitemap and structured data schemas.
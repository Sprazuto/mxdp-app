# 04. CMS & Database Schema

## 1. Sanity.io Schema (Headless Content)

### Schema: `siteSettings`
- `schoolName`: string
- `tagline`: string
- `phone`: string
- `whatsappNumber`: string
- `email`: string
- `address`: text
- `socialMedia`: object (instagram, facebook, youtube)

### Schema: `program`
- `title`: string (e.g., "Playgroup", "Kindergarten A")
- `ageRange`: string (e.g., "2 - 3 Years")
- `description`: text
- `features`: array of strings
- `coverImage`: image

### Schema: `facility`
- `title`: string
- `description`: text
- `iconOrPhoto`: image
- `category`: string (e.g., "Safety", "Playground", "Learning")

### Schema: `teacher`
- `name`: string
- `role`: string
- `photo`: image
- `bio`: text

---

## 2. Supabase PostgreSQL Schema (Structured Leads & Inquiries)

```sql
-- Table: public.inquiries
CREATE TABLE public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    child_name VARCHAR(255),
    child_age VARCHAR(50),
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    preferred_visit_date DATE,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'NEW' -- Options: NEW, CONTACTED, SCHEDULED, ARCHIVED
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public anonymous users to insert inquiry data
CREATE POLICY "Allow public insert to inquiries" 
ON public.inquiries FOR INSERT 
TO anon 
WITH CHECK (true);
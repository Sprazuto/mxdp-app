-- Migration: 01_inquiries.sql
-- Description: Create inquiries table with RLS policies for public insert access

-- Create the inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    parent_name TEXT NOT NULL,
    child_name TEXT,
    child_age TEXT,
    phone_number TEXT NOT NULL,
    email TEXT,
    preferred_visit_date DATE,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'NEW'
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous (public) users to INSERT inquiries
-- This is used by the contact form on the public website
CREATE POLICY "Allow public insert on inquiries"
    ON public.inquiries
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Allow authenticated users to SELECT their own inquiries (optional, for future admin dashboard)
CREATE POLICY "Allow authenticated select on inquiries"
    ON public.inquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Allow authenticated users to UPDATE inquiries (optional, for future admin dashboard)
CREATE POLICY "Allow authenticated update on inquiries"
    ON public.inquiries
    FOR UPDATE
    TO authenticated
    USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, UPDATE ON public.inquiries TO authenticated;
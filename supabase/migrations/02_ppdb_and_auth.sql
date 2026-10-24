-- Migration: 02_ppdb_and_auth.sql
-- Description: Create registrations table for PPDB with RLS policies for public insert

-- Create the registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    registration_number TEXT UNIQUE NOT NULL,
    parent_name TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    parent_email TEXT,
    child_full_name TEXT NOT NULL,
    child_nickname TEXT,
    child_dob DATE NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('L', 'P')),
    program_applied TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'VERIFIED', 'ACCEPTED', 'REJECTED')),
    notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous (public) users to INSERT registrations
-- This is used by the PPDB registration form on the public website
CREATE POLICY "Allow public insert on registrations"
    ON public.registrations
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Allow authenticated users to SELECT registrations (for admin dashboard)
CREATE POLICY "Allow authenticated select on registrations"
    ON public.registrations
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Allow authenticated users to UPDATE registrations (for admin status changes)
CREATE POLICY "Allow authenticated update on registrations"
    ON public.registrations
    FOR UPDATE
    TO authenticated
    USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.registrations TO anon;
GRANT SELECT, UPDATE ON public.registrations TO authenticated;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_program ON public.registrations(program_applied);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_registration_number ON public.registrations(registration_number);
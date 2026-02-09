-- Create the contact_messages table
CREATE TABLE public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create Policy to allow anyone (anon) to insert messages
CREATE POLICY "Allow public insert access" 
ON public.contact_messages 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Create Policy to allow authenticated users to insert messages (redundant if public is open, but good for clarity)
-- Note: 'public' role includes authenticated users, so the above policy covers both. 
-- However, we can restrict viewing if needed.

-- Create Policy to allow users to view their own messages (optional, if we want a history later)
CREATE POLICY "Allow users to view own messages" 
ON public.contact_messages 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Create Policy to allow service_role to view all (for admin dashboard later)
-- CREATE POLICY "Allow service_role to view all" 
-- ON public.contact_messages 
-- FOR ALL 
-- TO service_role 
-- USING (true);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wzgokqvrvrjburbydaxg.supabase.co';
const supabaseKey = 'sb_publishable_4wiqMNNS9MCjHTVqTBy-DA_pLsSzPE8';

// WARNING: 'sb_publishable_' key format is unusual for standard Supabase Anon keys.
// If connection fails, please check if you have the standard 'anon' key starting with 'eyJ...'.
// Proceeding with provided key.

export const supabase = createClient(supabaseUrl, supabaseKey);

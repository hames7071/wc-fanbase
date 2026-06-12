-- Create the main users table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  submission_id text unique not null,
  email text not null,
  whatsapp_no text not null,
  daily_score integer default 0,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable public storage bucket for profile pictures
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true);

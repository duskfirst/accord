# Accord

Yet another chat application.

# Setup

### Package Installation

Install packages with pnpm

```
pnpm i
```

### Supabase

- Create your supabase account if you don't have one [here](https://supabase.com/dashboard/sign-in?)

- Create a new project [here](https://supabase.com/dashboard/projects)

- Under `Project Settings > API > API Settings`, copy your project url and anon public key and save them in `env.local`

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_secret_key
```

#### Email Templates

Under `Authentication > Configuration > Email Templates`

- Change the Subject heading to
    ` Confirm Your Email `

- Change the Message Body Source to
    ```md
    <h2>Confirm your email</h2>

    Your confirmation code is <span class='font-size: 3rem'><b>{{ .Token }}</b></span>
    ```

> **NOTE:** It is important that you have `{{ .Token }}` in the email body or the user will not receive the OTP. The built-in email service has a rate limit of [3 per hour](https://supabase.com/docs/guides/platform/going-into-prod#auth-rate-limits). Setup a custom SMTP server if you are planning on having a large number of users. 

#### Tables

##### `profiles`

```sql

-- Case insensitive text
create extension if not exists citext;

-- Create a table for public profiles
create table profiles (
    id uuid references auth.users on delete cascade not null primary key,
    email varchar(255) not null unique,
    updated_at timestamp with time zone,
    username citext unique,
    display_name text,
    avatar_url text,
    website text,
    email_confirmed_at timestamptz,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
    enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
    for select using (true);

create policy "Users can insert their own profile." on profiles
    for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, username, email, email_confirmed_at)
    values (new.id, new.raw_user_meta_data ->> 'username', new.email, new.email_confirmed_at);
    return new;
end;
$$;

create function public.email_confirmed_at_fn() 
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    update public.profiles set profiles.email_confirmed_at = new.email_confirmed_at where profiles.id = new.id;
    return new;
end;
$$;

create trigger email_confirmed_at_trigger after update
    on auth.users
    for each row
    when (old.email_confirmed_at is distinct from new.email_confirmed_at)
    execute function email_confirmed_at_fn();

-- trigger the function every time a user is created
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
    for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
    for insert with check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
    for update using ((select auth.uid()) = owner) with check (bucket_id = 'avatars');
```

### Run Dev Server

```
pnpm run dev
```

### Build and Run

```
pnpm run build
pnpm run start
```

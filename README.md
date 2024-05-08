# Accord

Yet another chat application.

# Setup

### Package Installation

Install packages with npm

```
npm i
```

### Supabase

- Create your supabase account if you don't have one [here](https://supabase.com/dashboard/sign-in?)

- Create a new project [here](https://supabase.com/dashboard/projects)

- Under `Project Settings > API > API Settings`, copy your project url, `anon` and `service_role` keys and save them in `env.local`

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_service_role_key
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

> **NOTE:** It is important that you have `{{ .Token }}` in the email body or the user will not receive the OTP. The built-in email service has a rate limit of [3 per hour](https://supabase.com/docs/guides/platform/going-into-prod#auth-rate-limits). Setup a custom SMTP server if you are planning on having a large number of users under `Project Settings > Configuration > Authentication > SMTP Settings`

#### Database Setup

Run the following code in the `SQL Editor`

```sql

-- Case insensitive text
create extension if not exists citext;

-- Create a table for public profile
create table profile (
    id uuid references auth.users on delete cascade not null primary key,
    email varchar(255) not null unique,
    username citext unique,
    display_name text,
    avatar_url text,
    header_url text,
    website text,
    email_confirmed_at timestamptz,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profile
    enable row level security;

create policy "Public profiles are viewable by everyone." on profile
    for select using (true);

-- However email and email_confirmed_at should not be seen by anon
revoke update, select, delete on table public.profile from anon;
grant select(avatar_url, display_name, id, username, website) on table public.profile to anon;

create policy "Users can insert their own profile." on profile
    for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profile
  for update using ((select auth.uid()) = id);

-- inserts a row into public.profile
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profile (id, username, email, email_confirmed_at)
    values (new.id, new.raw_user_meta_data ->> 'username', new.email, new.email_confirmed_at);
    return new;
end;
$$;

create or replace function email_confirmed_at_fn()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    update public.profile set email_confirmed_at = new.email_confirmed_at where id = new.id;
    return new;
end;
$$;

create or replace trigger email_confirmed_at_trigger after update
    on auth.users
    for each row
    when (old.email_confirmed_at is distinct from new.email_confirmed_at)
    execute function email_confirmed_at_fn();

-- trigger the function every time a user is created
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Set up Storage
insert into storage.buckets (id, name, public)
  values ('media', 'media', true);

create policy "Media select" on storage.objects
    for select using (bucket_id = 'media');

create policy "Media insert" on storage.objects
    for insert with check (bucket_id = 'media');

create policy "Media update" on storage.objects
    for update using ((select auth.uid()) = owner) with check (bucket_id = 'media');

-- Conversation Table

create table conversation (
    id uuid not null primary key,
    one uuid not null references profile on delete cascade,
    another uuid not null references profile on delete cascade,
    created_at timestamp,
    unique(one, another)
);

-- Message Table

create table message (
    id bigserial not null primary key,
    conversation uuid not null references conversation on delete cascade,
    content text,
    file_url text,
    file_type text,
    sent_at timestamp,
    sent_by uuid not null references profile on delete cascade,
    edited bool default false,
    deleted bool default false
);

alter table message
    enable row level security;

create policy "Members can create a message" on message
    for insert with check(auth.uid() = sent_by);
    
create policy "Members can view their conversation messages" on message
    for select using (
        exists (
            select true from conversation
                where conversation.id = message.conversation and (conversation.one = auth.uid() or conversation.another = auth.uid())
        )
    );

create policy "Sender can update the message" on message
    for update using (auth.uid() = sent_by);

```

### Run Dev Server

```
npm run dev
```

### Build and Run

```
npm run build
npm run start
```

On windows:

```
npm run build
npm run start:win
```
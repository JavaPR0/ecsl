# supabase-sveltekit

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

You may need to update you `.env` file

## Database

Create table for Districts

```sql
create table
  public.districts (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    district_name text null,
    constraint districts_pkey primary key (id)
  ) tablespace pg_default;
```
Create table for Political Parties

```sql
create table
  public.political_parties (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    party_name text null,
    party_colour text null,
    constraint political_parties_pkey primary key (id)
  ) tablespace pg_default;
```
Create table for results

```sql
create table
  public.results (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    agent_id uuid null,
    political_party_id uuid null,
    district text null,
    total_votes integer null,
    district_id uuid null,
    constraint results_pkey primary key (id),
    constraint results_agent_id_fkey foreign key (agent_id) references profiles (id) on delete restrict,
    constraint results_district_id_fkey foreign key (district_id) references districts (id),
    constraint results_political_party_id_fkey foreign key (political_party_id) references political_parties (id) on delete restrict
  ) tablespace pg_default;
```
Create table for users

```sql
create table
  public.profiles (
    id uuid not null,
    updated_at timestamp with time zone null,
    username text null,
    full_name text null,
    avatar_url text null,
    website text null,
    political_party_id uuid null,
    district_id uuid null,
    user_role text null default 'agent'::text,
    constraint profiles_pkey primary key (id),
    constraint profiles_username_key unique (username),
    constraint profiles_district_id_fkey foreign key (district_id) references districts (id),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade,
    constraint profiles_political_party_id_fkey foreign key (political_party_id) references political_parties (id),
    constraint username_length check ((char_length(username) >= 3))
  ) tablespace pg_default;
```
You need to edit the `handle_new_user` function

In the supabase dashboard, click Database > Functions.

Edit `handle_new_user` function with the code below:

```
begin
  insert into public.profiles (id, full_name, avatar_url, political_party_id, district_id)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', (new.raw_user_meta_data->>'political_party_id')::uuid, (new.raw_user_meta_data->>'district_id')::uuid);
  return new;
end;
```

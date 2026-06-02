-- ============================================================
-- Quiz multijoueur (salon de groupe) — Maths GR2
-- À coller dans Supabase > SQL Editor > Run (une seule fois).
-- ============================================================

-- Salons de jeu
create table if not exists public.rooms (
  code        text primary key,
  host_id     uuid not null references auth.users(id) on delete cascade,
  status      text not null default 'lobby',   -- 'lobby' | 'playing' | 'finished'
  q_index     int  not null default -1,
  questions   jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

-- Joueurs dans un salon
create table if not exists public.room_players (
  id           bigint generated always as identity primary key,
  code         text not null,
  user_id      uuid not null references auth.users(id) on delete cascade,
  pseudo       text not null,
  score        int  not null default 0,
  answered_idx int  not null default -1,
  joined_at    timestamptz not null default now(),
  unique (code, user_id)
);
create index if not exists room_players_code_idx on public.room_players (code);

alter table public.rooms        enable row level security;
alter table public.room_players enable row level security;

-- rooms : lecture publique ; seul l'hôte crée/modifie/supprime SON salon
drop policy if exists "rooms_read"        on public.rooms;
drop policy if exists "rooms_insert_host" on public.rooms;
drop policy if exists "rooms_update_host" on public.rooms;
drop policy if exists "rooms_delete_host" on public.rooms;
create policy "rooms_read"        on public.rooms for select using (true);
create policy "rooms_insert_host" on public.rooms for insert with check (auth.uid() = host_id);
create policy "rooms_update_host" on public.rooms for update using (auth.uid() = host_id);
create policy "rooms_delete_host" on public.rooms for delete using (auth.uid() = host_id);

-- room_players : lecture publique ; chacun gère SA ligne
drop policy if exists "rp_read"       on public.room_players;
drop policy if exists "rp_insert_own" on public.room_players;
drop policy if exists "rp_update_own" on public.room_players;
drop policy if exists "rp_delete_own" on public.room_players;
create policy "rp_read"       on public.room_players for select using (true);
create policy "rp_insert_own" on public.room_players for insert with check (auth.uid() = user_id);
create policy "rp_update_own" on public.room_players for update using (auth.uid() = user_id);
create policy "rp_delete_own" on public.room_players for delete using (auth.uid() = user_id);

-- Temps réel (ré-exécutable sans erreur)
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='rooms')
    then alter publication supabase_realtime add table public.rooms; end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='room_players')
    then alter publication supabase_realtime add table public.room_players; end if;
end $$;

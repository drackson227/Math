-- ============================================================
-- Classement (leaderboard XP) — Chat/Quiz Maths GR2
-- À coller dans Supabase > SQL Editor > Run (une seule fois).
-- Chaque élève met à jour SON XP ; tout le monde peut voir le Top 10.
-- ============================================================

create table if not exists public.leaderboard (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  pseudo      text not null,
  xp          integer not null default 0,
  updated_at  timestamptz not null default now()
);

alter table public.leaderboard enable row level security;

-- Tout le monde peut LIRE le classement
drop policy if exists "lb_read" on public.leaderboard;
create policy "lb_read" on public.leaderboard
  for select using (true);

-- On ne peut écrire/mettre à jour QUE sa propre ligne
drop policy if exists "lb_insert_own" on public.leaderboard;
create policy "lb_insert_own" on public.leaderboard
  for insert with check (auth.uid() = user_id);

drop policy if exists "lb_update_own" on public.leaderboard;
create policy "lb_update_own" on public.leaderboard
  for update using (auth.uid() = user_id);

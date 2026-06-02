-- ============================================================
-- Chat Mondial Maths GR2 — à coller dans Supabase > SQL Editor > Run
-- (une seule fois). Crée la table des messages, la sécurité (RLS)
-- et active le temps réel. Le créateur (pseudo "drackson227") peut modérer.
-- ============================================================

-- 1) Table des messages
create table if not exists public.messages (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  pseudo      text not null,
  body        text not null check (char_length(body) <= 2000),
  kind        text not null default 'text',   -- 'text' ou 'image'
  created_at  timestamptz not null default now()
);

create index if not exists messages_created_idx on public.messages (created_at);

-- 2) Sécurité : Row Level Security
alter table public.messages enable row level security;

-- Tout le monde (connecté) peut LIRE le salon
drop policy if exists "chat_read" on public.messages;
create policy "chat_read" on public.messages
  for select using (true);

-- On ne peut écrire QUE sous son propre compte
drop policy if exists "chat_insert_own" on public.messages;
create policy "chat_insert_own" on public.messages
  for insert with check (auth.uid() = user_id);

-- On peut supprimer SES messages — et le créateur peut tout modérer
drop policy if exists "chat_delete_own_or_admin" on public.messages;
create policy "chat_delete_own_or_admin" on public.messages
  for delete using (
    auth.uid() = user_id
    or auth.jwt() ->> 'email' = 'drackson227@mathsgr2.app'
  );

-- 3) Activer le temps réel (les nouveaux messages apparaissent en direct)
--    (ré-exécutable sans erreur : on n'ajoute que si pas déjà présent)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;
end $$;

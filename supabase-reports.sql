-- ============================================================
-- Signalement de messages (modération communautaire) — Chat Maths GR2
-- À coller dans Supabase > SQL Editor > Run (une seule fois).
-- Un message signalé par 3 personnes différentes se masque tout seul côté site.
-- ============================================================

create table if not exists public.message_reports (
  id          bigint generated always as identity primary key,
  message_id  bigint not null references public.messages(id) on delete cascade,
  reporter_id uuid   not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (message_id, reporter_id)   -- un seul signalement par personne et par message
);
create index if not exists message_reports_msg_idx on public.message_reports (message_id);

alter table public.message_reports enable row level security;

-- Tout le monde peut LIRE les signalements (pour compter et masquer)
drop policy if exists "mr_read" on public.message_reports;
create policy "mr_read" on public.message_reports for select using (true);

-- On ne peut signaler que sous SON propre compte
drop policy if exists "mr_insert_own" on public.message_reports;
create policy "mr_insert_own" on public.message_reports
  for insert with check (auth.uid() = reporter_id);

-- Temps réel (ré-exécutable sans erreur)
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='message_reports')
    then alter publication supabase_realtime add table public.message_reports; end if;
end $$;

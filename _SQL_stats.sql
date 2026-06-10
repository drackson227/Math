-- ============================================================
-- STATS — table "activity" (historique des connexions)
-- À exécuter UNE SEULE FOIS : Supabase → SQL Editor → coller → Run.
-- Sert à l'onglet "📊 Stats (admin)" du site (fichier stats.js).
--
-- Sans ce script, le panneau "En direct" (présence temps réel) marche déjà.
-- Ce script ajoute en plus : total de comptes + dernière connexion de chacun.
--
-- Sécurité : chaque élève ne peut écrire QUE sa propre ligne.
-- Seul le créateur (drackson227) peut TOUT lire.
-- ============================================================

-- 1) La table
create table if not exists public.activity (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  pseudo     text,
  subject    text,
  device     text,
  last_seen  timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- 2) Activer la sécurité au niveau des lignes (RLS)
alter table public.activity enable row level security;

-- 3) Politiques (on supprime d'abord les anciennes pour pouvoir relancer le script sans erreur)
drop policy if exists "activity self upsert"  on public.activity;
drop policy if exists "activity self update"  on public.activity;
drop policy if exists "activity read own"     on public.activity;
drop policy if exists "activity admin read"   on public.activity;

-- Chacun peut CRÉER sa propre ligne
create policy "activity self upsert" on public.activity
  for insert with check (auth.uid() = user_id);

-- Chacun peut METTRE À JOUR sa propre ligne
create policy "activity self update" on public.activity
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Chacun peut LIRE sa propre ligne
create policy "activity read own" on public.activity
  for select using (auth.uid() = user_id);

-- Le créateur peut TOUT LIRE (identifié par son email technique)
create policy "activity admin read" on public.activity
  for select using ((auth.jwt() ->> 'email') = 'drackson227@mathsgr2.app');

-- Terminé ✅

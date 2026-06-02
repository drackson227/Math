-- ============================================================
-- Stockage des images/GIF envoyés depuis la galerie — Chat Mondial
-- À coller dans Supabase > SQL Editor > Run (une seule fois).
-- Crée l'espace de stockage "chat-media" (public) + les règles d'accès.
-- ============================================================

-- 1) Créer le "bucket" (espace de stockage) public
insert into storage.buckets (id, name, public)
values ('chat-media', 'chat-media', true)
on conflict (id) do update set public = true;

-- 2) Tout le monde peut VOIR les images (lecture publique)
drop policy if exists "chat_media_read" on storage.objects;
create policy "chat_media_read" on storage.objects
  for select using (bucket_id = 'chat-media');

-- 3) Seules les personnes connectées peuvent ENVOYER une image
drop policy if exists "chat_media_insert" on storage.objects;
create policy "chat_media_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'chat-media');

-- 4) Chacun peut supprimer SES propres fichiers (le 1er dossier = son user_id)
drop policy if exists "chat_media_delete_own" on storage.objects;
create policy "chat_media_delete_own" on storage.objects
  for delete to authenticated using (
    bucket_id = 'chat-media' and (storage.foldername(name))[1] = auth.uid()::text
  );

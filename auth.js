/* ============================================================
   auth.js — Comptes utilisateurs + sauvegarde cloud (Supabase)
   Clé "anon public" : sans danger dans le navigateur (RLS activé côté Supabase).
   Tout est défensif : si pas de réseau / SDK absent → le site reste 100% local.
   ============================================================ */
const SUPABASE_URL  = 'https://uaaxadnzquijquhiwkdf.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYXhhZG56cXVpanF1aGl3a2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDA5MDIsImV4cCI6MjA5NTkxNjkwMn0.rdf5MjChi0vYSBNUaubXUR99QUTrcDIX7HYh83lPrQI';

let _sb = null;
let _authUser = null;
try { if (window.supabase && window.supabase.createClient) _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON); } catch (e) { console.warn('Supabase non initialise:', e); }

function authAvailable() { return !!_sb; }

// UI : bouton de nav
// On se connecte par PSEUDO. En interne, Supabase a besoin d'un "email" :
// on fabrique donc un email technique pseudo@mathsgr2.app (invisible pour l'élève).
const PSEUDO_DOMAIN = '@mathsgr2.app';
function pseudoToEmail(p) { return p.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '') + PSEUDO_DOMAIN; }
function emailToPseudo(e) { return (e || '').split('@')[0]; }

function refreshAuthBtn() {
  const btn = document.getElementById('auth-nav-btn');
  if (!btn) return;
  if (_authUser) {
    btn.textContent = '👤 ' + emailToPseudo(_authUser.email);
  } else {
    btn.textContent = '👤 Connexion';
  }
}

function openAuthModal() {
  if (!authAvailable()) { if (typeof showToast === 'function') showToast('Connexion indisponible hors-ligne', '#f87171'); return; }
  if (_authUser) { openAccountModal(); return; }
  let ov = document.getElementById('auth-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'auth-overlay';
    ov.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.88); z-index:3600; display:flex; align-items:center; justify-content:center; padding:1rem;';
    ov.innerHTML =
      '<div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:20px; padding:1.9rem 1.6rem; max-width:400px; width:100%; box-shadow:0 20px 60px rgba(0,0,0,0.5);">' +
        '<div style="text-align:center; font-size:40px; margin-bottom:0.3rem;">👤</div>' +
        '<h3 id="auth-title" style="text-align:center; font-size:21px; font-weight:800; color:var(--color-nav); margin:0 0 0.3rem;">Connexion</h3>' +
        '<p style="text-align:center; color:var(--text-secondary); font-size:13px; margin:0 0 1.25rem;">Retrouve ta progression sur tous tes appareils.</p>' +
        '<input id="auth-email" type="text" placeholder="Ton pseudo" autocomplete="username" style="width:100%; box-sizing:border-box; padding:12px; margin-bottom:0.6rem; border-radius:10px; border:1px solid var(--border-subtle); background:var(--bg-main); color:var(--text-primary); font-size:15px;">' +
        '<input id="auth-pass" type="password" placeholder="Mot de passe (min. 6 caracteres)" autocomplete="current-password" style="width:100%; box-sizing:border-box; padding:12px; margin-bottom:0.9rem; border-radius:10px; border:1px solid var(--border-subtle); background:var(--bg-main); color:var(--text-primary); font-size:15px;">' +
        '<button id="auth-submit" onclick="authSubmit()" style="width:100%; padding:13px; border-radius:12px; border:none; background:var(--color-nav); color:#fff; font-weight:700; font-size:15px; cursor:pointer; margin-bottom:0.7rem;">Se connecter</button>' +
        '<p id="auth-msg" style="text-align:center; font-size:13px; min-height:18px; margin:0 0 0.7rem;"></p>' +
        '<p style="text-align:center; font-size:13px; color:var(--text-secondary); margin:0;"><span id="auth-switch-txt">Pas encore de compte ?</span> <a id="auth-switch" href="#" onclick="authToggleMode(event)" style="color:var(--color-nav); font-weight:600;">Creer un compte</a></p>' +
        '<button onclick="closeAuthModal()" style="display:block; margin:1rem auto 0; background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-size:13px;">✕ Fermer</button>' +
      '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) closeAuthModal(); });
  }
  ov.dataset.mode = 'signin';
  document.getElementById('auth-msg').textContent = '';
  ov.style.display = 'flex';
  const em = document.getElementById('auth-email'); if (em) em.focus();
}
function closeAuthModal() { const o = document.getElementById('auth-overlay'); if (o) o.style.display = 'none'; }

function authToggleMode(e) {
  if (e) e.preventDefault();
  const ov = document.getElementById('auth-overlay');
  const signup = ov.dataset.mode !== 'signup';
  ov.dataset.mode = signup ? 'signup' : 'signin';
  document.getElementById('auth-title').textContent = signup ? 'Creer un compte' : 'Connexion';
  document.getElementById('auth-submit').textContent = signup ? 'Creer mon compte' : 'Se connecter';
  document.getElementById('auth-switch-txt').textContent = signup ? 'Deja un compte ?' : 'Pas encore de compte ?';
  document.getElementById('auth-switch').textContent = signup ? 'Se connecter' : 'Creer un compte';
  document.getElementById('auth-msg').textContent = '';
}

function _setAuthMsg(txt, ok) {
  const m = document.getElementById('auth-msg'); if (!m) return;
  m.textContent = txt; m.style.color = ok ? 'var(--color-parabole)' : '#f87171';
}

async function authSubmit() {
  const ov = document.getElementById('auth-overlay');
  const pseudo = (document.getElementById('auth-email').value || '').trim();
  const pass = document.getElementById('auth-pass').value || '';
  if (pseudo.length < 3 || pass.length < 6) { _setAuthMsg('Pseudo (3 car. min) + mot de passe (6 car. min).', false); return; }
  const email = pseudoToEmail(pseudo);
  const btn = document.getElementById('auth-submit'); btn.disabled = true;
  try {
    if (ov.dataset.mode === 'signup') {
      const res = await _sb.auth.signUp({ email: email, password: pass });
      if (res.error) throw res.error;
      if (res.data.user && !res.data.session) { _setAuthMsg('✅ Compte cree ! Tu peux maintenant te connecter.', true); }
      else { await _onLoggedIn(res.data.user); }
    } else {
      const res = await _sb.auth.signInWithPassword({ email: email, password: pass });
      if (res.error) throw res.error;
      await _onLoggedIn(res.data.user);
    }
  } catch (err) {
    let msg = err.message || 'Erreur';
    if (/invalid login/i.test(msg)) msg = 'Pseudo ou mot de passe incorrect.';
    if (/already registered/i.test(msg)) msg = 'Ce pseudo est deja pris.';
    if (/confirm/i.test(msg)) msg = 'Compte en attente de validation.';
    _setAuthMsg('❌ ' + msg, false);
  } finally { btn.disabled = false; }
}

async function _onLoggedIn(user) {
  _authUser = user;
  refreshAuthBtn();
  closeAuthModal();
  if (typeof showToast === 'function') showToast('👤 Connecte !', 'var(--color-parabole)');
  if (typeof window.onAuthChanged === 'function') { try { window.onAuthChanged(); } catch (e) {} }
  await pullProgressFromCloud();
}

function openAccountModal() {
  let ov = document.getElementById('account-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'account-overlay';
    ov.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.88); z-index:3600; display:flex; align-items:center; justify-content:center; padding:1rem;';
    ov.innerHTML =
      '<div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:20px; padding:1.9rem 1.6rem; max-width:380px; width:100%; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.5);">' +
        '<div style="font-size:40px; margin-bottom:0.4rem;">👤</div>' +
        '<h3 style="font-size:19px; font-weight:800; color:var(--color-nav); margin:0 0 0.3rem;">Mon compte</h3>' +
        '<p id="account-email" style="color:var(--text-secondary); font-size:14px; margin:0 0 1.25rem;"></p>' +
        '<button onclick="cloudPushNow()" style="width:100%; padding:11px; border-radius:10px; border:1px solid var(--color-parabole); background:transparent; color:var(--color-parabole); font-weight:600; cursor:pointer; margin-bottom:0.6rem;">☁️ Sauvegarder maintenant</button>' +
        '<button onclick="authSignOut()" style="width:100%; padding:11px; border-radius:10px; border:1px solid #f87171; background:transparent; color:#f87171; font-weight:600; cursor:pointer;">🚪 Se deconnecter</button>' +
        '<button onclick="closeAccountModal()" style="display:block; margin:1rem auto 0; background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-size:13px;">✕ Fermer</button>' +
      '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) closeAccountModal(); });
  }
  document.getElementById('account-email').textContent = _authUser ? ('Pseudo : ' + emailToPseudo(_authUser.email)) : '';
  ov.style.display = 'flex';
}
function closeAccountModal() { const o = document.getElementById('account-overlay'); if (o) o.style.display = 'none'; }

async function authSignOut() {
  try { await _sb.auth.signOut(); } catch (e) {}
  _authUser = null;
  refreshAuthBtn();
  closeAccountModal();
  if (typeof window.onAuthChanged === 'function') { try { window.onAuthChanged(); } catch (e) {} }
  if (typeof showToast === 'function') showToast('A bientot 👋', 'var(--color-nav)');
}

/* Accesseurs pour le Chat Mondial (chat.js) — pseudo uniquement, jamais le mot de passe. */
window.MGR2Auth = {
  sb: function () { return _sb; },
  user: function () { return _authUser; },
  pseudo: function () { return _authUser ? emailToPseudo(_authUser.email) : null; },
  openLogin: function () { try { openAuthModal(); } catch (e) {} }
};

// Synchronisation de la progression (table "progress")
async function pullProgressFromCloud() {
  if (!_sb || !_authUser) return;
  try {
    const res = await _sb.from('progress').select('data').eq('user_id', _authUser.id).maybeSingle();
    if (res.error) throw res.error;
    if (res.data && res.data.data) {
      localStorage.setItem('mathsgr2_data', JSON.stringify(res.data.data));
      if (typeof updateProfile === 'function') { try { updateProfile(); } catch (e) {} }
      if (typeof showToast === 'function') showToast('☁️ Progression chargee', 'var(--color-parabole)');
    } else {
      await cloudPushNow(true);
    }
  } catch (e) { console.warn('pull cloud:', e.message); }
}

let _pushTimer = null;
function cloudPushDebounced() {
  if (!_sb || !_authUser) return;
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(function () { _pushTimer = null; cloudPushNow(true); }, 2500);
}
// Si l'élève quitte l'onglet (change d'app sur téléphone, ferme…) alors qu'un push
// différé est en attente, on l'envoie tout de suite — sinon la progression resterait
// périmée dans le cloud et un autre appareil chargerait une vieille version.
document.addEventListener('visibilitychange', function () {
  if (document.hidden && _pushTimer) {
    clearTimeout(_pushTimer); _pushTimer = null;
    cloudPushNow(true);
  }
});
async function cloudPushNow(silent) {
  if (!_sb || !_authUser) { if (!silent && typeof showToast === 'function') showToast('Connecte-toi d\'abord', '#f87171'); return; }
  try {
    const local = JSON.parse(localStorage.getItem('mathsgr2_data') || '{}');
    const res = await _sb.from('progress').upsert({ user_id: _authUser.id, data: local, updated_at: new Date().toISOString() });
    if (res.error) throw res.error;
    if (!silent && typeof showToast === 'function') showToast('☁️ Sauvegarde en ligne', 'var(--color-parabole)');
  } catch (e) { console.warn('push cloud:', e.message); if (!silent && typeof showToast === 'function') showToast('Echec sauvegarde en ligne', '#f87171'); }
}

async function authInit() {
  refreshAuthBtn();
  if (!_sb) return;
  try {
    const res = await _sb.auth.getSession();
    if (res.data && res.data.session && res.data.session.user) {
      _authUser = res.data.session.user;
      refreshAuthBtn();
      if (typeof window.onAuthChanged === 'function') { try { window.onAuthChanged(); } catch (e) {} }
      await pullProgressFromCloud();
    }
  } catch (e) { console.warn('authInit:', e.message); }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', authInit);
else authInit();

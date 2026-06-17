// ============================
// IDENTIFY AI — APP.JS
// Lógica principal
// ============================

let currentFilter = 'todos';
let allMessages = [...MENSAJES];

// ---- SPLASH ----
function startApp() {
  const splash = document.getElementById('splash');
  splash.style.opacity = '0';
  splash.style.transition = 'opacity .5s';
  setTimeout(() => {
    splash.style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    renderMessages();
    renderStats();
    renderArchitecture();
    setTimeout(showToast, 1200);
  }, 500);
}

// ---- TABS ----
function switchTab(btn) {
  document.querySelectorAll('.nb').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const tab = btn.dataset.tab;
  switchTabById(tab);
}

function switchTabById(tabId) {
  document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
  document.getElementById('tab-' + tabId).classList.remove('hidden');
  document.querySelectorAll('.nb').forEach(b => {
    if (b.dataset.tab === tabId) b.classList.add('active');
    else b.classList.remove('active');
  });
}

// ---- TOAST ----
function showToast() {
  const t = document.getElementById('toast');
  const m = document.getElementById('toast-msg');
  m.textContent = 'Mensaje de "+591 78945123" analizado. Posible cuento del tío.';
  t.classList.remove('hidden');
  setTimeout(closeToast, 5000);
}
function closeToast() {
  document.getElementById('toast').classList.add('hidden');
}

// ---- MESSAGES ----
function renderMessages() {
  const grid = document.getElementById('msg-grid');
  grid.innerHTML = '';
  const filtered = currentFilter === 'todos'
    ? allMessages
    : allMessages.filter(m => m.riesgo === currentFilter);

  filtered.forEach(m => {
    const card = document.createElement('div');
    card.className = 'msg-card';
    card.innerHTML = `
      <div class="mc-top">
        <div class="mc-from">${m.from}</div>
        <div class="mc-time">${m.time}</div>
      </div>
      <div class="mc-preview">${m.preview}</div>
      <div class="mc-footer">
        <span class="risk-pill rp-${m.riesgo}">
          <span class="rp-dot dot-${m.riesgo}"></span>
          ${riskLabel(m.riesgo)}
        </span>
        <span class="mc-app">${m.app}</span>
      </div>
    `;
    card.onclick = () => openDetail(m);
    grid.appendChild(card);
  });
}

function filterMsg(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.fb').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMessages();
}

function riskLabel(r) {
  return r === 'alto' ? '⚠ Alto riesgo' : r === 'medio' ? '◈ Riesgo medio' : '✓ Seguro';
}

function riskColor(r) {
  return r === 'alto' ? '#EF4444' : r === 'medio' ? '#F59E0B' : '#10B981';
}

// ---- DETAIL ----
function openDetail(m) {
  const ov = document.getElementById('detail-ov');
  ov.classList.remove('hidden');

  document.getElementById('d-from').textContent = m.from;
  document.getElementById('d-app').textContent = m.app;
  document.getElementById('d-time').textContent = m.time;
  document.getElementById('d-msg-text').textContent = '"' + m.texto + '"';

  // avatar
  const av = document.getElementById('d-avatar');
  av.textContent = m.avatarLetter;
  av.style.background = m.avatarBg;
  av.style.color = m.avatarColor;

  // risk pill
  const pill = document.getElementById('d-risk-pill');
  pill.innerHTML = `<span class="risk-pill rp-${m.riesgo}"><span class="rp-dot dot-${m.riesgo}"></span>${riskLabel(m.riesgo)}</span>`;

  // semaforo
  document.getElementById('sl-rojo').classList.toggle('on', m.riesgo === 'alto');
  document.getElementById('sl-amarillo').classList.toggle('on', m.riesgo === 'medio');
  document.getElementById('sl-verde').classList.toggle('on', m.riesgo === 'bajo');

  const rb = document.getElementById('d-risk-big');
  rb.textContent = riskLabel(m.riesgo);
  rb.style.color = riskColor(m.riesgo);

  document.getElementById('d-score').textContent = `Score del modelo: ${m.score}%`;
  document.getElementById('d-desc').textContent = m.desc;

  // indicators
  const inds = document.getElementById('d-inds');
  inds.innerHTML = m.indicators.map(ind => `
    <div class="ind-row">
      <div class="ind-name">${ind.name}</div>
      <div class="ind-bar-bg"><div class="ind-bar ib-${ind.tipo}" style="width:${ind.pct}%"></div></div>
      <div class="ind-pct">${ind.pct}%</div>
    </div>
  `).join('');

  // keywords
  const kw = document.getElementById('d-kw');
  kw.innerHTML = m.keywords.map(k => `<span class="kw kw-${k.tipo}">${k.word}</span>`).join('');
}

function closeDetail() {
  document.getElementById('detail-ov').classList.add('hidden');
}

// ---- SIMULATE NEW ----
function simulateNew() {
  const extra = MSGS_EXTRA[0];
  const exists = allMessages.find(m => m.id === extra.id);
  if (!exists) {
    allMessages.unshift(extra);
  }
  renderMessages();
  showToast();
  document.getElementById('toast-msg').textContent = 'Nuevo mensaje sospechoso analizado: posible fraude de sorteo.';
  document.getElementById('toast').classList.remove('hidden');
  setTimeout(closeToast, 5000);
}

// ---- SCANNER ----
function loadEx(i) {
  const ex = EJEMPLOS[i];
  document.getElementById('scan-input').value = ex.texto;
  const platSel = document.getElementById('scan-plat');
  const remSel = document.getElementById('scan-rem');
  for (let o of platSel.options) if (o.text === ex.plat) { o.selected = true; break; }
  for (let o of remSel.options) if (o.text === ex.rem) { o.selected = true; break; }
}

function runScan() {
  const texto = document.getElementById('scan-input').value.trim();
  if (!texto) { alert('Por favor ingresa un mensaje para analizar.'); return; }

  const result = document.getElementById('scan-result');
  const body = document.getElementById('scan-res-body');
  const plat = document.getElementById('scan-plat').value;
  const rem = document.getElementById('scan-rem').value;

  result.classList.remove('hidden');
  body.innerHTML = '<div class="loading-pulse" style="color:var(--text3);font-size:13px;padding:20px 0;">Procesando con el modelo BERT...</div>';

  // Reset pipeline steps
  ['ps1','ps2','ps3'].forEach(id => document.getElementById(id).classList.remove('done'));

  // Simulate pipeline
  setTimeout(() => document.getElementById('ps1').classList.add('done'), 400);
  setTimeout(() => document.getElementById('ps2').classList.add('done'), 900);
  setTimeout(() => document.getElementById('ps3').classList.add('done'), 1500);

  setTimeout(() => {
    const score = calcScore(texto, rem);
    const riesgo = score >= 75 ? 'alto' : score >= 40 ? 'medio' : 'bajo';
    const keywords = extractKeywords(texto);

    body.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px;background:var(--bg);border-radius:10px;padding:14px;margin-bottom:14px;">
        <div class="semaforo">
          <div class="sl ${riesgo==='alto'?'on':''}" style="width:20px;height:20px;"></div>
          <div class="sl ${riesgo==='medio'?'on':''}" style="width:20px;height:20px;"></div>
          <div class="sl ${riesgo==='bajo'?'on':''}" style="width:20px;height:20px;"></div>
        </div>
        <div>
          <div style="font-size:18px;font-weight:600;color:${riskColor(riesgo)};margin-bottom:3px;">${riskLabel(riesgo)}</div>
          <div style="font-size:11px;color:var(--text3);font-family:var(--mono);">Score: ${score.toFixed(1)}% · Plataforma: ${plat} · Remitente: ${rem}</div>
        </div>
      </div>
      <div style="margin-bottom:12px;">
        <div class="block-title">Palabras clave detectadas</div>
        <div class="kw-list" style="margin-top:8px;">
          ${keywords.map(k=>`<span class="kw kw-${k.tipo}">${k.word}</span>`).join('')}
        </div>
      </div>
      <div style="font-size:12px;color:var(--text2);line-height:1.6;background:var(--bg);border-radius:8px;padding:12px;">
        ${getAnalysisText(riesgo, rem)}
      </div>
    `;
  }, 1600);
}

function calcScore(texto, rem) {
  const t = texto.toLowerCase();
  let score = 10;
  const danger = ['urgente','urgencia','accidente','transferir','transferencia','qr','número nuevo','cambie mi','hospital','policía','detenido','prestame','mándame','enviame','ganaste','premio','suspendida','bloqueada','bit.ly','clic','enlace','verificar'];
  const boost = ['desconocido','institución bancaria'];
  danger.forEach(w => { if (t.includes(w)) score += 15; });
  if (boost.includes(rem.toLowerCase())) score += 20;
  if (t.includes('?') && t.length < 80) score -= 15;
  return Math.min(99, Math.max(2, score));
}

function extractKeywords(texto) {
  const t = texto.toLowerCase();
  const dangerWords = ['urgente','urgencia','accidente','transferir','transferencia','bloquead','suspendid','ganaste','premio','bit.ly','clic','clave','contraseña'];
  const warnWords = ['hospital','policía','dinero','prestame','número nuevo','cambie'];
  const keywords = [];
  texto.split(/\s+/).forEach(word => {
    const clean = word.replace(/[.,!?¿¡]/g,'').toLowerCase();
    if (dangerWords.some(d => clean.includes(d))) keywords.push({word: word.replace(/[.,!?¿¡]/g,''), tipo:'danger'});
    else if (warnWords.some(w => clean.includes(w))) keywords.push({word: word.replace(/[.,!?¿¡]/g,''), tipo:'warn'});
  });
  return keywords.slice(0, 8);
}

function getAnalysisText(riesgo, rem) {
  if (riesgo === 'alto') return '⚠ El modelo clasificó este mensaje como de <strong>alto riesgo</strong>. Presenta múltiples indicadores de fraude. Se recomienda NO realizar ninguna transferencia y verificar el remitente por un canal alternativo de confianza.';
  if (riesgo === 'medio') return '◈ El modelo detectó algunos indicadores de riesgo. Se recomienda <strong>precaución</strong>. Verifica la identidad del remitente antes de actuar.';
  return '✓ El mensaje no presenta indicadores significativos de fraude. El contenido parece <strong>legítimo</strong>, aunque siempre es recomendable verificar solicitudes de dinero.';
}

// ---- STATS ----
function renderStats() {
  // metrics bars
  const mb = document.getElementById('metrics-bars');
  if (mb) {
    mb.innerHTML = METRICS.map(m => `
      <div class="mbar-row">
        <div class="mbar-name">${m.name}</div>
        <div class="mbar-bg"><div class="mbar ${m.cls}" style="width:${m.val}%"></div></div>
        <div class="mbar-val">${m.val}%</div>
      </div>
    `).join('');
  }

  // freq bars
  const fb = document.getElementById('freq-bars');
  if (fb) {
    fb.innerHTML = FREQ.map(f => `
      <div class="mbar-row">
        <div class="mbar-name" style="width:160px;">${f.name}</div>
        <div class="mbar-bg"><div class="mbar mb-purple" style="width:${f.pct}%"></div></div>
        <div class="mbar-val">${f.pct}%</div>
      </div>
    `).join('');
  }

  // weekly
  const wc = document.getElementById('weekly');
  if (wc) {
    const max = Math.max(...WEEKLY.map(w => w.val));
    wc.innerHTML = WEEKLY.map(w => `
      <div class="wbar-wrap">
        <div class="wbar" style="height:${(w.val/max)*80}px;" title="${w.val} mensajes"></div>
        <div class="wbar-label">${w.day}</div>
      </div>
    `).join('');
  }
}

// ---- ARCHITECTURE ----
function renderArchitecture() {
  const container = document.getElementById('arch-modules');
  if (!container) return;
  container.innerHTML = '';

  ARQUITECTURA.forEach((mod, i) => {
    const div = document.createElement('div');
    div.className = 'arch-mod';
    div.id = 'am-' + mod.id;
    div.style.borderLeftColor = mod.color;
    div.style.setProperty('border-left-width', '3px');
    div.innerHTML = `
      <div class="am-icon" style="background:${mod.iconBg};">${mod.icon}</div>
      <div>
        <div class="am-name">${mod.name}</div>
        <div class="am-desc">${mod.short}</div>
      </div>
      <div class="am-arrow">→</div>
    `;
    div.onclick = () => openArchDetail(mod);
    container.appendChild(div);

    if (i < ARQUITECTURA.length - 1) {
      const conn = document.createElement('div');
      conn.className = 'arch-connector';
      conn.textContent = '↓';
      container.appendChild(conn);
    }
  });
}

function openArchDetail(mod) {
  document.querySelectorAll('.arch-mod').forEach(m => m.classList.remove('selected'));
  document.getElementById('am-' + mod.id).classList.add('selected');

  const detail = document.getElementById('arch-detail');
  detail.classList.remove('hidden');

  document.getElementById('ad-icon').textContent = mod.icon;
  document.getElementById('ad-icon').style.background = mod.iconBg;
  document.getElementById('ad-title').textContent = mod.name;
  document.getElementById('ad-sub').textContent = mod.short;
  document.getElementById('ad-body').textContent = mod.body;

  const techDiv = document.getElementById('ad-tech');
  techDiv.innerHTML = mod.tech.map(t => `<span class="ad-tech-tag">${t}</span>`).join('');
}

function closeArchDetail() {
  document.getElementById('arch-detail').classList.add('hidden');
  document.querySelectorAll('.arch-mod').forEach(m => m.classList.remove('selected'));
}

// Close detail on overlay click
document.addEventListener('click', function(e) {
  const ov = document.getElementById('detail-ov');
  if (e.target === ov) closeDetail();
});

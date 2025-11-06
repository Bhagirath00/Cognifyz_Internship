document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const statusLine = document.getElementById('status');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistory');
  const keys = document.querySelector('.keys');
  const historySection = document.querySelector('section.history');
  const toggleHistoryBtn = document.getElementById('toggleHistory');

  let current = '0';
  let total = null; // running sum when '+' is pressed
  let afterEquals = false;
  let lastOp = null; // only '+' supported but keeps future extensibility

  function setDisplay(val) {
    display.textContent = val;
  }

  function appendDigit(d) {
    if (afterEquals) { total = null; current = '0'; afterEquals = false; }
    if (d === '.' && current.includes('.')) return;
    if (current === '0' && d !== '.') current = d; else current += d;
    setDisplay(current);
    renderStatus();
    updateLiveHistory();
  }

  function addOp() {
    const n = parseFloat(current || '0');
    total = (total === null ? 0 : total) + (isNaN(n) ? 0 : n);
    current = '0';
    afterEquals = false;
    lastOp = '+';
    setDisplay('0');
    renderStatus();
    createLiveHistory();
  }

  function equalsOp() {
    const n = parseFloat(current || '0');
    const result = (total === null ? n : (total + (isNaN(n) ? 0 : n)));
    current = String(result);
    total = null;
    afterEquals = true;
    setDisplay(current);
    pushHistory(statusLine.textContent ? `${statusLine.textContent} ${n} =` : `${n} =`, result);
    clearStatus();
    finalizeLiveHistory(result);
  }

  function clearAll() {
    current = '0'; total = null; afterEquals = false; setDisplay('0');
    lastOp = null; clearStatus();
    clearLiveHistory();
  }

  function backspace() {
    if (afterEquals) { clearAll(); return; }
    if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) current = '0';
    else current = current.slice(0, -1);
    setDisplay(current);
  }

  // Clicks
  keys.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.dataset.digit !== undefined) return appendDigit(btn.dataset.digit);
    if (btn.dataset.op === '+') return addOp();
    if (btn.dataset.action === 'equals') return equalsOp();
    if (btn.dataset.action === 'clear') return clearAll();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (/^[0-9]$/.test(e.key)) return appendDigit(e.key);
    if (e.key === '.') return appendDigit('.');
    if (e.key === '+') return addOp();
    if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); return equalsOp(); }
    if (e.key === 'Escape') return clearAll();
    if (e.key === 'Backspace') return backspace();
  });

  // Init
  setDisplay('0');
  renderStatus();

  // History helpers
  function pushHistory(expression, result){
    const item = document.createElement('div');
    item.className = 'history-item';
    const exp = document.createElement('div');
    exp.className = 'history-exp';
    exp.textContent = expression;
    const res = document.createElement('div');
    res.className = 'history-res';
    res.textContent = result;
    item.appendChild(exp); item.appendChild(res);
    historyList.prepend(item);
  }

  clearHistoryBtn?.addEventListener('click', ()=>{ historyList.innerHTML = ''; });
  toggleHistoryBtn?.addEventListener('click', ()=>{
    const collapsed = historySection.classList.toggle('collapsed');
    toggleHistoryBtn.textContent = collapsed ? 'Show' : 'Hide';
    toggleHistoryBtn.setAttribute('aria-expanded', String(!collapsed));
  });

  function renderStatus(){
    if (lastOp === '+') {
      // show first + second as you type
      const second = current === '0' ? '' : ` ${current}`;
      statusLine.textContent = `${total} +${second}`.trim();
    } else if (current !== '0') {
      statusLine.textContent = `${current}`;
    } else {
      statusLine.textContent = '';
    }
  }

  function clearStatus(){ statusLine.textContent = ''; lastOp = null; }

  // Live history helpers
  function createLiveHistory(){
    if (document.querySelector('.history-item.live')) return;
    const item = document.createElement('div');
    item.className = 'history-item live';
    const exp = document.createElement('div');
    exp.className = 'history-exp';
    exp.textContent = statusLine.textContent;
    const res = document.createElement('div');
    res.className = 'history-res';
    res.textContent = '';
    item.appendChild(exp); item.appendChild(res);
    historyList.prepend(item);
  }

  function updateLiveHistory(){
    const live = document.querySelector('.history-item.live');
    if (!live) return;
    live.querySelector('.history-exp').textContent = statusLine.textContent;
  }

  function finalizeLiveHistory(result){
    const live = document.querySelector('.history-item.live');
    if (!live) return;
    live.classList.remove('live');
    live.querySelector('.history-res').textContent = result;
  }

  function clearLiveHistory(){
    const live = document.querySelector('.history-item.live');
    if (live) live.remove();
  }
});
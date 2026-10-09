// Apply the saved preference before rendering without an inline script.
try {
  document.documentElement.dataset.theme = localStorage.getItem('aq-theme') === 'light' ? 'light' : 'dark';
} catch {
  document.documentElement.dataset.theme = 'dark';
}

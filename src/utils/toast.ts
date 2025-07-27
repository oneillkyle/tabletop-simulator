export function showToast(message: string) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: '#0ff',
    color: '#000',
    padding: '10px 20px',
    borderRadius: '6px',
    zIndex: 9999,
    fontWeight: 'bold',
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

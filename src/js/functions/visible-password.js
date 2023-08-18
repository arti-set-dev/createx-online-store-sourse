const visiblePassword = (currBtn) => {
  const input = currBtn.closest('[data-password]')?.querySelector('.input--password') || currBtn.closest('[data-password]')?.querySelector('.input--passcon');
  currBtn.classList.toggle('btn-eye--show');

  if (currBtn.classList.contains('btn-eye--show')) {
    input?.setAttribute('type', 'text');
    currBtn.setAttribute('aria-label', 'hide password');
  } else {
    input?.setAttribute('type', 'password');
    currBtn.setAttribute('aria-label', 'show password');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-eye')) {
      const currBtn = e.target.closest('.btn-eye');
      visiblePassword(currBtn);
    }
  })
})

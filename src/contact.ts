/* =============================================================
   contact.ts  —  お問い合わせフォーム（デモ動作）
   実運用では action を Formspree / Netlify Forms 等に差し替える。
   ここでは送信をフックして、簡易バリデーション + 完了表示を行う。
   ============================================================= */

function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('#contact-form')
  if (!form) return

  const setError = (input: HTMLInputElement | HTMLTextAreaElement, msg: string) => {
    input.style.borderColor = 'var(--c-accent)'
    input.setAttribute('aria-invalid', 'true')
    input.title = msg
  }
  const clearError = (input: HTMLInputElement | HTMLTextAreaElement) => {
    input.style.borderColor = ''
    input.removeAttribute('aria-invalid')
    input.title = ''
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = form.querySelector<HTMLInputElement>('#cf-name')!
    const email = form.querySelector<HTMLInputElement>('#cf-email')!
    const msg = form.querySelector<HTMLTextAreaElement>('#cf-msg')!

    let ok = true
    ;[name, email, msg].forEach((f) => {
      if (!f.value.trim()) { setError(f, '必須項目です'); ok = false }
      else clearError(f)
    })
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setError(email, 'メールアドレスの形式が正しくありません'); ok = false
    }
    if (!ok) return

    // 完了表示（デモ）
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!
    btn.disabled = true
    btn.textContent = '送信しました（デモ）✓'
    btn.style.background = '#2fae6a'
    form.reset()
    setTimeout(() => {
      btn.disabled = false
      btn.innerHTML = '送信する <span class="arrow">→</span>'
      btn.style.background = ''
    }, 3200)
  })
}

if (document.readyState !== 'loading') initContactForm()
else document.addEventListener('DOMContentLoaded', initContactForm)

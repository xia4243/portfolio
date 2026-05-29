/* =============================================================
   main.ts  —  全ページ共通のインタラクション
   - ヘッダーのスクロール状態
   - モバイルドロワー開閉（フォーカストラップ簡易）
   - スクロール連動の表示アニメーション (IntersectionObserver)
   - 数値カウントアップ
   - フッターの年号自動更新
   ============================================================= */

import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'

/* ---------- Header scroll state ---------- */
function initHeader(): void {
  const header = document.querySelector<HTMLElement>('.site-header')
  if (!header) return
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ---------- Mobile drawer ---------- */
function initDrawer(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle')
  const drawer = document.querySelector<HTMLElement>('.drawer')
  if (!toggle || !drawer) return

  const setOpen = (open: boolean) => {
    drawer.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    document.body.style.overflow = open ? 'hidden' : ''
  }

  toggle.addEventListener('click', () =>
    setOpen(toggle.getAttribute('aria-expanded') !== 'true'),
  )
  drawer.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => setOpen(false)),
  )
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false)
  })
}

/* ---------- Reveal on scroll ---------- */
function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('.reveal')
  if (!items.length) return

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'))
    return
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  items.forEach((el) => io.observe(el))
}

/* ---------- Count up numbers ---------- */
function initCountUp(): void {
  const nums = document.querySelectorAll<HTMLElement>('[data-count]')
  if (!nums.length || !('IntersectionObserver' in window)) return

  const run = (el: HTMLElement) => {
    const target = parseFloat(el.dataset.count || '0')
    const decimals = (el.dataset.count || '').includes('.')
      ? (el.dataset.count!.split('.')[1].length)
      : 0
    const dur = 1200
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = (target * eased).toFixed(decimals)
      if (p < 1) requestAnimationFrame(step)
      else el.textContent = target.toFixed(decimals)
    }
    requestAnimationFrame(step)
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        run(e.target as HTMLElement)
        obs.unobserve(e.target)
      }
    })
  }, { threshold: 0.6 })
  nums.forEach((n) => io.observe(n))
}

/* ---------- Footer year ---------- */
function initYear(): void {
  document.querySelectorAll<HTMLElement>('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear())
  })
}

function boot(): void {
  initHeader()
  initDrawer()
  initReveal()
  initCountUp()
  initYear()
}

if (document.readyState !== 'loading') boot()
else document.addEventListener('DOMContentLoaded', boot)

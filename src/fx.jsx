import { useEffect, useRef } from 'react'

// Runs frame(ctx, w, h, t, dt) on a canvas while it is on screen. Sized for the device pixel ratio.
function useCanvasLoop(frame) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    let w = 0, h = 0, raf = 0, last = 0, visible = false
    const draw = (t, dt) => { if (w && h) { ctx.clearRect(0, 0, w, h); frame(ctx, w, h, t, dt) } }
    const loop = (t) => {
      raf = 0
      if (!visible || document.hidden) return
      const dt = last ? Math.min(64, t - last) : 16
      last = t
      draw(t, dt)
      raf = requestAnimationFrame(loop)
    }
    const start = () => { if (!raf && visible) { last = 0; raf = requestAnimationFrame(loop) } }
    const ro = new ResizeObserver(() => {
      const r = c.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1)
      w = r.width; h = r.height
      c.width = Math.max(1, Math.round(w * dpr)); c.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(performance.now(), 16)
    })
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : (cancelAnimationFrame(raf), raf = 0) })
    ro.observe(c); io.observe(c)
    document.addEventListener('visibilitychange', start)
    return () => { ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', start) }
  }, [frame])
  return ref
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const TAU = Math.PI * 2

// One heartbeat (P, QRS, T) over p = 0–1.
function ecgShape(p) {
  if (p > .16 && p < .24) return .09 * Math.sin((p - .16) / .08 * Math.PI)
  if (p >= .30 && p < .315) return -(p - .30) / .015 * .08
  if (p >= .315 && p < .335) return -.08 + (p - .315) / .02 * 1.08
  if (p >= .335 && p < .355) return 1 - (p - .335) / .02 * 1.24
  if (p >= .355 && p < .37) return -.24 + (p - .355) / .015 * .24
  if (p > .48 && p < .62) return .17 * Math.sin((p - .48) / .14 * Math.PI)
  return 0
}
// Pulse-oximeter wave.
function pleth(p) {
  const v = p < .2 ? Math.sin(p / .2 * Math.PI / 2) : Math.pow(Math.max(0, 1 - (p - .2) / .8), 1.7)
  return v + .1 * Math.exp(-Math.pow((p - .45) / .05, 2))
}

function helixFrame(ctx, w, h, t) {
  const N = 26, R = h * .3, cy = h / 2, spin = t * .0009, pts = []
  for (let i = 0; i < N; i++) {
    const x = 18 + i * (w - 36) / (N - 1), an = i * .42 + spin
    pts.push({ x, y1: cy + Math.sin(an) * R, z1: Math.cos(an), y2: cy - Math.sin(an) * R, z2: -Math.cos(an) })
  }
  ctx.lineWidth = 1.2
  for (const p of pts) {
    ctx.strokeStyle = `rgba(22,103,107,${(.1 + .12 * Math.abs(p.z1)).toFixed(3)})`
    ctx.beginPath(); ctx.moveTo(p.x, p.y1); ctx.lineTo(p.x, p.y2); ctx.stroke()
  }
  for (const [y, col] of [['y1', '22,103,107'], ['y2', '224,161,0']]) {
    ctx.strokeStyle = `rgba(${col},.22)`; ctx.lineWidth = 1.4
    ctx.beginPath()
    pts.forEach((p, k) => k ? ctx.lineTo(p.x, p[y]) : ctx.moveTo(p.x, p[y]))
    ctx.stroke()
  }
  // dots back to front, so the near strand overlaps the far one
  const dots = pts.flatMap((p) => [{ x: p.x, y: p.y1, z: p.z1, c: '22,103,107' }, { x: p.x, y: p.y2, z: p.z2, c: '224,161,0' }])
  dots.sort((a, b) => a.z - b.z)
  for (const d of dots) {
    const k = (d.z + 1) / 2
    ctx.fillStyle = `rgba(${d.c},${(.3 + .6 * k).toFixed(3)})`
    ctx.beginPath(); ctx.arc(d.x, d.y, 1.6 + k * 2.6, 0, TAU); ctx.fill()
  }
}

// Slowly turning DNA double helix (decorative).
export function Helix({ className = '' }) {
  return <canvas aria-hidden ref={useCanvasLoop(helixFrame)} className={className} />
}

// Live ICU monitor: heart rate, SpO₂ and breathing waves with a phosphor fade.
// ponytail: the vitals are illustrative, drifting within normal ranges; this is decoration, not real data.
const vitals = { hr: 72, spo2: 98, rr: 16, next: 0, head: 0 }
const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
function monitorFrame(ctx, w, h, t, dt) {
  if (t > vitals.next) {
    vitals.next = t + 2200
    vitals.hr = clamp(vitals.hr + Math.round((Math.random() - .5) * 3), 68, 78)
    vitals.spo2 = clamp(vitals.spo2 + Math.round((Math.random() - .5) * 1.6), 97, 99)
    vitals.rr = clamp(vitals.rr + Math.round((Math.random() - .5) * 1.4), 14, 18)
  }
  const padL = 54, padR = 70, wave = w - padL - padR, rowH = (h - 22) / 3, L = wave + 26
  vitals.head = (vitals.head + 92 * dt / 1000) % L
  const head = vitals.head
  ctx.font = `600 9.5px ${mono}`; ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(238,246,246,.55)'; ctx.fillText('BED 04 · ICU', 14, 12)
  ctx.fillStyle = Math.floor(t / 700) % 2 ? 'rgba(239,68,68,.35)' : 'rgba(239,68,68,.95)'
  ctx.beginPath(); ctx.arc(w - 44, 12, 3, 0, TAU); ctx.fill()
  ctx.fillStyle = 'rgba(238,246,246,.7)'; ctx.fillText('LIVE', w - 36, 12)
  const rows = [
    { lab: 'HR', val: String(vitals.hr), col: '110,231,183', f: ecgShape, P: 82, amp: .8 },
    { lab: 'SpO₂', val: vitals.spo2 + '%', col: '125,211,252', f: pleth, P: 82, amp: .72 },
    { lab: 'RR', val: String(vitals.rr), col: '240,183,47', f: (p) => .5 - .5 * Math.cos(p * TAU), P: 300, amp: .6 },
  ]
  rows.forEach((r, i) => {
    const top = 22 + i * rowH, base = top + rowH * .74
    const y = (x) => base - r.f(((x % r.P) + r.P) % r.P / r.P) * rowH * r.amp * .78
    ctx.strokeStyle = 'rgba(238,246,246,.06)'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(padL, top + rowH - .5); ctx.lineTo(w - padR + 8, top + rowH - .5); ctx.stroke()
    ctx.fillStyle = `rgba(${r.col},.85)`; ctx.font = `600 10px ${mono}`
    ctx.fillText(r.lab, 14, top + rowH / 2)
    ctx.font = `600 19px ${mono}`; ctx.textAlign = 'right'
    ctx.fillText(r.val, w - 14, top + rowH / 2 + 1)
    ctx.textAlign = 'left'
    // trace fades with age behind the moving head
    ctx.lineWidth = 1.5; ctx.lineJoin = 'round'
    for (let x0 = 0; x0 < wave; x0 += 8) {
      const age = ((head - (x0 + 4)) % L + L) % L
      if (age > wave * .9) continue
      ctx.strokeStyle = `rgba(${r.col},${(Math.pow(1 - age / (wave * .9), 1.2) * .95).toFixed(3)})`
      ctx.beginPath(); ctx.moveTo(padL + x0, y(x0))
      for (let x = x0 + 2; x <= x0 + 8; x += 2) ctx.lineTo(padL + x, y(x))
      ctx.stroke()
    }
    if (head <= wave) {
      ctx.save(); ctx.shadowColor = `rgba(${r.col},1)`; ctx.shadowBlur = 10; ctx.fillStyle = `rgba(${r.col},1)`
      ctx.beginPath(); ctx.arc(padL + head, y(head), 2.2, 0, TAU); ctx.fill()
      ctx.restore()
    }
  })
}

export function BedsideMonitor({ className = '' }) {
  return <canvas aria-hidden ref={useCanvasLoop(monitorFrame)} className={className} />
}

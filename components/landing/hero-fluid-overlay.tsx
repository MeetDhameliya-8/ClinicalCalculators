"use client"

import { useRef, useEffect, useCallback } from "react"

interface Blob {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
  phase: number
  speed: number
}

export function HeroFluidOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const cursorBlobRef = useRef({ x: -1000, y: -1000 }) // smoothed cursor position

  const blobsRef = useRef<Blob[]>([])

  const initBlobs = useCallback((w: number, h: number) => {
    blobsRef.current = [
      // Autonomous idle blobs
      { x: w * 0.15, y: h * 0.3, vx: 0.12, vy: 0.07, radius: 480, color: "13,148,136", opacity: 0.22, phase: 0, speed: 0.0008 },
      { x: w * 0.8,  y: h * 0.6, vx: -0.1, vy: 0.09, radius: 560, color: "59,130,246", opacity: 0.18, phase: 1.2, speed: 0.0006 },
      { x: w * 0.5,  y: h * 0.8, vx: 0.08, vy: -0.11, radius: 420, color: "16,185,129", opacity: 0.20, phase: 2.4, speed: 0.0007 },
      { x: w * 0.65, y: h * 0.2, vx: -0.09, vy: 0.12, radius: 380, color: "56,189,248", opacity: 0.16, phase: 0.6, speed: 0.0009 },
    ]
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = canvas.width = canvas.parentElement?.offsetWidth ?? window.innerWidth
    let h = canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight
    initBlobs(w, h)

    const handleResize = () => {
      w = canvas.width = canvas.parentElement?.offsetWidth ?? window.innerWidth
      h = canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight
      initBlobs(w, h)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    canvas.parentElement?.addEventListener("mousemove", handleMouseMove)
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)

    let t = 0

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, w, h)
      t += 1

      // Smooth cursor blob toward mouse
      const lerp = mouseRef.current.active ? 0.055 : 0.02
      cursorBlobRef.current.x += (mouseRef.current.x - cursorBlobRef.current.x) * lerp
      cursorBlobRef.current.y += (mouseRef.current.y - cursorBlobRef.current.y) * lerp

      // Draw interactive cursor blob (above image, very subtle)
      if (mouseRef.current.active || cursorBlobRef.current.x > -500) {
        const grad = ctx.createRadialGradient(
          cursorBlobRef.current.x, cursorBlobRef.current.y, 0,
          cursorBlobRef.current.x, cursorBlobRef.current.y, 450,
        )
        const intensity = mouseRef.current.active ? 0.45 : 0.15
        grad.addColorStop(0,   `rgba(13,148,136,${intensity})`)
        grad.addColorStop(0.4, `rgba(59,130,246,${intensity * 0.5})`)
        grad.addColorStop(1,   `rgba(0,0,0,0)`)
        ctx.beginPath()
        ctx.arc(cursorBlobRef.current.x, cursorBlobRef.current.y, 450, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Draw autonomous ambient blobs
      blobsRef.current.forEach((blob, i) => {
        // Slow organic drift using sin waves
        blob.phase += blob.speed
        const offsetX = Math.sin(blob.phase + i) * 60
        const offsetY = Math.cos(blob.phase * 0.7 + i * 1.3) * 40
        const bx = blob.x + offsetX
        const by = blob.y + offsetY

        // Pulsing radius
        const r = blob.radius + Math.sin(blob.phase * 2) * 30

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r)
        grad.addColorStop(0,   `rgba(${blob.color},${blob.opacity})`)
        grad.addColorStop(0.6, `rgba(${blob.color},${blob.opacity * 0.3})`)
        grad.addColorStop(1,   `rgba(${blob.color},0)`)

        ctx.beginPath()
        ctx.arc(bx, by, r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove)
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [initBlobs])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        mixBlendMode: "screen",
      }}
    />
  )
}

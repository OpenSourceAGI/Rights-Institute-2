"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import createGlobe, { COBEOptions } from "cobe"

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

// Generate random colors for markers
const generateRandomColor = (): [number, number, number] => [
  Math.random(),
  Math.random() * 0.5 + 0.5, // Keep saturation higher
  Math.random() * 0.5 + 0.5  // Keep brightness higher
];

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.1, // Much reduced darkness to make globe fully visible
  diffuse: 1.2, // Increased diffuse lighting
  mapSamples: 16000,
  mapBrightness: 3.5, // Significantly increased brightness
  baseColor: [1, 1, 1], // Pure white base color for maximum visibility
  markerColor: generateRandomColor(),
  glowColor: [1, 1, 1], // Bright white glow
  markers: [
    { location: [14.5995, 120.9842], size: 0.05 },
    { location: [19.076, 72.8777], size: 0.08 },
    { location: [23.8103, 90.4125], size: 0.06 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.09 },
    { location: [-23.5505, -46.6333], size: 0.08 },
    { location: [19.4326, -99.1332], size: 0.07 },
    { location: [40.7128, -74.006], size: 0.09 },
    { location: [34.6937, 135.5022], size: 0.06 },
    { location: [41.0082, 28.9784], size: 0.07 },
    { location: [51.5074, -0.1278], size: 0.08 }, // London
    { location: [48.8566, 2.3522], size: 0.07 }, // Paris
    { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
    { location: [55.7558, 37.6176], size: 0.07 }, // Moscow
    { location: [-1.2921, 36.8219], size: 0.05 }, // Nairobi
    { location: [37.7749, -122.4194], size: 0.08 }, // San Francisco
    { location: [52.5200, 13.4050], size: 0.06 }, // Berlin
    { location: [25.2048, 55.2708], size: 0.07 }, // Dubai
    { location: [-34.6037, -58.3816], size: 0.06 }, // Buenos Aires
    { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
    { location: [55.9533, -3.1883], size: 0.05 }, // Edinburgh
    { location: [59.9139, 10.7522], size: 0.05 }, // Oslo
    { location: [60.1699, 24.9384], size: 0.05 }, // Helsinki
    { location: [64.1466, -21.9426], size: 0.04 }, // Reykjavik
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005
      state.phi = phi + r
      state.width = width * 2
      state.height = width * 2
    },
    [r],
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    if (!canvasRef.current) return

    // Create globe with random marker colors
    const globeConfig = {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
      markerColor: generateRandomColor(),
    }

    const globe = createGlobe(canvasRef.current, globeConfig)

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    })

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [config, onRender])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
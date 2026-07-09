'use client'

import { useRef } from 'react'

// The source clip fades in from black for its first ~0.4s. Native `loop`
// would replay that black flash every cycle, so we skip it manually instead
// of relying on the loop attribute restarting at frame zero.
const SKIP_INTRO_SECONDS = 0.45

export default function BirdVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <video
      ref={videoRef}
      className={`${className ?? ''} mix-blend-multiply`}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={(e) => {
        e.currentTarget.currentTime = SKIP_INTRO_SECONDS
      }}
      onEnded={(e) => {
        const video = e.currentTarget
        video.currentTime = SKIP_INTRO_SECONDS
        video.play()
      }}
    >
      <source src="/assets/PixVerse_V6_Image_Text_360P_bird_flying_and_ho.mp4" type="video/mp4" />
    </video>
  )
}

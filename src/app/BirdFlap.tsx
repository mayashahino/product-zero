'use client'

import { motion, useReducedMotion } from 'motion/react'

import BirdCutout from './BirdCutout'

const CYCLE_DURATION = 1.4
const CYCLE_DELAY = 1.1 // hands off from the CSS entrance animation on the wrapper
const TIMES = [0, 0.25, 0.5, 0.75, 1]

const loopTransition = {
  duration: CYCLE_DURATION,
  delay: CYCLE_DELAY,
  repeat: Infinity,
  times: TIMES,
  ease: 'easeInOut' as const,
}

// Three real frames of the same bird, cross-dissolved in sequence rather than
// warping a single flat image: rest (wings folded) -> rising -> full spread
// -> rising -> rest. Alignment percentages below come from measuring each
// source image's actual subject bounding box (via pixel analysis), scaled to
// a common 320x320 reference so all three read as the same size and position.
export default function BirdFlap({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className}>
        <div className="relative h-full w-full overflow-visible opacity-100">
          <BirdCutout
            src="/assets/bird.png"
            className="absolute"
            style={{ left: '-23.06%', top: '13.375%', width: '129.56%', height: '70.69%' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <motion.div
        className="relative h-full w-full overflow-visible"
        animate={{ y: [0, -5, -14, -5, 0] }}
        transition={loopTransition}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [1, 0, 0, 0, 1] }}
          transition={loopTransition}
        >
          <BirdCutout
            src="/assets/bird.png"
            className="absolute"
            style={{ left: '-23.06%', top: '13.375%', width: '129.56%', height: '70.69%' }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={loopTransition}
        >
          <BirdCutout
            src="/assets/flying_bird.png"
            className="absolute"
            style={{ left: '1.41%', top: '1.41%', width: '94.47%', height: '94.47%' }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0, 0, 1, 0, 0] }}
          transition={loopTransition}
        >
          <BirdCutout
            src="/assets/flying_bird_2.png"
            className="absolute"
            style={{ left: '12.51%', top: '13.75%', width: '72.38%', height: '72.38%' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

import { useCallback, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const MotionDiv = motion.div

const WORDS = ['SPIN', 'YOUR', 'RECORD']

function randomLayout() {
  return {
    left: 5 + Math.random() * 70,
    top: 5 + Math.random() * 45,
    yIn: (Math.random() - 0.5) * 30,
    yOut: (Math.random() - 0.5) * 30,
  }
}

export default function FloatingWords() {
  const reduceMotion = useReducedMotion()
  const [cycle, setCycle] = useState(0)
  const [layout, setLayout] = useState(() => randomLayout())

  const handleComplete = useCallback(() => {
    setLayout(randomLayout())
    setCycle((c) => c + 1)
  }, [])

  const word = WORDS[cycle % 3]

  const animate = reduceMotion
    ? { opacity: [0, 0.85, 0.85, 0], y: [0, 0, 0, 0] }
    : {
        opacity: [0, 0.85, 0.85, 0],
        y: [layout.yIn, 0, 0, layout.yOut],
      }

  return (
    <AnimatePresence initial={false} mode="sync">
      <MotionDiv
        key={cycle}
        className="floating-word"
        style={{
          left: `${layout.left}%`,
          top: `${layout.top}%`,
        }}
        animate={animate}
        transition={{
          duration: 2,
          times: [0, 0.2, 0.8, 1],
          ease: ['easeOut', 'linear', 'linear', 'easeIn'],
        }}
        onAnimationComplete={handleComplete}
      >
        {word}
      </MotionDiv>
    </AnimatePresence>
  )
}

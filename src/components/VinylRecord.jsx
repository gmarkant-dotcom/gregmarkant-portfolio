import { useId } from 'react'
import clsx from 'clsx'

/**
 * Minimal vinyl disc — restrained “Rick Rubin” read: matte black mass,
 * whisper grooves, calm label, no gloss. Theme colors via CSS vars only.
 */
export default function VinylRecord({ coverImage, isSpinning, ambient = false, className }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `vr-clip-${uid}`
  const washId = `vr-wash-${uid}`

  return (
    <svg
      className={clsx('vinyl-record', ambient && 'vinyl-record--ambient', className)}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="26" />
        </clipPath>
        <radialGradient id={washId} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="var(--color-text)" stopOpacity="0.03" />
          <stop offset="70%" stopColor="var(--color-text)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className={clsx('vinyl-record__rotor', isSpinning && 'vinyl-record__rotor--spinning')}>
        <circle
          className="vinyl-record__disc"
          cx="100"
          cy="100"
          r="98"
          fill="none"
          stroke="var(--color-text)"
          strokeOpacity="0.14"
          strokeWidth="0.85"
        />
        {[86, 72, 58, 44].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="var(--color-muted)"
            strokeOpacity="0.07"
            strokeWidth="0.5"
          />
        ))}
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="var(--color-text)"
          strokeOpacity="0.1"
          strokeWidth="0.6"
        />
        {coverImage ? (
          <image
            href={coverImage}
            x="74"
            y="74"
            width="52"
            height="52"
            clipPath={`url(#${clipId})`}
            preserveAspectRatio="xMidYMid slice"
          />
        ) : null}
        <circle cx="100" cy="100" r="3.5" fill="var(--color-text)" fillOpacity="0.35" />
        <circle cx="100" cy="100" r="98" fill={`url(#${washId})`} style={{ pointerEvents: 'none' }} />
      </g>
    </svg>
  )
}

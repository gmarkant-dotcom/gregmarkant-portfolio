import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import '../styles/ContactTab.css'

export default function ContactTab() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const toggle = useCallback(() => {
    setOpen((v) => !v)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    function handlePointerDown(event) {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target)) {
        close()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open, close])

  return (
    <aside
      ref={rootRef}
      className={clsx('contact-tab', open && 'contact-tab--open')}
      aria-label="Contact"
    >
      <div className="contact-tab__rail">
        <div id="contact-tab-panel" className="contact-tab__panel">
          <a className="contact-tab__link" href="mailto:gmarkant@gmail.com">
            gmarkant@gmail.com
          </a>
          <a
            className="contact-tab__link"
            href="https://www.linkedin.com/in/gregmarkant/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/gregmarkant
          </a>
        </div>
        <button
          type="button"
          className="contact-tab__handle"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="contact-tab-panel"
        >
          <span className="contact-tab__handle-label">CONTACT</span>
        </button>
      </div>
    </aside>
  )
}

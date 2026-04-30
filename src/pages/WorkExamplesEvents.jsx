import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { getTheme } from '../data/themes.config'
import { getEventProjects } from '../data/projects.data'
import BioPanel from '../components/BioPanel'
import '../styles/WorkExamplesEvents.css'

const PERSONAL_MESSAGE = [
  'Hi Samantha,',
  "I'm genuinely excited to have the opportunity to explore the VP, Events role on your team. The majority of my career has been spent deep in producing a wide variety of live events: conferences, music festivals, brand activations, VIP hospitality, and PR stunts, before more recently pivoting into integrated marketing solutions over the last few years. While that strategic planning and campaign development work has sharpened my perspective and improved my ability to execute in complex environments, I'm now wholeheartedly eager to get back into live events as my primary focus, as this is the space where I come most alive.",
  "The VP, Events role is so exciting to me because it gives me an opportunity to dive back into premier event production to lead a high-stakes, high-reward program, while engaging my full skillset across campaign planning, creative production, marketing transformation and organizational design, all of which will be essential. I'm a world-class orchestrator and someone who is able to create paths to successful outcomes even when there is a great deal of complexity and ambiguity. I know that will be integral in launching your flagship conference for the first time.",
  'Feel free to check out some of my direct experience in events on this page below, and you can also see more of my integrated marketing and cross-functional experience on the main page at gregmarkant.com.',
  "Hopefully we'll have the chance to meet and get to know each other a bit better soon!",
  'Greg',
]

function getVimeoEmbedUrl(url) {
  if (!url) return null
  const match = url.match(/vimeo\.com\/(\d+)(?:\/([a-f0-9]+))?/)
  if (!match) return null
  const videoId = match[1]
  const hash = match[2]
  return hash
    ? `https://player.vimeo.com/video/${videoId}?h=${hash}`
    : `https://player.vimeo.com/video/${videoId}`
}

function groupByClient(projects) {
  const clientMap = new Map()
  const clientOrder = []

  projects.forEach((p) => {
    const clientKey =
      p.brand.includes('Chase') || p.brand.includes('JPMorgan')
        ? 'JPMorgan Chase'
        : p.brand.includes('Samsung')
          ? 'Samsung'
          : p.brand

    if (!clientMap.has(clientKey)) {
      clientMap.set(clientKey, [])
      clientOrder.push(clientKey)
    }
    clientMap.get(clientKey).push(p)
  })

  return clientOrder.map((client) => ({
    client,
    projects: clientMap.get(client),
  }))
}

function ImageGallery({ images }) {
  const [current, setCurrent] = useState(0)
  if (!images || images.length === 0) return null

  return (
    <div className="events-gallery">
      <div className="events-gallery-main">
        <img
          src={images[current]}
          alt={`Gallery image ${current + 1}`}
          className="events-gallery-img"
        />
        {images.length > 1 && (
          <>
            <button
              className="events-gallery-arrow left"
              onClick={() => setCurrent((i) => (i - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              className="events-gallery-arrow right"
              onClick={() => setCurrent((i) => (i + 1) % images.length)}
              aria-label="Next image"
            >
              &#8250;
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="events-gallery-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={clsx('events-gallery-dot', { active: i === current })}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function EventsProjectCard({ project }) {
  const { projectName, caption, year, eventsData } = project
  if (!eventsData) return null

  const allImages = [eventsData.coverImage, ...(eventsData.additionalImages || [])].filter(Boolean)
  const embedUrl = getVimeoEmbedUrl(eventsData.videoLink)

  return (
    <div className="events-project-card">
      <div className="events-project-gallery-col">
        <ImageGallery images={allImages} />
        {embedUrl && (
          <div className="events-video-wrap">
            <iframe
              src={embedUrl}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={projectName}
            />
          </div>
        )}
      </div>
      <div className="events-project-info-col">
        <h3 className="events-project-name">{projectName}</h3>
        {eventsData.budget && (
          <p className="events-project-budget">Approx. Budget: {eventsData.budget}</p>
        )}
        <p className="events-project-year">{year}</p>
        <p className="events-project-caption">{caption}</p>
      </div>
    </div>
  )
}

export default function WorkExamplesEvents() {
  useEffect(() => {
    const theme = getTheme('body_talk')
    Object.entries(theme.tokens).forEach(([prop, val]) => {
      document.documentElement.style.setProperty(prop, val)
    })
    document.body.setAttribute('data-theme', 'body_talk')
    return () => {
      Object.keys(theme.tokens).forEach((prop) => {
        document.documentElement.style.removeProperty(prop)
      })
      document.body.removeAttribute('data-theme')
    }
  }, [])

  const eventProjects = getEventProjects()
  const grouped = groupByClient(eventProjects)

  return (
    <>
      <div className="events-page">
        <header className="events-header">
          <Link to="/" className="events-back-link">
            gregmarkant.com
          </Link>
          <a href="/projects/Greg_Markant_Resume.pdf" download className="events-resume-btn">
            Download Resume
          </a>
        </header>

        <div className="events-wrapper">
          <section className="events-intro">
            <div className="events-intro-headshot">
              <img src="/headshot-events.jpg" alt="Greg Markant" />
            </div>
            <div className="events-intro-message">
              {PERSONAL_MESSAGE.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section className="events-projects">
            {grouped.map(({ client, projects }) => (
              <div key={client} className="events-client-group">
                <h2 className="events-client-header">{client}</h2>
                <div className="events-client-projects">
                  {projects.map((project) => (
                    <EventsProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <BioPanel />
    </>
  )
}

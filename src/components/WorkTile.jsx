import '../styles/WorkTile.css'

function formatBrandName(brand) {
  return brand || 'Untitled Brand'
}

export default function WorkTile({ project }) {
  const hasHeroImage = Boolean(project.heroImage)
  const frontStyle = hasHeroImage ? { backgroundImage: `url(${project.heroImage})` } : {}

  return (
    <article className="work-tile" aria-label={`${project.brand} - ${project.projectName}`}>
      <div className="work-tile-inner">
        <section className="work-tile-face work-tile-front" style={frontStyle}>
          {!hasHeroImage ? (
            <div className="work-tile-placeholder">
              <span>{formatBrandName(project.brand)}</span>
            </div>
          ) : null}

          <div className="work-tile-front-overlay tile-front-label">
            <span className="tile-front-client">{project.brand}</span>
            <span className="tile-front-title">{project.projectName}</span>
            <div className="tile-front-industry-pills">
              {project.industry.map((industry) => (
                <span key={industry} className="tile-front-industry-pill">
                  {industry}
                </span>
              ))}
            </div>
            <span className="tile-front-year">{project.year}</span>
          </div>
        </section>

        <section className="work-tile-face work-tile-back">
          <div className="work-tile-back-header">
            <div className="work-tile-company-wrap">
              <p className="work-tile-company">{project.company}</p>
              <p className="work-tile-agency-network">{project.agencyNetwork}</p>
            </div>
          </div>

          <div className="work-tile-caption-wrap">
            <p className="work-tile-caption">{project.caption}</p>
            <p className="work-tile-roles">{project.roles}</p>
          </div>

          <div className="work-tile-skills-row">
            {project.skills.map((skill) => (
              <span key={skill} className="work-tile-skill-pill">
                {skill}
              </span>
            ))}
          </div>

          <div className="work-tile-channels-row">
            {project.channels.map((channel) => (
              <span key={channel} className="work-tile-channel-pill">
                {channel}
              </span>
            ))}
          </div>

          <p className="work-tile-back-year">{project.year}</p>
        </section>
      </div>
    </article>
  )
}

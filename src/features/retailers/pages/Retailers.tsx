import React from "react";

const Retailers: React.FC = () => (
  <div className="retailers-page">
    <div className="retailers-page__intro">
      <p className="retailers-page__eyebrow">Find us locally</p>
      <h1>Retailers</h1>
      <p>Find nearby retailers on the map below.</p>
    </div>

    <div className="retailers-page__map">
      <iframe
        title="Retailers map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-122.516%2C37.706%2C-122.357%2C37.816&layer=mapnik"
        loading="lazy"
      />
    </div>

    <a className="retailers-page__map-link" href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">
      Open the map in a new tab
    </a>
  </div>
)

export default Retailers
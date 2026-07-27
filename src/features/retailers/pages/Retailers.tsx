"use client"

import { ExternalLink, MapPin, Store } from "lucide-react"
import { useMemo, useState } from "react"

const demoRetailers = [
  { id: "berlin", city: "Berlin", country: "Germany", address: "Torstrasse 94, 10119 Berlin", lat: 52.5292, lon: 13.4014, hours: "Mon-Sat · 10:00-19:00" },
  { id: "amsterdam", city: "Amsterdam", country: "Netherlands", address: "Haarlemmerdijk 132, 1013 JJ Amsterdam", lat: 52.3833, lon: 4.8868, hours: "Mon-Sat · 10:00-18:30" },
  { id: "paris", city: "Paris", country: "France", address: "118 Rue du Temple, 75003 Paris", lat: 48.8627, lon: 2.3606, hours: "Tue-Sun · 11:00-19:00" },
  { id: "vienna", city: "Vienna", country: "Austria", address: "Neubaugasse 42, 1070 Vienna", lat: 48.2005, lon: 16.3487, hours: "Mon-Sat · 09:30-18:30" },
] as const

const Retailers = () => {
  const [selectedId, setSelectedId] = useState<(typeof demoRetailers)[number]["id"]>(demoRetailers[0].id)
  const selectedRetailer = demoRetailers.find((retailer) => retailer.id === selectedId) ?? demoRetailers[0]
  const mapUrl = useMemo(() => {
    const { lat, lon } = selectedRetailer
    const bbox = [lon - 0.018, lat - 0.012, lon + 0.018, lat + 0.012].join(",")
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lon}`
  }, [selectedRetailer])
  const externalMapUrl = `https://www.openstreetmap.org/?mlat=${selectedRetailer.lat}&mlon=${selectedRetailer.lon}#map=15/${selectedRetailer.lat}/${selectedRetailer.lon}`

  return (
    <main className="retailers-page">
      <div className="retailers-page__intro">
        <p className="retailers-page__eyebrow">European store finder</p>
        <h1>Meet us locally</h1>
        <p>Explore how a future Shopella retailer network could work.</p>
        <p className="retailers-page__demo-note"><strong>Portfolio demo:</strong> all locations and opening hours below are fictional.</p>
      </div>

      <div className="retailers-page__layout">
        <div className="retailers-page__list" aria-label="Demo retailer locations">
          {demoRetailers.map((retailer) => {
            const isSelected = retailer.id === selectedRetailer.id
            return (
              <article key={retailer.id} className={`retailers-card${isSelected ? " retailers-card--selected" : ""}`}>
                <div className="retailers-card__heading">
                  <span className="retailers-card__icon"><Store size={18} aria-hidden="true" /></span>
                  <div><h2>{retailer.city}</h2><p>{retailer.country}</p></div>
                  <span className="retailers-card__badge">Demo</span>
                </div>
                <p className="retailers-card__address"><MapPin size={16} aria-hidden="true" />{retailer.address}</p>
                <p className="retailers-card__hours">{retailer.hours}</p>
                <button type="button" className="btn btn-secondary btn-sm" aria-pressed={isSelected} onClick={() => setSelectedId(retailer.id)}>
                  {isSelected ? "Shown on map" : "Show on map"}
                </button>
              </article>
            )
          })}
        </div>

        <section className="retailers-page__map-panel" aria-labelledby="selected-retailer-title">
          <div className="retailers-page__map-heading">
            <div><p>Selected demo location</p><h2 id="selected-retailer-title">{selectedRetailer.city}</h2></div>
            <a className="retailers-page__map-link" href={externalMapUrl} target="_blank" rel="noreferrer">Open map <ExternalLink size={15} aria-hidden="true" /></a>
          </div>
          <div className="retailers-page__map">
            <iframe key={selectedRetailer.id} title={`Map showing the demo ${selectedRetailer.city} retailer`} src={mapUrl} loading="lazy" />
          </div>
          <p className="retailers-page__map-disclaimer">Map pins demonstrate the interface only and do not identify real Shopella stores.</p>
        </section>
      </div>
    </main>
  )
}

export default Retailers

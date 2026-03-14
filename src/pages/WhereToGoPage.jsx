import { useEffect, useMemo, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { SectionTitle } from '../components/SectionTitle'
import { suggestMapPlaces } from '../lib/chat/mapService'
import { mapPlaces } from '../data/mapPlaces'

const brisbaneCenter = [-27.4698, 153.0251]

const quickVibePrompts = [
  'I wanna go chill',
  'I want something lively tonight',
  'Need a quiet study vibe',
  'Show me scenic places',
]

const defaultLeafletIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const activeLeafletIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'leaflet-marker-active',
})

function FitMapToPlaces({ places }) {
  const map = useMap()

  useEffect(() => {
    if (!places || places.length === 0) return

    const bounds = L.latLngBounds(places.map((place) => [place.lat, place.lng]))
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
  }, [places, map])

  return null
}

function mapsDirectionLink(destination, mode, origin) {
  const params = new URLSearchParams({
    api: '1',
    destination: `${destination.lat},${destination.lng}`,
    travelmode: mode,
  })

  if (origin) {
    params.set('origin', `${origin.lat},${origin.lng}`)
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export function WhereToGoPage() {
  const [messages, setMessages] = useState([
    {
      id: 'starter-map-msg',
      role: 'assistant',
      text: 'Tell me your vibe and I will highlight a strong set of places on the map.',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedPlaces, setSuggestedPlaces] = useState(mapPlaces.slice(0, 8))
  const [routeTips, setRouteTips] = useState({})
  const [settledPlaceId, setSettledPlaceId] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [isLocating, setIsLocating] = useState(false)

  const settledPlace = useMemo(
    () => suggestedPlaces.find((place) => place.id === settledPlaceId) || null,
    [suggestedPlaces, settledPlaceId],
  )

  async function handleAskMapAssistant(question) {
    const trimmed = question.trim()
    if (!trimmed || isLoading) return

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        text: trimmed,
      },
    ])
    setInput('')
    setIsLoading(true)
    setSettledPlaceId('')

    try {
      const result = await suggestMapPlaces(trimmed)

      setSuggestedPlaces(result.places)
      setRouteTips(result.routeTips)
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: result.intro,
        },
      ])
    } catch (error) {
      console.error(error)
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          text: 'I could not fetch AI suggestions right now. Try again in a moment.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    handleAskMapAssistant(input)
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation || isLocating) return

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLocating(false)
      },
      () => {
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
      },
    )
  }

  return (
    <section className="container page-section">
      <SectionTitle
        eyebrow="AI Map"
        title="Where Should I Go Today?"
        description="Type your mood and get a robust set of AI suggestions directly on the map."
        level="h1"
      />

      <div className="ai-map-layout">
        <section className="ai-map-chat" aria-label="Where should I go chat">
          <div className="ai-map-chat-log">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`chat-message ${message.role === 'assistant' ? 'assistant' : 'user'}`}
              >
                <p>{message.text}</p>
              </article>
            ))}

            {isLoading ? (
              <article className="chat-message assistant" aria-live="polite">
                <p>Finding matching places...</p>
              </article>
            ) : null}
          </div>

          <div className="chat-suggestions" aria-label="Map vibe suggestions">
            {quickVibePrompts.map((prompt) => (
              <Chip
                key={prompt}
                label={prompt}
                className="chip-chat"
                onClick={() => handleAskMapAssistant(prompt)}
              />
            ))}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <label htmlFor="where-to-go-input" className="sr-only">
              Describe your vibe today
            </label>
            <input
              id="where-to-go-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Example: I wanna go chill"
            />
            <Button type="submit" size="sm" variant="primary">
              Suggest places
            </Button>
          </form>

          <div className="map-place-list" aria-label="Suggested places">
            {suggestedPlaces.map((place) => (
              <article key={place.id} className="map-place-card">
                <h3>
                  {place.name}
                  {place.sponsored ? (
                    <span className="sponsored-badge">{place.sponsorLabel || 'Sponsored'}</span>
                  ) : null}
                </h3>
                <p>
                  {place.suburb} · {place.type}
                </p>
                <p>{place.description}</p>
                <Button
                  size="sm"
                  variant={settledPlaceId === place.id ? 'primary' : 'secondary'}
                  onClick={() => setSettledPlaceId(place.id)}
                >
                  {settledPlaceId === place.id ? 'Settled here' : 'Settle here'}
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-map-panel" aria-label="Map and routes">
          <div className="ai-map-header-row">
            <h2>Suggested map spots</h2>
            <Button size="sm" variant="secondary" onClick={handleUseMyLocation}>
              {isLocating ? 'Locating...' : 'Use my location'}
            </Button>
          </div>

          <MapContainer
            center={brisbaneCenter}
            zoom={12}
            scrollWheelZoom
            className="where-map-canvas"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitMapToPlaces places={suggestedPlaces} />

            {suggestedPlaces.map((place) => (
              <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                icon={settledPlaceId === place.id ? activeLeafletIcon : defaultLeafletIcon}
              >
                <Popup>
                  <strong>{place.name}</strong>
                  {place.sponsored ? (
                    <>
                      <br />
                      <span className="sponsored-popup-label">
                        {place.sponsorLabel || 'Sponsored'}
                      </span>
                    </>
                  ) : null}
                  <br />
                  {place.suburb}
                  <br />
                  {place.address}
                  <br />
                  <button
                    type="button"
                    className="popup-settle-button"
                    onClick={() => setSettledPlaceId(place.id)}
                  >
                    {settledPlaceId === place.id ? 'Settled here' : 'Settle here'}
                  </button>
                </Popup>
              </Marker>
            ))}

            {userLocation ? <Marker position={[userLocation.lat, userLocation.lng]} /> : null}
          </MapContainer>

          {settledPlace ? (
            <section className="route-suggestions" aria-label="Route suggestions">
              <h3>Route suggestions for {settledPlace.name}</h3>
              <p>
                {routeTips[settledPlace.id] ||
                  'Choose a travel mode below to open turn-by-turn directions.'}
              </p>
              <div className="route-actions">
                <Button
                  size="sm"
                  variant="secondary"
                  href={mapsDirectionLink(settledPlace, 'walking', userLocation)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Walking route
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  href={mapsDirectionLink(settledPlace, 'transit', userLocation)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Transit route
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  href={mapsDirectionLink(settledPlace, 'driving', userLocation)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Driving route
                </Button>
              </div>
            </section>
          ) : null}
        </section>
      </div>
    </section>
  )
}

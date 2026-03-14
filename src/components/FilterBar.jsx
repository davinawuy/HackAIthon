import { Button } from './Button'

export function FilterBar({ filters, onChange, onReset, interests = [], types = [] }) {
  return (
    <section className="filter-bar" aria-label="Event filters">
      <div className="filter-grid">
        <label>
          Search
          <input
            type="text"
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
            placeholder="Search location, tags, or title"
          />
        </label>

        <label>
          Interest
          <select
            value={filters.interest}
            onChange={(event) => onChange('interest', event.target.value)}
          >
            <option value="all">All interests</option>
            {interests.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Type
          <select
            value={filters.type}
            onChange={(event) => onChange('type', event.target.value)}
          >
            {types.map((item) => (
              <option value={item} key={item}>
                {item === 'all' ? 'All types' : item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <select
            value={filters.dateWindow}
            onChange={(event) => onChange('dateWindow', event.target.value)}
          >
            <option value="any">Any date</option>
            <option value="7">Next 7 days</option>
            <option value="30">Next 30 days</option>
            <option value="90">Next 90 days</option>
          </select>
        </label>

        <label>
          Group Size
          <select
            value={filters.groupSize}
            onChange={(event) => onChange('groupSize', event.target.value)}
          >
            <option value="all">All group sizes</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        <label>
          Comfort
          <select
            value={filters.comfort}
            onChange={(event) => onChange('comfort', event.target.value)}
          >
            <option value="all">Any comfort level</option>
            <option value="gentle">Gentle</option>
            <option value="balanced">Balanced</option>
            <option value="lively">Lively</option>
          </select>
        </label>
      </div>

      <Button variant="secondary" size="sm" onClick={onReset}>
        Reset Filters
      </Button>
    </section>
  )
}

import { ILocation } from '../models/location';
// import viteLogo from '/vite.svg'

function LocationList({ locations }: { locations: ILocation[] }) {
  return locations.map((location) => {
    return (
      <div key={location.id}>
        <p>{location.name}</p>
      </div>
    )
  })
}

export default LocationList

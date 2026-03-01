import './second-page.css';
import { useState } from 'react'
// import { client } from '../apollo/client';
import { GET_LOCATIONS } from './requests/GET_LOCATIONS';
import LocationList from './components/custom-list';
import { ILocation } from './models/location';
import { client } from '../apollo/client';

// import viteLogo from '/vite.svg'

function SecondPage() {
  // const [count, setCount] = useState(0)
  const [locations, setLocations] = useState<ILocation[]>([])

  function makeARequest(): void {
    client.query({
      query: GET_LOCATIONS
    })
      .then(({ data }) => {
        setLocations(data.locations);
      });
  }

  return (
    <>
      <div>
        <button onClick={() => makeARequest()}>Make a request</button>
      </div>

      <LocationList locations={locations}></LocationList>

    </>
  )
}

export default SecondPage

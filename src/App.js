import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [tours, setTuors] = useState([])

  const removeTour = id => {
    const newTuors = tours.filter(tour => tour.id !== id)
    setTuors(newTuors)
  }

  const fetchTours = async () => {
    setLoading(true)

    try {
      const response = await fetch(url)
      const tours = await response.json()
      setLoading(false)
      setTuors(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <div className="title">
        <h2>no tours left</h2>
        <button className="btn" onClick={() => fetchTours()}>
          refresh
        </button>
      </div>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
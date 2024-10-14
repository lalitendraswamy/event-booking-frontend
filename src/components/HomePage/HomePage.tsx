import React from 'react'
import EventNavbar from '../shared/navbar/navbar'

import Events from '../shared/events/events'
import Categories from '../shared/categories/categories'
import EventsFooter from '../shared/footer/eventsFooter'


export default function HomePage() {
  return (
    <div>
      <EventNavbar />
      <Events />
      <Categories />
      <EventsFooter />
    </div>
  )
}

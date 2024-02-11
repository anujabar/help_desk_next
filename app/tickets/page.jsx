import React, { Suspense } from 'react'
import TicketsList from './TicketsList'
import Loading from '../loading.jsx'
// suspense wraps on;y the pages and not the root layout
// within pages we can specify what all must be wrapped
const Tickets = () => { // /tickets
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p><small>Currently open tickets.</small></p>
        </div>
      </nav>
      <Suspense fallback={<Loading/>}>
         <TicketsList />
      </Suspense>
    </main>
  )
}

export default Tickets

import Link from 'next/link'
import React from 'react'

const getTickets=async ()=>{
    await new Promise(resolve=>setTimeout(resolve,3000))
    const res=await fetch("http://localhost:4000/tickets",{
        next:{
            revalidate:0 // 0 means data is not cached at all i.e data is fetched everytime
        }
    })
    return res.json()
}

const TicketsList = async () => {
  const tickets=await getTickets()
  return (
   <>
    {tickets.map((ticket)=>{
        return (
            <div className='card my-5' key={ticket.id}>
                <Link href={`/tickets/${ticket.id}`}>
                    <h3>{ticket.title}</h3>
                    <p>{ticket.body.slice(0,200)}...</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                    </div>
                </Link>
            </div>
        )
    })}
    {tickets.length===0 && <p className='text-center'>There are no open tickets</p>}
   </>
  )
}

export default TicketsList

import { notFound } from 'next/navigation'
import React from 'react'

export const dynamicParams=true //default

export const getStaticParams=async ()=>{
    const res= await fetch("http://localhost:4000/tickets")
    const tickets=await res.json()
    return (tickets.map((ticket)=>{
        return {id:ticket.id}
    }))
}

const getTicket=async (id)=>{ // /tickets/:id
    await new Promise(resolve=>setTimeout(resolve,3000))
    const res=await fetch('http://localhost:4000/tickets/'+id,{
        next:{
            revalidate:60
        }
    })
    if(!res.ok){
        notFound()
    }
    return res.json()
}

const TicketDetails = async ({params}) => {
  const {id}=params
  const ticket=await getTicket(id)
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}

export default TicketDetails

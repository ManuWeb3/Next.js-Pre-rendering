// Part (2) - (with React hooks is the) Client Side data fetching
import { useRouter } from "next/router"
import { useState } from "react"

// fetch data for Server Side Rendering
// Part (1)- (without React hooks is the) SSR
export default function EventsList({eventsList}) {
    const router = useRouter()
    const [events, setEvents] = useState(eventsList)
    
    // event handler - async - ES6:
    // specific to sports-events filter and setting "events" state accordingly
    const fetchSportsEvents = async () => {
        const response = await fetch("http://localhost:4000/events?category=sports")
        const data = await response.json()
        setEvents(data)
        router.push("/events?category=sports", undefined, { shallow: true })
        // complete details of router.push() args - later
    }

    // ES5:
    // async function fetchSportsEvents() {

    // }

    return (
        <>
            <button onClick={fetchSportsEvents}>Sports events</button>
            <h2> List of all the events around:</h2>
            {
                events.map((oneEvent) => {
                    return (
                        <div key={oneEvent.id}>
                            <h3>{oneEvent.id} {oneEvent.title} | {oneEvent.category}</h3>
                            <p>{oneEvent.description}</p>
                        </div>
                    )
                })
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const { query } = context
    const {category} = query

    const queryString = category ? "category=sports" : ""

    const response = await fetch(`http://localhost:4000/events?${queryString}`)
    const data = await response.json()

    return {
        props: {
            eventsList: data
        }
    }
}
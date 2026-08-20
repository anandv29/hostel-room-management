import { useState, useEffect } from 'react'
import { load, save } from './storage'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import RoomsTab from './components/RoomsTab'

function App() {
  const [tab, setTab] = useState("dashboard")
  const [rooms, setRooms] = useState(() => load("rooms", []))

  useEffect(() => save("rooms", rooms), [rooms])

  return (
    <div className="app">
      <Sidebar tab={tab} setTab={setTab} />
      <main>
        {tab === "dashboard" && <Dashboard rooms={rooms} setRooms={setRooms} />}
        {tab === "rooms" && <RoomsTab rooms={rooms} setRooms={setRooms} />}
      </main>
    </div>
  )
}

export default App

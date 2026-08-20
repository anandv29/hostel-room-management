import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import RoomsTab from './components/RoomsTab'

function App() {
  const [tab, setTab] = useState("dashboard")

  return (
    <div className="app">
      <Sidebar tab={tab} setTab={setTab} />
      <main>
        {tab === "dashboard" && <Dashboard />}
        {tab === "rooms" && <RoomsTab />}
      </main>
    </div>
  )
}

export default App

function Sidebar({ tab, setTab }) {
  return (
    <aside className="sidebar">
      <h1>Room Allocation</h1>
      <p>Manage rooms and students</p>

      <nav>
        <button
          className={tab === "dashboard" ? "nav-btn active" : "nav-btn"}
          onClick={() => setTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={tab === "rooms" ? "nav-btn active" : "nav-btn"}
          onClick={() => setTab("rooms")}
        >
          Rooms
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar

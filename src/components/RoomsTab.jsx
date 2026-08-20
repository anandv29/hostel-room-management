import { useState } from 'react'

function roomStatus(room) {
  if (room.occupied === 0) return "available"
  if (room.occupied === room.capacity) return "full"
  return "partial"
}

const STATUS_LABEL = {
  available: "Available",
  partial: "Partial",
  full: "Full",
}

function RoomsTab({ rooms, setRooms }) {
  const [roomNo, setRoomNo] = useState("")
  const [capacity, setCapacity] = useState("")
  const [hasAC, setHasAC] = useState(false)
  const [hasAttachedWashroom, setHasAttachedWashroom] = useState(false)
  const [message, setMessage] = useState(null) // { type: "error" | "success", text: "..." }

  function handleAddRoom() {
    if (!roomNo.trim()) {
      setMessage({ type: "error", text: "Room number is required" })
      return
    }

    if (rooms.some((r) => r.roomNo === roomNo.trim())) {
      setMessage({ type: "error", text: `Room ${roomNo.trim()} already exists` })
      return
    }

    const capacityNum = Number(capacity)
    if (!capacity || isNaN(capacityNum) || capacityNum <= 0) {
      setMessage({ type: "error", text: "Capacity must be a positive number" })
      return
    }

    const newRoom = {
      roomNo: roomNo.trim(),
      capacity: capacityNum,
      hasAC,
      hasAttachedWashroom,
      occupied: 0,
    }

    setRooms((prev) => [...prev, newRoom])

    setRoomNo("")
    setCapacity("")
    setHasAC(false)
    setHasAttachedWashroom(false)
    setMessage({ type: "success", text: "Room added" })
  }

  return (
    <div>
      <h1>Rooms</h1>

      <div className="card">
        <h2>Add Room</h2>

        <label>
          Room Number
          <input
            type="text"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            placeholder="e.g. 101"
          />
        </label>

        <label>
          Capacity
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="e.g. 2"
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={hasAC}
            onChange={(e) => setHasAC(e.target.checked)}
          />
          Has AC
        </label>

        <label>
          <input
            type="checkbox"
            checked={hasAttachedWashroom}
            onChange={(e) => setHasAttachedWashroom(e.target.checked)}
          />
          Attached Washroom
        </label>

        <button type="button" onClick={handleAddRoom}>
          Add Room
        </button>

        {message && (
          <p className={message.type === "error" ? "msg-error" : "msg-success"}>
            {message.text}
          </p>
        )}
      </div>

      <div className="room-grid">
        {rooms.length === 0 && <p>No rooms yet — add one above.</p>}

        {rooms.map((room) => {
          const status = roomStatus(room)
          return (
            <div key={room.roomNo} className={`card room-card status-${status}`}>
              <div className="room-card-header">
                <strong>Room {room.roomNo}</strong>
                <span className={`badge badge-${status}`}>{STATUS_LABEL[status]}</span>
              </div>
              <p>Capacity: {room.capacity}</p>
              <p>Occupancy: {room.occupied}/{room.capacity}</p>
              <p>AC: {room.hasAC ? "Yes" : "No"}</p>
              <p>Attached Washroom: {room.hasAttachedWashroom ? "Yes" : "No"}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RoomsTab

import { useState } from 'react'
import { allocateRoom } from '../allocate'

function Dashboard({ rooms, setRooms }) {
  const [students, setStudents] = useState("")
  const [needsAC, setNeedsAC] = useState("no")
  const [needsWashroom, setNeedsWashroom] = useState("no")
  const [result, setResult] = useState(null) // { type: "error" | "success", text: "..." }

  const totalRooms = rooms.length
  const totalStudents = rooms.reduce((sum, r) => sum + r.occupied, 0)
  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0)
  const allocated = rooms.filter((r) => r.occupied > 0).length
  const availableRooms = rooms.filter((r) => r.occupied < r.capacity).length
  const pending = rooms.filter((r) => r.occupied === 0).length
  const occupancyPct = totalCapacity === 0 ? 0 : Math.round((totalStudents / totalCapacity) * 100)

  function handleAllocate() {
    const studentsNum = Number(students)
    if (!students || !Number.isInteger(studentsNum) || studentsNum < 1) {
      setResult({ type: "error", text: "Enter a valid number of students." })
      return
    }

    const room = allocateRoom(rooms, studentsNum, needsAC === "yes", needsWashroom === "yes")

    if (!room) {
      setResult({ type: "error", text: "No room available" })
      return
    }

    setRooms((prev) =>
      prev.map((r) =>
        r.roomNo === room.roomNo ? { ...r, occupied: r.occupied + studentsNum } : r
      )
    )

    setResult({
      type: "success",
      text: `Allocated Room ${room.roomNo} (capacity ${room.capacity}, AC: ${room.hasAC ? "Yes" : "No"}, Washroom: ${room.hasAttachedWashroom ? "Yes" : "No"})`,
    })
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="stats-row">
        <div className="card stat-card">
          <strong>{totalRooms}</strong>
          <span>Total Rooms</span>
        </div>
        <div className="card stat-card">
          <strong>{totalStudents}</strong>
          <span>Total Students</span>
        </div>
        <div className="card stat-card">
          <strong>{allocated}</strong>
          <span>Allocated</span>
        </div>
        <div className="card stat-card">
          <strong>{pending}</strong>
          <span>Pending</span>
        </div>
        <div className="card stat-card">
          <strong>{availableRooms}</strong>
          <span>Available Rooms</span>
        </div>
        <div className="card stat-card">
          <strong>{occupancyPct}%</strong>
          <span>Occupancy</span>
        </div>
      </div>

      <div className="card">
        <h2>Allocate Room</h2>

        <label>
          Number of Students
          <input
            type="number"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            placeholder="e.g. 2"
          />
        </label>

        <label>
          Needs AC
          <select value={needsAC} onChange={(e) => setNeedsAC(e.target.value)}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>

        <label>
          Needs Washroom
          <select value={needsWashroom} onChange={(e) => setNeedsWashroom(e.target.value)}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>

        <button type="button" onClick={handleAllocate}>
          Allocate Room
        </button>
      </div>

      <div
        className={
          result
            ? `output-panel output-${result.type}`
            : "output-panel output-empty"
        }
      >
        {result ? result.text : "Allocation result will appear here."}
      </div>
    </div>
  )
}

export default Dashboard

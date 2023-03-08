import React, { useState, useEffect } from "react";



const RoomTable = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [dates, setDates] = useState([]);

  const [roomData, setRoomData] = useState([
    { name: "Mula", data: Array(dates.length).fill("null") },
    { name: "Mutha", data: Array(dates.length).fill(null) },
    { name: "Pawana", data: Array(dates.length).fill(null) },
    { name: "Indrayani", data: Array(dates.length).fill(null) },
  ]);

  

  useEffect(() => {
    const generateDates = (month) => {
      const today = new Date();
      const year = today.getFullYear();
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      const datesArray = [];

      for (let i = 1; i <= lastDayOfMonth; i++) {
        datesArray.push(i.toString().padStart(2, "0"));
      }

      return datesArray;
    };

    setDates(generateDates(month));
  }, [month]);

  const updateRoomData = (roomIndex, dataIndex, newData) => {
    setRoomData((prevData) =>
      prevData.map((room, index) => {
        if (index === roomIndex) {
          return {
            ...room,
            data: room.data.map((oldData, i) => (i === dataIndex ? newData : oldData)),
          };
        } else {
          return room;
        }
      })
    );
  };

  
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Room Data Table</h2>
      <label htmlFor="month-select">Select Month:</label>
      <select
        id="month-select"
        value={month}
        onChange={(e) => setMonth(parseInt(e.target.value))}
      >
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <table style={{ borderCollapse: "collapse", marginTop: "20px" }}>
        
      <thead>
  <tr>
    <th style={{ backgroundColor: "#f2f2f2", padding: "10px", textAlign: "left" }}>Room</th>
    {dates.map((date) => (
      <th
        key={date}
        style={{
          backgroundColor: "#f2f2f2",
          padding: "10px",
          textAlign: "center",
          minWidth: "50px",
        }}
      >
        {date}
      </th>
    ))}
    <th style={{ backgroundColor: "#f2f2f2", padding: "10px", textAlign: "center", minWidth: "50px" }}>Total Usage</th>
    <th style={{ backgroundColor: "#f2f2f2", padding: "10px", textAlign: "center", minWidth: "50px" }}>Percentage Usage</th>
  </tr>
  <tr>
            <td style={{ backgroundColor: "#f2f2f2", padding: "10px", textAlign: "left" }}></td>
            {dates.map((date) => {
              const dayOfWeek = new Date(month + "/" + date + "/" + new Date().getFullYear()).toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <td
                  key={"day-" + date}
                  style={{
                    backgroundColor: "#f2f2f2",
                    padding: "10px",
                    textAlign: "center",
                    minWidth: "50px",
                  }}
                >
                  {dayOfWeek}
                </td>
              )
            })}
            <td style={{ backgroundColor: "#f2f2f2", padding: "10px", textAlign: "center" }}></td>
            <td style={{ backgroundColor: "#f2f2f2", padding: "10px", textAlign: "center" }}></td>
          </tr>
</thead>
<tbody>
  {roomData.map((room, roomIndex) => {
    const totalUsage = room.data.filter(Boolean).length;
    const percentageUsage = ((totalUsage / dates.length) * 100).toFixed(2);
    return (
      <tr key={room.name}>
        <td style={{ backgroundColor: "#f2f2f2", padding: "10px", textAlign: "left" }}>{room.name}</td>
        {room.data.map((data, dataIndex) => (
          <td
            key={`${roomIndex}-${dataIndex}`}
            style={{
              backgroundColor: data ? "#c6efce" : "#fce5cd",
              padding: "10px",
              textAlign: "center",
            }}
          >
            {data || "-"}
            <br />
            <button
              onClick={() => updateRoomData(roomIndex, dataIndex, null)}
              style={{ marginTop: "5px" }}
            >
              Clear
            </button>
          </td>
        ))}
        <td style={{ backgroundColor: "#f2f2f2", padding: "10px", textAlign: "center" }}>{totalUsage}</td>
        <td style={{ backgroundColor: "#f2f2f2", padding: "10px", textAlign: "center" }}>{`${percentageUsage}%`}</td>
      </tr>
    );
  })}
</tbody>

    </table>
    

    
    <button id="export-btn">Export to Excel</button>

  </div>
);
};
// export table data to Excel file

// const exportToExcel = () => {
//   // create workbook and worksheet
//   const wb = XLSX.utils.table_to_book(table, {sheet:"Sheet1"});
//   const ws = wb.Sheets["Sheet1"];

//   // generate Excel file and download it
//   const wbout = XLSX.write(wb, {bookType:"xlsx", bookSST:true, type:"binary"});
//   const fileName = "data.xlsx";
//   const fileBuffer = new ArrayBuffer(wbout.length);
//   const view = new Uint8Array(fileBuffer);
//   for (let i = 0; i < wbout.length; i++) {
//     view[i] = wbout.charCodeAt(i) & 0xFF;
//   }
//   const blob = new Blob([fileBuffer], {type:"application/octet-stream"});
//   const link = document.createElement("a");
//   link.href = window.URL.createObjectURL(blob);
//   link.download = fileName;
//   link.click();
// };

// // add event listener to export button
// document.querySelector("#export-btn").addEventListener("click", () => {
//   exportToExcel();
// });

export default RoomTable;
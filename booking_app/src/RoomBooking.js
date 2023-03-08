import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./RoomBooking.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

const RoomBooking = () => {
  const [events, setEvents] = useState([]);
  const [room, setRoom] = useState("1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:8000/bookings")
      .then((response) => {
        return response.data;
      })
      .then((bookings) => {
        for (let i = 0; i < bookings.length; i++) {
          bookings[i] = {
            title: "Booked "+bookings[i].room_number,
            start: new Date(bookings[i].start_date),
            end: new Date(bookings[i].end_date),
          };
          console.log("---- ",bookings[i]);
        }
        
        setEvents(bookings)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const startD=new Date(startDate)
    const endD=new Date(endDate)

    const newEvent = {
      title: room,
      start: startD,
      end: endD,
    };

    const overlappingEvent = events.find(
      (event) =>
        event.title === newEvent.title &&
        moment(newEvent.start).isBetween(
          event.start,
          event.end,
          undefined,
          "[]"
        )
    );

    if (overlappingEvent) {
      alert("This room is already booked for the selected date range.");
      return;
    }

    console.log("->>>",newEvent);

    axios
    .post("http://localhost:8000/bookings", {
      room_number: newEvent.title,
      start_date: newEvent.start,
      end_date: newEvent.end,
    })
    .then((response) => {
      console.log(response.data);
      setEvents((event) => {
        newEvent.title= "Booked "+newEvent.title
        event = [...event, newEvent];
        // console.log(event);
        return event;
      });
      // setRoom(newEvent.title);
      // setStartDate(newEvent.start);
      // setEndDate(newEvent.end);
    })
    .catch((err) => {
      console.log(err);
    });

    
  };
;
  return (
    <div className="container">
      <div className="col-6">
        <div className="booking-form">
          <h2>Room Booking Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="roomSelect">Select Room:</label>
              <select
                className="form-control"
                id="roomSelect"
                value={room}
                onChange={handleRoomChange}
              >
                <option value="1">Mula</option>
                <option value="2">Mutha</option>
                <option value="3">Pawana</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">From Date:</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={moment(startDate).format("YYYY-MM-DD")}
                onChange={handleStartDateChange}
                min={moment().format("YYYY-MM-DD")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">To Date:</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={moment(endDate).format("YYYY-MM-DD")}
                onChange={handleEndDateChange}
                min={moment().format("YYYY-MM-DD")}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Book Room
            </button>
          </form>
        </div>
        <div className="calendar">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={["month"]}
            style={{ height: "70vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomBooking;

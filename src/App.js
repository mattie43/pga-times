import "./App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5500/pga-times/src/api.json")
      .then((resp) => resp.json())
      .then((data) => setTimeSlots(data));
  }, []);

  function displayTimes() {
    return timeSlots.map((obj, i) => {
      return (
        <div className="row" key={obj.time}>
          <div className="col-3 time">{obj.time}</div>
          <input
            className="col-3"
            name="name"
            value={obj.name}
            onChange={(e) => handleChange(e, i)}
            disabled={!obj.open}
          />
          <input
            className="col-3"
            name="phone"
            value={obj.phone}
            onChange={(e) => handleChange(e, i)}
            disabled={!obj.open}
          />
          <button
            type="button"
            className="col-1 btn btn-primary"
            name="add"
            onClick={(e) => signUpChange(e, i)}
            disabled={!obj.open}
          >
            Sign Up
          </button>
          {obj.open ? (
            ""
          ) : (
            <button
              type="button"
              className="col-1 btn btn-danger"
              name="delete"
              onClick={(e) => signUpChange(e, i)}
            >
              Delete
            </button>
          )}
        </div>
      );
    });
  }

  function handleChange(e, i) {
    setTimeSlots((prev) => {
      const temp = [...prev];
      temp[i] = {
        ...temp[i],
        [e.target.name]: e.target.value,
      };
      return temp;
    });
  }

  function signUpChange(e, i) {
    e.preventDefault();
    if (
      e.target.name === "delete" &&
      !window.confirm("Are you sure you want to delete?")
    )
      return;
    setTimeSlots((prev) => {
      const temp = [...prev];
      if (e.target.name === "delete") {
        temp[i] = {
          ...temp[i],
          name: "",
          phone: "",
          open: true,
        };
      } else {
        temp[i] = {
          ...temp[i],
          open: false,
        };
      }
      return temp;
    });
  }

  return (
    <div className="App container">
      <div className="row">
        <h3 className="col-3">Time</h3>
        <h3 className="col-3">Name</h3>
        <h3 className="col-3">Phone Number</h3>
      </div>
      {displayTimes()}
    </div>
  );
}

const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors")

const dbConnection = require("./dbConfig");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({}))

app.get("/yosh", (req, res, next) => {
  res.send("Yosh");
});

app.get("/bookings", (req, res, next) => {
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  dbConnection
    .then((conn) => {
      conn.execute("select * from bookings", []).then((result) => {
        console.log(result[0]);
        res.send(result[0]);
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.post("/bookings", (req, res, next) => {
  const reqBody = req.body;
  reqBody.start_date = new Date(reqBody.start_date);
  reqBody.end_date = new Date(reqBody.end_date);

  dbConnection
    .then((conn) => {
      conn
        .execute("insert into bookings values(?,?,?)", [
          reqBody.room_number,
          reqBody.start_date,
          reqBody.end_date,
        ])
        .then((result) => {
          console.log(result);
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.listen(8000, () => {
  console.log("Started!", 8000);
});

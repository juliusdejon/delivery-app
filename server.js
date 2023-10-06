const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const app = express();

/*
  middlewares
*/
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

/*
  db connection
*/

// const MONGO_DB_URL = "";
// mongoose.connect(MONGO_DB_URL);
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Error connecting to database: "));
// db.once("open", () => {
//   console.log("Mongo DB connected successfully.");
// });

/*
  restaurant endpoints
*/

app.get("/", (req, res) => {
  res.render("index", { layout: false });
});

const itemsMock = [
  {
    _id: 1,
    name: "Product1",
    image: "donut.jpeg",
    description: "Lorem ipsum",
    price: 100,
  },
  {
    _id: 2,
    name: "Product2",
    image: "donut.jpeg",
    description: "Lorem ipsum",
    price: 100,
  },
  {
    _id: 3,
    name: "Product3",
    image: "donut.jpeg",
    description: "Lorem ipsum",
    price: 100,
  },
  {
    _id: 4,
    name: "Product4",
    image: "donut.jpeg",
    description: "Lorem ipsum",
    price: 100,
  },
];

/*
  order endpoints
*/

const ordersMockData = [
  {
    _id: 1,
    customerName: "John Doe",
    deliveryAddress: "45 Four Winds Dr. North York, Toronto, ON",
    itemsOrdered: [1, 4],
    orderDate: "2023-10-05",
    orderStatus: "Received",
    proofOfDelivery: "",
    driverName: "",
    driverLicensePlate: "",
  },
  {
    _id: 2,
    customerName: "Finch West",
    deliveryAddress: "22 Alphabet Dr. North York, Toronto, ON",
    itemsOrdered: [3, 5, 1],
    orderDate: "2023-10-06",
    orderStatus: "Received",
    proofOfDelivery: "",
    driverName: "",
    driverLicensePlate: "",
  },
  {
    _id: 3,
    customerName: "Jane Doe",
    deliveryAddress: "46 Four Winds Dr. North York, Toronto, ON",
    itemsOrdered: [3],
    orderDate: "2023-10-06",
    orderStatus: "Received",
    proofOfDelivery: "",
    driverName: "",
    driverLicensePlate: "",
  },
];

app.get("/orders", (req, res) => {
  res.render("orders", {
    layout: false,
    orders: ordersMockData,
    totalOrders: ordersMockData.length,
  });
});

app.get("/orders/:orderCode", (req, res) => {});

/*
  delivery endpoints
*/

const onHttpStart = () => {
  console.log(`Express web server running on port: ${HTTP_PORT}`);
  console.log(`Press CTRL+C to exit`);
};

app.listen(HTTP_PORT, onHttpStart);

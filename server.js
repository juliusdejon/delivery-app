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

const ordersMockDb = [
  {
    _id: 1,
    customerName: "John Doe",
    deliveryAddress: "45 Four Winds Dr. North York, Toronto, ON",
    orderCode: "M01",
    orderItems: [1, 4],
    orderTotal: 25,
    orderDate: "2023-10-05",
    orderStatus: "Received",
    proofOfDelivery: "",
    driverId: null,
  },
  {
    _id: 2,
    customerName: "Finch West",
    deliveryAddress: "22 Alphabet Dr. North York, Toronto, ON",
    orderCode: "M02",
    orderItems: [3, 5, 1],
    orderTotal: 34,
    orderDate: "2023-10-06",
    orderStatus: "Received",
    proofOfDelivery: "",
    driverId: null,
  },
  {
    _id: 3,
    customerName: "Jane Doe",
    deliveryAddress: "46 Four Winds Dr. North York, Toronto, ON",
    orderCode: "M03",
    orderItems: [3],
    orderTotal: 12,
    orderDate: "2023-10-06",
    orderStatus: "In Transit",
    proofOfDelivery: "",
    driverId: 1,
  },
];

// Ignore this. Formatted Data for Order Website
const formattedOrdersMockData = [
  {
    _id: 1,
    customerName: "John Doe",
    deliveryAddress: "45 Four Winds Dr. North York, Toronto, ON",
    orderCode: "M01",
    orderItems: [1, 4],
    orderTotal: 25,
    orderDate: "2023-10-05",
    orderStatus: "Received",
    proofOfDelivery: "",
    driverId: null,
    driverName: "",
    driverLicensePlate: "",
    isReceived: true,
  },
  {
    _id: 2,
    customerName: "Finch West",
    deliveryAddress: "22 Alphabet Dr. North York, Toronto, ON",
    orderCode: "M02",
    orderItems: [3, 5, 1],
    orderTotal: 34,
    orderDate: "2023-10-06",
    orderStatus: "Received",
    proofOfDelivery: "",
    driverId: null,
    driverName: "",
    driverLicensePlate: "",
    isReceived: true,
  },
  {
    _id: 3,
    customerName: "Jane Doe",
    deliveryAddress: "46 Four Winds Dr. North York, Toronto, ON",
    orderCode: "M03",
    orderItems: [3],
    orderTotal: 12,
    orderDate: "2023-10-06",
    orderStatus: "In Transit",
    proofOfDelivery: "",
    driverId: 1,
    driverName: "Mike Ross",
    driverLicensePlate: "ABCD 555",
    isReceived: false,
  },
];

app.get("/orders", (req, res) => {
  res.render("orders", {
    layout: false,
    orders: formattedOrdersMockData,
  });
});

app.post("/orders", (req, res) => {
  const customerName = req.body.customerName;
  if (customerName) {
    // will replace .filter with mongo search
    const filteredOrdersData = formattedOrdersMockData.filter((data) =>
      data.customerName
        .toLocaleLowerCase()
        .includes(customerName.toLocaleLowerCase())
    );
    res.render("orders", {
      layout: false,
      orders: filteredOrdersData,
    });
  } else {
    res.render("orders", {
      layout: false,
      orders: formattedOrdersMockData,
    });
  }
});

/*
  delivery endpoints
*/

const onHttpStart = () => {
  console.log(`Express web server running on port: ${HTTP_PORT}`);
  console.log(`Press CTRL+C to exit`);
};

app.listen(HTTP_PORT, onHttpStart);

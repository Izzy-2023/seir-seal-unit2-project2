// Dependencies
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

// get .env variables
const {DATABASE_URL, SECRET, PORT} = process.env

// database connection
mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

//********************************************** 
// Our Models
//********************************************** 
// pull schema and model from mongoose
const {Schema, model} = mongoose

// make Properties schema
const propertiesSchema = new mongoose.Schema({
  img: String,
  address: String, 
  sales_price: Number,
  beds: Number,
  baths: Number,
  square_feet: Number,
  property_manager: String,
  status: Boolean
})

// make Properties model
const Property = model("Properties", propertiesSchema)

// create app object
const app = express()

//*********************************
// Middleware
//********************************* 
app.use(morgan("dev")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

// ****************************
// ROUTES
// ****************************
app.get("/", (req, res) => {
    res.send("It's Working")
})

app.get("/properties/seed", async (req, res) => {

    try{
        // array of starter Properties
        const startProperties = [
          { img: "https://example.com/image1.jpg", address: "123 Main St, Cityville, State", sales_price: 300000, beds: 3, baths: 2, square_feet: 2000, property_manager: "John Doe", status: "True"},
          { img: "https://example.com/image2.jpg", address: "456 Oak Ave, Townsville, State", sales_price: 450000, beds: 4, baths: 3, square_feet: 2800, property_manager: "Jane Smith", status: "False"},
          { img: "https://example.com/image3.jpg", address: "789 Pine Rd, Villagetown, State", sales_price: 600000, beds: 5, baths: 4, square_feet: 3500, property_manager: "Mike Johnson", status: "True"},
          { img: "https://example.com/image4.jpg", address: "101 Cedar Lane, Suburbia, State", sales_price: 750000, beds: 4, baths: 3, square_feet: 3000, property_manager: "Sara Williams", status: "False"},
  
        ]
       // Delete all Properties
       await Property.deleteMany({})
    
       // Seed Starter Properties
       const properties = await Property.create(startProperties)
    
       // send created properties as response to confirm creation
       res.json(properties);
    } catch(error) {
      console.log(error.message)
      res.status(400).send(error.message)
    }
  });

  // Index Route Get -> /properties
  app.get("/properties", async (req, res) => {
    try {
      const properties = await Property.find({});
      // render a template
      res.render("index.ejs", { properties});
    } catch (error) {
        console.log("---------", error.message, "----------")
      res.status(400).send(error.message);
    }
  });

  // NEW
app.get('/properties/new', (req, res) => {
    res.render('new.ejs', {Property})
});

// ***************************************  
// Turn on the server (the listener)
// ***************************************

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
// Dependencies
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

// *****************************
// DATABASE CONNECTION
// *****************************
// our database connection string
const DATABASE_URL = process.env.DATABASE_URL

// *****************************
// Establish our connection
// *****************************
mongoose.connect(DATABASE_URL)

// *****************************
// Events for when connection opens/disconnects/errors
// *****************************
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
app.use("/public", express.static("public")) // serve files from public statically

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

// create route
app.post("/properties", async (req, res) => {
  try {
    // check if the status property should be true or false
    req.body.status = req.body.status === "on" ? true : false;
    // create the new property
    await Property.create(req.body);
    // redirect the user back to the main properties page after property created
    res.redirect("/properties");
  } catch (error) {
    console.log("-----", error.message, "------")
    res.status(400).send(error.message);
  }
});

// Edit Route (Get to /properties/:id/edit)
app.get("/properties/:id/edit", async (req, res) => {
  try {
    // get the id from params
    const id = req.params.id;
    // get the property from the db
    const properties = await Property.findById(id);
    //render the template
    res.render("edit.ejs", {properties});
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
});

// UPDATE 
app.put("/properties/:id", async (req, res) => {
  // check if the status property should be true or false
  req.body.status = req.body.status === "on" ? true : false;
    const updateProperty = {
      img: req.body.img,
      address: req.body.address,
      sales_price: req.body.sales_price,
      square_feet: req.body.square_feet,
      beds: req.body.beds,
      baths: req.body.baths,
      property_manager: req.body.property_manager,
      status: req.body.status
      
    };
    // console.log(updateProperty)
    await Property.findByIdAndUpdate(req.params.id, updateProperty, {new: false})
    // Property[req.params.id] = updateProperty;
    res.redirect(`/properties/${req.params.id}`);
  });


  // The Delete Route (delete to /properties/:id)
  app.delete("/properties/:id", async (req, res) => {
    // get the id
    const id = req.params.id
    // delete the property
    await Property.findByIdAndDelete(id)
    // redirect to main page
    res.redirect("/properties")
  })
  
  
    // The Show Route (Get to /properties/:id)
  app.get("/properties/:id", async (req, res) => {
  // check if the status property should be true or false
  req.body.status = req.body.status === "on" ? true : false;
    try{
        // get the id from params
        const id = req.params.id
  
        // find the particular property from the database
        const properties = await Property.findById(id)
  
        // render the template with the property
        res.render("show.ejs", {properties})
    }catch(error){
        console.log("-----", error.message, "------")
        res.status(400).send("error, read logs for details")
    }
  })

// ***************************************  
// Turn on the server (the listener)
// ***************************************
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
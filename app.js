//jshint esversion:8
require("dotenv").config();
const express = require("express");

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json()); // enable use of json => res.json()
app.use(express.urlencoded({ extended:true})); // body-parser
app.use('/static', express.static(__dirname+'/public')); // Set static directory and local directory of files

app.get("/", (req,res) => {
    const date = new Date();
    const day = date.getDay();

    const dateOptions = {
        day: "numeric",
        month: "long",
    };
    const localDate = date.toLocaleDateString(req.acceptsLanguages()[0],dateOptions);
    /**
     * Only as an example, not really used by the application
     */
    let msg = "";
    if(day === 6 || day === 0)
    {
        msg = "It's Weekend!";
    } else {
        msg = "It's work day!";
    }

    res.render('index', {"message": msg, "date":localDate});
});

app.post("/addTask", (req,res) => {
    const item = req.body.item;
    res.json({"status": 'added', 'item': item});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
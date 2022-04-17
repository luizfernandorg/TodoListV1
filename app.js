//jshint esversion:8
require("dotenv").config();
const express = require("express");
const {getDate,getDay} = require(__dirname + "/date")

const app = express();

const items = []
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json()); // enable use of json => res.json()
app.use(express.urlencoded({ extended:true})); // body-parser
app.use('/static', express.static(__dirname+'/public')); // Set static directory and local directory of files

app.get("/", (req,res) => {
    const date = new Date();
    const day = date.getDay();

    const localDate = getDate(req.acceptsLanguages()[0]);
    /**
     * Only an example, not really used by the application
     */
    let msg = "";
    if(day === 6 || day === 0)
    {
        msg = "It's Weekend!";
    } else {
        msg = "It's work day!";
    }

    res.render('index', {"message": msg, "date":localDate, 'items':items});
});

app.post("/addTask", (req,res) => {
    const item = req.body.item;
    if(items.length === 0){
        items.push({'id': 0, "item":item})
    }else {
        items.push({'id': items[items.length-1].id+1, "item":item})
    }
     res.json({"status": 'added', "item": items[items.length-1]});
});
app.post("/removeTask", (req,res) => {
    const id = parseInt(req.body.id)
    items.splice(id,1)
    res.json({"status": "removed"})
})
app.post("/updateTask", (req,res) => {
    console.log(req.body.id)
    const id = parseInt(req.body.id)
    const itemValue = req.body.item
    const oldValue = req.body.old
    const index = items.indexOf({'id':id, 'item':oldValue}) + 1
    console.log(items)
    console.log(index)
    items[index] = {'id': index, "item": itemValue}
    console.log(items)
    res.json({"status": "updated", "item":items[index]})
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
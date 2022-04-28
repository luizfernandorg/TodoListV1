//jshint esversion:8
require("dotenv").config();
const express = require("express");
const {getDate,getDay} = require(__dirname + "/date")

const app = express();

let items = []
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json()); // enable use of json => res.json()
app.use(express.urlencoded({ extended:true})); // body-parser
app.use('/static', express.static(__dirname+'/public')); // Set static directory and local directory of files

app.get("/", (req,res) => {
    const date = new Date();
    const day = date.getDay();

    const localDate = getDate(req.acceptsLanguages()[0]);

    res.render('index', {"date":localDate, 'items':items});
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
    const value = req.body.item
    let index = -1
    
    items.find((item, i) => {
        if(item.item === value){
            index = i
            return i
        }
    })
    items.splice(index, 1)
    res.json({"status": "removed"})
})
app.post("/updateTask", (req,res) => {
    const id = parseInt(req.body.id)
    const itemValue = req.body.item
    const oldValue = req.body.old
    let index = -1
    items.find((item, i) => {
        if(item.item === oldValue){
            index = i
            return i
        }
    })
    items[index] = {'id': index, "item": itemValue}
    res.json({"status": "updated", "item":items[index]})
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
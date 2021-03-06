const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: function(req, res) {
        // your code here
        db.findMany(User, {}, null, result=>{
            res.render('home', {contacts: result}); // This is to load the page initially
        })
        
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: function(req, res) {
        // your code here
        let num = req.query.number;
        let query = {number: num}        

        db.findOne(User, query, null, (result)=>{
            if (result)
                return res.send(result.number)
            else return res.send("")
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: function(req, res) {
        // your code here
        let data = {
            name: req.query.name,
            number: req.query.number
        }

        let record = new User(data)
        
        db.insertOne(User, record, result=>{
            res.render("card", (err, html)=>{
                console.log(typeof html)
                res.send(html)
            })
            
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: function (req, res) {
        // your code here
        let data = {
            name: req.query.name,
            number: req.query.number,
        }

        let record = new User(data);
        db.deleteOne(User, record, result=>{
            console.log("In getDelete")
            res.send(result);
        })
    }

}

module.exports = controller;

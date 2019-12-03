// import/require connection.js file to stablish connection
const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    let arr = [];
    for (var key in ob) {
        let value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

// display all the burgers in the database
let orm = {
    selectAll: function(table, cb) {
        let queryString = "SELECT * FROM " + table + ";";

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            // console.log("this should display all burgers")
            // console.log(result);
            cb(result);

        });
    },

    // adding burgers to the database
    insertOne: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        
        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            // console.log("this should add a burger to the database")
            // console.log(result);
            cb(result);
        });
    },

    updateOne: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        // console.log(objColVal, id);
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err; 
            }
            // console.log("this updates the burger status")
            // console.log(result);
            cb(result);
        });
    },

    deleteOne: function(table, condition, cb) {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            // console.log("this should delete devoured burgers from the database")
            // console.log(result);
            cb(result);
        });
    }
};

module.exports = orm;
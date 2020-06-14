const db = require("../../db");
const mongoose = require('mongoose');
const httpMsgs = require("../../httpMsgs");
const jwt = require('jsonwebtoken');
const secret = "secret";

const bcrypt = require('bcrypt');
const User = require("../models/user");



exports.users_signup = (req, res, next) => {
    var sql = "SELECT * FROM Customer WHERE Username  = '" + req.body.Username + "'";


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {
            if (!isEmptyObject(data)) {

                return res.status(409).json({
                    message: 'Username Exists'
                });
            } else {


                var sql = "SELECT * FROM Customer WHERE Email  = '" + req.body.Email + "'";


                db.executeSql(sql, function (data, err) {
                    if (err) {
                        httpMsgs.show500(req, res, err);

                    } else {
                        if (!isEmptyObject(data)) {

                            return res.status(409).json({
                                message: 'Mail Exists'
                            });
                        } else {


                            bcrypt.hash(req.body.Password, 10, (err, hash) => {
                                if (err) {
                                    return res.status(500).json({
                                        error: err
                                    });
                                } else {

                                    const user = new User({
                                        Address: req.body.Address,
                                        Latitude: req.body.Latitude,
                                        Longitude: req.body.Longitude,
                                        Username: req.body.Username,
                                        Password: hash,
                                        Email: req.body.Email,
                                        Status: req.body.Status,
                                        Phone: req.body.Phone

                                    });






                                    var sql = "INSERT INTO  Customer (Address,Latitude,Longitude,Username,Password,Email,Status,Phone) VALUES ";

                                    sql += (" ('" + user.Address + "','" + user.Latitude + "', '" + user.Longitude + "', '" + user.Username + "','" + user.Password + "','" + user.Email + "','" + user.Status + "','" + user.Phone + "') ");



                                    db.executeSql(sql, function (data, err) {
                                        if (err) {
                                            httpMsgs.show500(req, res, err);

                                        } else {

                                            res.status(201).json({
                                                message: 'User Created',
                                                createduser: user
                                            });
                                        }

                                    });





                                }
                            });

                        }

                    }









                });


            }
        }
    });

}


exports.users_login = (req, res, next) => {                                                    


    const user1 = {
        Username: req.body.Username,
        Password: req.body.Password
    };
    var sql = "SELECT * FROM Customer WHERE Username  = '" + user1.Username + "'";
    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        } else {
            if (isEmptyObject(data)) {
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            } else {
                bcrypt.compare(user1.Password, data[0].Password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"

                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            Username: data[0].Username,
                            Email: data[0].Email
                        },
                            secret,
                            {
                                expiresIn: "4h"

                            }
                        );

                        return res.status(200).json({
                            message: "Auth successful",
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: "Auth failed"
                    });
                });
            }
        }
    });
}

exports.users_delete = (req, res, next) => {


    const Username = req.params.Username;


    var sql = "SELECT * FROM Customer WHERE Username = '" + Username + "'";


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {

                var sql = "DELETE FROM Customer WHERE Username = '" + Username + "'";


                db.executeSql(sql, function (data, err) {
                    if (err) {
                        httpMsgs.show500(req, res, err);

                    } else {


                        res.status(200).json({
                            message: 'Deleted User',
                            Username: Username

                        });




                    }

                });


            } else {
                httpMsgs.show404(req, res, err);
            }


        }

    });


}



function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
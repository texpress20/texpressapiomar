const db = require("../../db");
const httpMsgs = require("../../httpMsgs");
var util = require("util");


exports.markets_get_all = (req, res, next) => {



    var sql = "SELECT * FROM Markets ";


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {
            res.status(200).json({
                message: 'Handling GET requests to /items',
                data: data
            });



        }

    });


}



exports.markets_create_market = (req, res, next) => {



    const market = {
        Marketno: req.body.Marketno,
        Name: req.body.Name,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        Address: req.body.Address,
        Rating: req.body.Rating,
        MarketImage: req.file.path
    };

    var sql = "SET IDENTITY_INSERT Markets ON ";

    sql += "INSERT INTO  Markets (Marketno,Name,Latitude,Longitude,Address,Rating,MarketImage) VALUES ";
 //   sql += util.format("(%d,%s,%d,%d,%s,%d,%d)", market.Marketno , market.Name , market.Latitude , market.Longitude, market.Address ,  market.Rating  ,  market.MarketImage  );
    sql += (" ('" + market.Marketno + "','" + market.Name + "', '" + market.Latitude + "', '" + market.Longitude + "','" + market.Address + "','" + market.Rating + "','" + market.MarketImage + "') ");



    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            res.status(201).json({
                message: 'Handling POST requests to /markets',
                createdmarket: market
            });
        }

    });



}

exports.markets_get_market = (req, res, next) => {
    const id = req.params.Marketno;

    var sql = "SELECT * FROM Markets WHERE Marketno = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {
                res.status(200).json({
                    message: 'You passed an ID',
                    data: data

                    //Image: "http://localhost:3000/" + docsImage

                });
            } else {
                httpMsgs.show404(req, res, err);
            }


        }

    });






}


exports.markets_update_market = (req, res, next) => {
    const id = req.params.Marketno;
    var sql = "SELECT * FROM Markets WHERE Marketno = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {


                try {
                    if (!req.body) throw new Error("Input not valid");
                    var data = JSON.parse(JSON.stringify(req.body));
                    if (data) {





                        if (!id) throw new Error("Marketno not provided");





                        var sql = "UPDATE Markets SET";


                        var isDataProvided = false;

                        if (data.Name) {
                            sql += " Name = '" + data.Name + "' ,";
                            isDataProvided = true;
                        }

                        if (data.Latitude) {
                            sql += " Latitude = '" + data.Latitude + "',";
                            isDataProvided = true;
                        }

                        if (data.Longitude) {
                            sql += " Longitude = '" + data.Longitude + "',";
                            isDataProvided = true;
                        }


                        if (data.Address) {
                            sql += " Address = '" + data.Address + "' ,";
                            isDataProvided = true;
                        }

                        if (data.Rating) {
                            sql += " Rating = '" + data.Rating + "',";
                            isDataProvided = true;
                        }

                        if (data.MarketImage) {
                            sql += " MarketImage = '" + data.MarketImage + "' ,";
                            isDataProvided = true;
                        }

                     

                        sql = sql.slice(0, -1);

                        sql += "WHERE  Marketno = " + id;








                        db.executeSql(sql, function (data, err) {
                            if (err) {


                                httpMsgs.show500(req, res, err);
                            } else {

                                // httpMsgs.send200(req, resp);

                                res.status(200).json({
                                    message: 'Updated Market'



                                });



                            }


                        });


                    } else {
                        throw new Error("Input not valid");

                    }


                } catch (ex) {
                    httpMsgs.show500(req, res, ex);


                }


            } else {
                httpMsgs.show404(req, res, err);
            }
        }

    });







}


exports.markets_delete_market = (req, res, next) => {

    const id = req.params.Marketno;


    var sql = "SELECT * FROM Markets WHERE Marketno = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {

                var sql = "DELETE FROM Markets WHERE Marketno = " + id;


                db.executeSql(sql, function (data, err) {
                    if (err) {
                        httpMsgs.show500(req, res, err);

                    } else {


                        res.status(200).json({
                            message: 'Deleted market',
                            id: id

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

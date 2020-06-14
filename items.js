const db = require("../../db");
const httpMsgs = require("../../httpMsgs");
const Items = require("../models/items");

exports.items_get_all = (req, res, next) => {

    Items.find().select("_id Image").exec().then(docs => {
       });


    var sql = "SELECT * FROM Items ";


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



exports.items_create_item = (req, res, next) => {



    const item = {
        ItemNO: req.body.ItemNO,
        ItemName: req.body.ItemName,
        Details: req.body.Details,
        Price: req.body.Price,
        SubSectionNo: req.body.SubSectionNo,
        Itemimage: req.file.path,
        Itemweight: req.body.Itemweight,
        Marketno: req.body.Marketno
    };
    /*

    const items = new Items({
        _id: item.ItemNO,
        Image: req.file.path

    });
    items.save().then(result => {
        console.log(result);
    });


*/

    var sql = "SET IDENTITY_INSERT Items ON ";

    sql += "INSERT INTO  Items (ItemNO,ItemName,Details,Price,SubSectionNo,Itemimage,Itemweight,Marketno) VALUES ";
    // sql += util.format("(%d,%s,%s,%s,%d,%s,%s,%d)", item.ItemNO, item.ItemName, item.Details, item.Price, item.SubSectionNo,items.Image, item.Itemweight, item.Marketno);
    sql += (" ('" + item.ItemNO + "','" + item.ItemName + "', '" + item.Details + "', '" + item.Price + "','" + item.SubSectionNo + "','" + items.Itemimage + "','" + item.Itemweight + "','" + item.Marketno + "') ");



    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            res.status(201).json({
                message: 'Handling POST requests to /items',
                createditem: item
            });
        }

    });



}

exports.items_get_item = (req, res, next) => {
    const id = req.params.ItemNO;
/*
    var docsImage;
    Items.findById(id).select("_id Image").exec().then(docs => {
        console.log("from database", docs);
        docsImage = docs.Image;
    });
    */
    var sql = "SELECT * FROM Items WHERE ItemNO = " + id;


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


exports.items_update_item = (req, res, next) => {
    const id = req.params.ItemNO;
    var sql = "SELECT * FROM Items WHERE ItemNO = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {


                try {
                    if (!req.body) throw new Error("Input not valid");
                    var data = JSON.parse(JSON.stringify(req.body));
                    if (data) {





                        if (!id) throw new Error("ItemNO not provided");





                        var sql = "UPDATE Items SET";


                        var isDataProvided = false;

                        if (data.ItemName) {
                            sql += " ItemName = '" + data.ItemName + "' ,";
                            isDataProvided = true;
                        }

                        if (data.Details) {
                            sql += " Details = '" + data.Details + "',";
                            isDataProvided = true;
                        }

                        if (data.Price) {
                            sql += " Price = '" + data.Price + "',";
                            isDataProvided = true;
                        }


                        if (data.SubSectionNo) {
                            sql += " SubSectionNo = '" + data.SubSectionNo + "' ,";
                            isDataProvided = true;
                        }

                        if (data.Itemimage) {
                            sql += " Itemimage = '" + data.Itemimage + "',";
                            isDataProvided = true;
                        }

                        if (data.Itemweight) {
                            sql += " Itemweight = '" + data.Itemweight + "' ,";
                            isDataProvided = true;
                        }

                        if (data.Marketno) {
                            sql += " Marketno = '" + data.Marketno + "' ,";
                            isDataProvided = true;
                        }

                        sql = sql.slice(0, -1);

                        sql += "WHERE  ItemNO = " + id;








                        db.executeSql(sql, function (data, err) {
                            if (err) {


                                httpMsgs.show500(req, res, err);
                            } else {

                                // httpMsgs.send200(req, resp);

                                res.status(200).json({
                                    message: 'Updated item'



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


exports.items_delete_item = (req, res, next) => {

    const id = req.params.ItemNO;


    var sql = "SELECT * FROM Items WHERE ItemNO = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {

                var sql = "DELETE FROM Items WHERE ItemNO = " + id;


                db.executeSql(sql, function (data, err) {
                    if (err) {
                        httpMsgs.show500(req, res, err);

                    } else {


                        res.status(200).json({
                            message: 'Deleted item',
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

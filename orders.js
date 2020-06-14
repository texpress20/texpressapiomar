const db = require("../../db");
const httpMsgs = require("../../httpMsgs");

exports.orders_get_all = (req, res, next) => {


    var sql = "SELECT * FROM Orders ";


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {
            res.status(200).json({
                message: 'Orders were fetched',
                data: data
            });



        }

    });
}


exports.orders_create_order = (req, res, next) => {


    const order = {
        //  ItemNO: req.body.ItemNO,
        Date: req.body.Date,
        TotalPrice: req.body.TotalPrice,
        Status: req.body.Status,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Username: req.body.Username,
        Marketno: req.body.Marketno



    };



    // var sql ="SET IDENTITY_INSERT Items OFF ";

    var sql = "INSERT INTO  Orders (Date ,TotalPrice ,Status ,Email ,Phone ,Username ,Marketno ) VALUES ";
    sql += (" ('" + order.Date + "', '" + order.TotalPrice + "', '" + order.Status + "','" + order.Email + "','" + order.Phone + "','" + order.Username + "','" + order.Marketno + "') ");



    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            res.status(201).json({
                message: 'Orders was created',
                createdorder: order
            });
        }

    });




} 


exports.orders_get_order = (req, res, next) => {

    const id = req.params.Orderno;



    var sql = "SELECT * FROM Orders WHERE Orderno = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {
                res.status(200).json({
                    message: 'Orders details',
                    data: data
                });
            } else {
                httpMsgs.show404(req, res, err);
            }


        }

    });




}



exports.orders_delete_order = (req, res, next) => {


    const id = req.params.Orderno;


    var sql = "SELECT * FROM Orders WHERE Orderno  = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {

                var sql = "DELETE FROM Orders WHERE Orderno = " + id;


                db.executeSql(sql, function (data, err) {
                    if (err) {
                        httpMsgs.show500(req, res, err);

                    } else {


                        res.status(200).json({
                            message: 'Orders deleted',
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
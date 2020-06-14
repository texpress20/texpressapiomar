const db = require("../../db");
const httpMsgs = require("../../httpMsgs");


exports.sales_get_all = (req, res, next) => {



    var sql = "SELECT * FROM Sales ";


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {
            res.status(200).json({
                message: 'Handling GET requests to /sales',
                data: data
            });



        }

    });


}



exports.sales_create_sale = (req, res, next) => {



    const sale = {
        Orderno: req.body.Orderno,
        Itemno: req.body.Itemno,
        Price: req.body.Price,
        Quatity: req.body.Quatity,
        Total: req.body.Total
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

    var sql = "SET IDENTITY_INSERT Sales ON ";

    sql += "INSERT INTO  Sales (Orderno,Itemno,Price,Quatity,Total) VALUES ";
    // sql += util.format("(%d,%s,%s,%s,%d,%s,%s,%d)", item.ItemNO, item.ItemName, item.Details, item.Price, item.SubSectionNo,items.Image, item.Itemweight, item.Marketno);
    sql += (" ('" + sale.Orderno + "','" + sale.Itemno + "', '" + sale.Price + "', '" + sale.Quatity + "','" + sale.Total +  "') ");



    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            res.status(201).json({
                message: 'Handling POST requests to /sales',
                createditem: item
            });
        }

    });



}

exports.sales_get_sale = (req, res, next) => {
    const id = req.params.Orderno;
    /*
        var docsImage;
        Items.findById(id).select("_id Image").exec().then(docs => {
            console.log("from database", docs);
            docsImage = docs.Image;
        });
        */
    var sql = "SELECT * FROM Sales WHERE Orderno = " + id;


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




exports.sales_delete_sale = (req, res, next) => {

    const id = req.params.Orderno;


    var sql = "SELECT * FROM Sales WHERE Orderno = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {

                var sql = "DELETE FROM Sales WHERE Orderno = " + id;


                db.executeSql(sql, function (data, err) {
                    if (err) {
                        httpMsgs.show500(req, res, err);

                    } else {


                        res.status(200).json({
                            message: 'Deleted sale',
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

const db = require("../../db");
const httpMsgs = require("../../httpMsgs");


exports.sections_get_all = (req, res, next) => {




    var sql = "SELECT * FROM Sections ";


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {
            res.status(200).json({
                message: 'Handling GET requests to /Sections',
                data: data
            });



        }

    });


}



exports.sections_create_section = (req, res, next) => {



    const section = {
        SectionNo: req.body.SectionNo,
        Name: req.body.Name,
        Details: req.body.Details,
        Markerno: req.body.Markerno,
        SectionImage: req.file.path
    };






    var sql = "SET IDENTITY_INSERT  Sections ON ";

    sql += "INSERT INTO   Sections (SectionNo,Name,Details,Markerno,SectionImage) VALUES ";
    // sql += util.format("(%d,%s,%s,%s,%d,%s,%s,%d)", item.ItemNO, item.ItemName, item.Details, item.Price, item.SubSectionNo,items.Image, item.Itemweight, item.Marketno);
    sql += (" ('" + section.SectionNo + "','" + section.Name + "', '" + section.Details + "', '" + section.Markerno + "','" + section.SectionImage + "') ");



    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            res.status(201).json({
                message: 'Handling POST requests to /sections',
                createditem: subsection
            });
        }

    });



}

exports.sections_get_section = (req, res, next) => {
    const id = req.params.SectionNo;


    var sql = "SELECT * FROM Sections WHERE SectionNo = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {
                res.status(200).json({
                    message: 'You passed an ID',
                    data: data

                });
            } else {
                httpMsgs.show404(req, res, err);
            }


        }

    });






}


exports.sections_update_section = (req, res, next) => {
    const id = req.params.SectionNo;
    var sql = "SELECT * FROM Sections WHERE SectionNo = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {


                try {
                    if (!req.body) throw new Error("Input not valid");
                    var data = JSON.parse(JSON.stringify(req.body));
                    if (data) {





                        if (!id) throw new Error("SectionNo not provided");





                        var sql = "UPDATE Sections SET";


                        var isDataProvided = false;

                        if (data.Name) {
                            sql += " Name = '" + data.Name + "' ,";
                            isDataProvided = true;
                        }

                        if (data.Details) {
                            sql += " Details = '" + data.Details + "',";
                            isDataProvided = true;
                        }

                        if (data.Markerno) {
                            sql += " Markerno = '" + data.Markerno + "',";
                            isDataProvided = true;
                        }


                        if (data.SectionImage) {
                            sql += " SectionImage = '" + data.SectionImage + "' ,";
                            isDataProvided = true;
                        }



                        sql = sql.slice(0, -1);

                        sql += "WHERE  SectionNo = " + id;








                        db.executeSql(sql, function (data, err) {
                            if (err) {


                                httpMsgs.show500(req, res, err);
                            } else {

                                // httpMsgs.send200(req, resp);

                                res.status(200).json({
                                    message: 'Updated Section'



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


exports.sections_delete_section = (req, res, next) => {

    const id = req.params.SectionNo;
     var sql = "SELECT * FROM Sections WHERE SectionNo = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {

                var sql = "DELETE FROM Sections WHERE SectionNo = " + id;


                db.executeSql(sql, function (data, err) {
                    if (err) {
                        httpMsgs.show500(req, res, err);

                    } else {


                        res.status(200).json({
                            message: 'Deleted Section',
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

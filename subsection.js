const db = require("../../db");
const httpMsgs = require("../../httpMsgs");


exports.subsections_get_all = (req, res, next) => {

 


    var sql = "SELECT * FROM SubSections ";


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {
            res.status(200).json({
                message: 'Handling GET requests to /SubSections',
                data: data
            });



        }

    });


}



exports.subsections_create_subsection = (req, res, next) => {



    const subsection = {
        SubSectionNo: req.body.SubSectionNo,
        Name: req.body.Name,
        Details: req.body.Details,
        Picture: req.file.path,
        SectionNo: req.body.SectionNo
    };






    var sql = "SET IDENTITY_INSERT  SubSections ON ";

    sql += "INSERT INTO   SubSections (SubSectionNo,Name,Details,Picture,SectionNo) VALUES ";
    // sql += util.format("(%d,%s,%s,%s,%d,%s,%s,%d)", item.ItemNO, item.ItemName, item.Details, item.Price, item.SubSectionNo,items.Image, item.Itemweight, item.Marketno);
    sql += (" ('" + subsection.SubSectionNo + "','" + subsection.Name + "', '" + subsection.Details + "', '" + subsection.Picture + "','" + subsection.SectionNo + "') ");



    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            res.status(201).json({
                message: 'Handling POST requests to /subsections',
                createditem: subsection
            });
        }

    });



}

exports.subsections_get_subsection = (req, res, next) => {
    const id = req.params.SubSectionNo;


    var sql = "SELECT * FROM SubSections WHERE SubSectionNo = " + id;


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


exports.subsections_update_subsection = (req, res, next) => {
    const id = req.params.SubSectionNo;
    var sql = "SELECT * FROM SubSections WHERE SubSectionNo = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {


                try {
                    if (!req.body) throw new Error("Input not valid");
                    var data = JSON.parse(JSON.stringify(req.body));
                    if (data) {





                        if (!id) throw new Error("SubSectionNo not provided");





                        var sql = "UPDATE SubSections SET";


                        var isDataProvided = false;

                        if (data.Name) {
                            sql += " Name = '" + data.Name + "' ,";
                            isDataProvided = true;
                        }

                        if (data.Details) {
                            sql += " Details = '" + data.Details + "',";
                            isDataProvided = true;
                        }

                        if (data.Picture) {
                            sql += " Picture = '" + data.Picture + "',";
                            isDataProvided = true;
                        }


                        if (data.SectionNo) {
                            sql += " SectionNo = '" + data.SectionNo + "' ,";
                            isDataProvided = true;
                        }



                        sql = sql.slice(0, -1);

                        sql += "WHERE  SubSectionNo = " + id;








                        db.executeSql(sql, function (data, err) {
                            if (err) {


                                httpMsgs.show500(req, res, err);
                            } else {

                                // httpMsgs.send200(req, resp);

                                res.status(200).json({
                                    message: 'Updated SubSection'



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


exports.subsections_delete_subsection = (req, res, next) => {

    const id = req.params.SubSectionNo;


    var sql = "SELECT * FROM SubSections WHERE SubSectionNo = " + id;


    db.executeSql(sql, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);

        } else {

            if (!isEmptyObject(data)) {

                var sql = "DELETE FROM SubSections WHERE SubSectionNo = " + id;


                db.executeSql(sql, function (data, err) {
                    if (err) {
                        httpMsgs.show500(req, res, err);

                    } else {


                        res.status(200).json({
                            message: 'Deleted SubSection',
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

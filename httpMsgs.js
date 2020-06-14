var settings = require("./settings");


exports.show500 = function (req, resp, err) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(500, "Internal Error Occurred", { "Content-Type": "text/html" });
        resp.write("<html><head><title> 500</title></head><body>500:Internal Error. Details:" + err + " </body ></html > ");


    } else {

        resp.writeHead(500, "Internal Error Occurred", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "ERROR Occurred:" + err }));


    }

    resp.end();

};

exports.sendJson = function (req, resp, data) {

    resp.writeHead(200, { "Content-Type": "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
       resp.end();

};



exports.show405 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Method Not Supported", { "Content-Type": "text/html" });
        resp.write("<html><head><title> 405</title></head><body>405:  Method Not Supported </body ></html > ");


    } else {

        resp.writeHead(405, "Method Not Supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({
            data: "Method Not Supported" }));


    }

    resp.end();

};

exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource Not Found", { "Content-Type": "text/html" });
        resp.write("<html><head><title> 404</title></head><body>404:Resource Not Found</body ></html > ");


    } else {

        resp.writeHead(404, "Resource Not Found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({
            data: "Resource Not Found"
        }));


    }

    resp.end();

};


exports.show413 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "text/html" });
        resp.write("<html><head><title> 413</title></head><body>413:Request Entity Too Large</body ></html > ");


    } else {

        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({
            data: "Request Entity Too Large"
        }));


    }

    resp.end();

};


exports.send200 = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "application/json" });
         resp.end();

};
exports.showHome = function (req, resp) {

    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200,  { "Content-Type": "text/html" });
        resp.write("<html><head><title>Home</title></head><body>Valid Endpoints: <br> /markets - GET - To List all Markets<br>/markets/marketno - GET - To search For a Market With Marketno</body ></html > ");


    } else {

        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.write(JSON.stringify([{ url: "/markets", operation: "GET", description: "To List All Markets" },
            { url: "/markets/<marketno>", operation: "GET", description: "To Search for a Market  with Marketno" }
        ]));


    }

    resp.end();


};




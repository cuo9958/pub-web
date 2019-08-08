const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/papi", {
            target: "http://127.0.0.1:18060",
            changeOrigin: true
        })
    );
};

const path = require("path");

export default {
    root: path.resolve(__dirname, "src"),
    resolve: {
        alias: {
            "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
            "~font-awesome": path.resolve(
                __dirname,
                "node_modules/font-awesome",
            ),
        },
    },
    server: {
        port: 5173,
        //hot: true,
    },
};

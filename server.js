const express = require("express");
const cors = require("cors");
const path = require("path");
// importing routes
const tasks = require("./routes/api/task");
//mongoDB connection
require("./config/db");

// const __dirname = path.resolve();


const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("hello"));


// use route
app.use("/api/tasks", tasks);

//change the port number to react server port then it will work fine
const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3008/", //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);
const port = process.env.PORT || 3008;

app.use(express.static(path.join(__dirname, "/client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client","index.html"));
});
app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddlware = require("./middlewares/error-middleware");
const questionRoute = require("./router/questions-router");
const newsRoute = require("./router/news-router");
require("./controllers/news-controller");
const {updateNews} = require("./controllers/news-controller");

const PORT = 3000;

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, PATCH, HEAD, DELETE",
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/questions", questionRoute);
app.use("/api/news", newsRoute);

app.use(errorMiddlware);

connectDb().then(async () => {
    await updateNews();

    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    })
});

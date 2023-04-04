const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json())

const db = require('./models')

//Routers
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);
const commentsRouter = require('./routes/Reviews');
app.use("/reviews", commentsRouter);
const userRouter = require('./routes/Users');
app.use("/auth", userRouter);
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
    });
});

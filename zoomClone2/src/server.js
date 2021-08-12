import express from "express";

const app = express();

app.set("view engine", "pug");                              // view engine으로 무엇을 사용할 것인지 정해줌.
app.set("views", __dirname + "/views");                     // express 에게 템플릿이 어디에 있는지 정해줌.
app.use("/public", express.static(__dirname + "/public"))   // public url을 생성해서 유저에게 파일을 공유

app.get("/", (req, res) => {
    res.render("home")
});

const handleListen = () => console.log('Listening on http://localhost:3000');
app.listen(3000);

///////////////////////////////////////////////////////////////////////////////////
// $ npm run dev
//
// 로 실행시킵니다.
///////////////////////////////////////////////////////////////////////////////////
const Koa = require('koa');
//koa-static = 服務靜態路由
const serve = require('koa-static');
const Router = require('koa-router');
const BodyParser = require('koa-body');


const app = new Koa();
//Router = 哪一個路徑用甚麼方法做甚麼事
const router = new Router();
const bodyParser = new BodyParser();

//資料庫
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: 'collection',
    port: 3306
});





//設定路由
router.post('/comments', bodyParser, function (ctx, next) {
    let body = ctx.request.body;
    conn.connect();
    conn.query(`INSERT INTO comment (name,email,subject,content) VALUES ('${body.name}','${body.email}','${body.subject}','${body.message}')`, function (err) {
        conn.end();
        if (err) throw err;
    });

    ctx.status = 200;

    ctx.body = `your request: ${JSON.stringify(ctx.request.body)}`;
    next();
});

//使用上方設定的路由
app.use(router.routes());

//__dirname = 目前檔案資料夾位置
//讓koa用在現在檔案資料夾底下的static資料夾
app.use(serve(__dirname + '/static'));

app.listen(3000);
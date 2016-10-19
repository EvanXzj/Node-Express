var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();


// 设置 handlebars 视图引擎
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);//设置服务器监听端口

/*
*在 Express文档中写的是app.VERB。这并不意味着存在一个叫VERB的方法,它指代HTTP动词的(最常见的是“get” 和“post”)。
*这个方法有两个参数：一个路径和一个函数。
*
*app.VERB 帮我们做了很多工作：它默认忽略了大小写或反斜杠，并且在进行匹配时也不考虑查询字符串。
*所以针对关于页面的路由对于 /about、/About、/about/、/about?foo=bar、/about/?foo=bar 等路径都适用
*/
//home page

//设置静态文件路径,static 中间件相当于给你想要发送的所有静态文件创建了一个路由渲染文件并发送给客户端
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
	res.render('home');
});

//about page
app.get('/about',function(req,res){
	res.render('about',{fortune:fortune.getFortune});
});

//定制404页面
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

//定制500页面
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://127.0.0.1:'+app.get('port')+'; Press Ctrl-C to terminate');
});
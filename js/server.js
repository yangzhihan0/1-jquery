//  安装node 环境
// node js  官网下载安装
// win+r    ===》 cmd  窗口出现后   输入  node -v   出现版本号，就代表安装成功
// server.js 的父文件上右键 ，在终端中打开
// 输入  node server.js  运行

/* 
  实现注册  登录


  接口使用：
  接口地址：http://127.0.0.1:3001/user
  传输方式 ：POST
  接受参数：
  act: login/登录   reg/注册
  user: 用户名
  pass： 密码
  nickname:昵称
  age:年龄
  address:住址
  avatar:头像(只支持添加网络图片路径)
*/

var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var user = {}; //act 判断登录还是注册,user /pass
var server = http.createServer(function (req, res) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader(
    'Access-Control-Allow-Origin', "*"
  )
  const GET = url.parse(req.url, true);
  var query = GET.query;
  var pathname = GET.pathname;
  var str = '';
  if (pathname == '/user') {
    req.on('data', function (chunk) {
      console.log(11)
      str += chunk;
    });
    req.on('end', function () {
      var POST = querystring.parse(str)
      console.log(POST);
      switch (POST.act) {
        case 'reg':
          if (user[POST.user] == null) {
            // user[POST.user] = POST.pass;
            user[POST.user] = {
              pass: POST.pass,
              nickname: POST.nickname,
              age: POST.age,
              address: POST.address,
              avatar: POST.avatar,
              user: POST.user
            }
            res.write('{"ok":true,"msg":"注册成功"}')
          } else {
            res.write('{"ok":false,"msg":"该用户名已经被注册"}')
          }
          break;
        case 'login':
          if (user[POST.user] == null) {
            res.write('{"ok":false,"msg":"用户名不存在"}')
          } else if (user[POST.user].pass != POST.pass) {
            res.write('{"ok":false,"msg":"用户名或密码不对"}')
          } else {
            let obj = {
              ok: true,
              msg: '登录成功',
              info: user[POST.user]
            }
            res.write(JSON.stringify(obj))
          }
          break;
        default:
          res.write('你要干啥？')
      }
      res.end()
    })
  } else {
    const file_name = './www' + req.url;
    fs.readFile(file_name, 'utf-8', function (err, data) {
      if (err) {
        res.write('404')
      } else {
        res.write(data)
      }
      res.end()
    })
  }
}).listen(3001, '127.0.0.1', function () {
  console.log('your server is running here:127.0.0.1:3001')
})
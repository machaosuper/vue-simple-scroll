var express = require('express');
var bodyParser = require('body-parser');
// var config = require('./config/index');

// var opn = require('opn');

// var port = process.env.PORT || config.build.port;

// var autoOpenBrowser = !!config.dev.autoOpenBrowser

var port = 8000;

var autoOpenBrowser = false;

var app = express();

app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: true
}));

var router = express.Router();

// router.get('/', function(req, res, next) {
//     req.url = '/index.html';
//     next();
// });

app.use(router);



var appData = require('./data.json');
var imgListData = appData.imgList;
// var goods = appData.goods;
// var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.post('/imgList', function(req, res) {
  console.log(req.body);
  var pageSize = +req.body.pageSize || 10;
  var pageNo = +req.body.pageNo || 0;
  console.log('pageSize:' + pageSize + 'pageNO:' + pageNo)
  var count = pageSize * pageNo;
  console.log('count:' + count + 'count + pageSize:' + (count + pageSize))
  imgList = imgListData.slice(count, count + pageSize);
  var isLast = imgListData.slice(count + pageSize + 1).length === 0;
  res.json({
      code: '000000',
      data: {
        imgList: imgList,
        isLast: isLast
      }
  });
});

// apiRoutes.get('/goods', function(req, res) {
//     res.json({
//         errno: 0,
//         data: goods
//     });
// });

// apiRoutes.get('/ratings', function(req, res) {
//     res.json({
//         errno: 0,
//         data: ratings
//     });
// });

app.use('/api', apiRoutes);


// app.use(express.static('./dist'));


var uri = 'http://172.16.107.90:' + port

// devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
// })

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
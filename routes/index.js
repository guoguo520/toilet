var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/'
/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user) {
    return res.render('login', {});
  }
  res.render('index', {});
});

router.get('/login', function(req, res, next) {
  res.render('login', {});
});

router.get('/tuijian', function(req, res, next) {
  if(!req.session.user) {
    return res.render('login', {});
  }
  res.render('tuijian', {});
});

router.get('/edit', function(req, res, next) {
  if(!req.session.user) {
    return res.render('login', {});
  }
  var type = req.query.type;
  if(type) {
    var obj = {};
    switch(type) {
      case 'it':
        obj = {};
        break;

      case 'config':
        obj = {};
        break;

      case 'cookies':
        obj = {};
        break;
      
      case 'manager':
        obj = {};
        break;

      case 'sanwen':
        obj = {};
        break;
      default :
        return res.send({
          status: 0,
          info: '参数错误'
        });
        break;
    }
    fs.readFile(PATH + type + '.json', function(err, data) {
      if(err) {
        res.send({
          status: 0,
          info: '文件读取失败'
        });
      }
      var obj = JSON.parse(data.toString());
      return res.render( 'edit',{
        data: obj
      });
    });
  } else {
    return res.send({
      status: 0,
      info: '参数错误'
    });
  }
});

//首页大表单


module.exports = router;

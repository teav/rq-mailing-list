var express = require('express');
var router = express.Router();

/* mailgun api stuff */
var mgDomain = 'mail.remotequote.co';
var mgApiKey = 'key-f774f1eebad0d53ab004b35e8e0726fd';
var mailgun = require('mailgun-js')({apiKey: mgApiKey, domain: mgDomain});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var email = req.body.email;
  //add user to list
  var list = mailgun.lists('maillist_' + req.body.customerType + '@' + mgDomain);

  list.members().create({
      subscribed: true,
      address: req.body.email,
      vars: {date_added: Date.now()}
    })
    .then(function(data) {
        next();
      }, function(err) {
        next(err);
      });
});

module.exports = router;

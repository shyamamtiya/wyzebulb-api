var express = require('express');
var router = express.Router();
var request = require('request');

var jsonObj = {
	toNumber: '7031949003',
	smsText: 'Food items are waiting in your cart. Continue checkout to place your order.'
};
var options = {
	url: 'https://leado-mini-project-api.herokuapp.com/sendSms',
	headers: {
		'Content-Type': 'application/json',
		'x-access-token':
			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2h5YW0ifQ.a9R1PRhBuYObDt3nSrkqO58emrv4-HLbVKqfz56tf5U'
	},
	body: jsonObj,
	json: true
};
/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendStatus(200);
});

router.post('/sms', function(req, res, next) {
	let selectField = req.body.selectedField;
	console.log('sele', selectField);
	console.log(req.body[selectField]);
	console.log(req.body)
	let s = req.body.operator;
	jsonObj.smsText = req.body.msg;
	jsonObj.toNumber = req.body.phone;
	switch (s) {
		case 'lesser than': {
			if (req.body[selectField] < req.body.inpValue) {
				sendSMS(req, res, function(obj) {
					res.send(obj);
				});
			} else {
				res.send('Unable to send msg due to condition mismatch');
			}
			break;
		}
		case 'greater than': {
			if (req.body[selectField] > req.body.inpValue) {
				sendSMS(req, res, function(obj) {
					res.send(obj);
				});
			} else {
				res.send('Unable to send msg due to condition mismatch');
			}
			break;
		}
		case 'equals': {
			if (req.body[selectField] == req.body.inpValue) {
				sendSMS(req, res, function(obj) {
					res.send(obj);
				});
			} else {
				res.send('Unable to send msg due to condition mismatch');
			}
			break;
		}
		case 'not equals': {
			if (req.body[selectField] != req.body.inpValue) {
				sendSMS(req, res, function(obj) {
					res.send(obj);
				});
			} else {
				res.send('Unable to send msg due to condition mismatch');
			}
			break;
		}
		case 'contains': {
			if (req.body[selectField] > 0) {
				sendSMS(req, res, function(obj) {
					res.send(obj);
				});
			} else {
				res.send('Unable to send msg due to condition mismatch');
			}
			break;
		}
	}
});

function sendSMS(req, response, done) {
	request.post(options, function(err, res) {
		console.log('indside cld');
		if (err) {
			console.log('err', err);
			throw err;
		}
		console.log(res.body);
		done(res.body);
	});
}

module.exports = router;

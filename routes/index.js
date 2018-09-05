var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Wyzebulb' });
});
router.post('/', function(req, res, next) {
	res.render('filter', {
		mobile: req.body.mobile || 1234567890,
		carttotal: req.body.carttotal || 0
	});
});
router.post('/trigger', function(req, res, next) {
	res.render('trigger', {
		carttotal: req.body.carttotal,
		operator: req.body.sel2,
		inpValue: req.body.filtervalue,
		mobile: req.body.mobile
	});
	console.log('body', req.body);
});

function something() {
	console.log('something');
}
module.exports = router;

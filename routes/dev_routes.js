var express = require('express');
var router = express.Router({
    mergeParams: true
});

var User = require('../models/user').User;

router.get('/', function (req, res) {
    res.render('dev_tools/dev_home');
});

router.get('/create-admin', function (req, res) {
    // test!
    var newUser = new User({
        email: 'a',
        first_name: 'Development',
        last_name: 'Admin',
        gender: 'female',
        validated: true,
        roles: 'admin'
    });
    // newUser.save();

    // newUser.generateHash('a');
    // var newUser = new User({
    //     email: 'asaf1@omc.co.il',
    //     first_name: 'Development',
    //     last_name: 'asi',
    //     gender: 'female',
    //     validated: true,
    //     roles: 'camp_mgr'
    // });
    newUser.generateHash('a');
    
    
    newUser.save().then(function (model) {
        res.redirect("/");
    });

    res.redirect("./");
});

router.get('/view-debug/*', function (req, res) {
    const path = req.path.substr('/view-debug/'.length);
    if (path === '') {
        res.render('dev_tools/view_debug');
    } else {
        res.render('${path}', JSON.parse(req.query.params)); // eslint-disable-line no-template-curly-in-string
    }
});

module.exports = router;
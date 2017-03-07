var bookshelf = require('../libs/db').bookshelf;
var bcrypt = require('bcrypt-nodejs');
var randtoken = require('rand-token');
var NpoMember = require('./npo_member').NpoMember;
var constants = require('./constants.js');
var drupalHash = require('drupal-hash');
var userRole = require('../libs/user_role');

var User = bookshelf.Model.extend({
    tableName: constants.USERS_TABLE_NAME,
    idAttribute: 'user_id',
    npoMember: function() {
        return this.hasMany(NpoMember);
    },

    generateHash: function(password) {
        this.attributes.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    generateValidation: function() {
        var date = new Date();
        var offset = (24 * 60 * 60 * 1000); // hours*minutes*seconds*millis
        date.setTime(date.getTime() + offset);

        this.attributes.email_validation_expires = date.toISOString().slice(0, 19).replace('T', ' ');
        this.attributes.email_validation_token = randtoken.generate(32);
    },

    validate: function() {
        var expires = new Date(this.attributes.email_validation_expires);
        if (expires.getTime() > Date.now()) {
            this.attributes.validated = true;
            this.attributes.email_validation_token = null;
            this.attributes.email_validation_expires = null;
            return true;
        }
        return false;
    },

    validPassword: function(password) {
        return bcrypt.compareSync(password, this.attributes.password);
    },

    hasRole: function(role) {
        return (this.attributes.roles && this.attributes.roles.split(',').indexOf(role) > -1);
    },

    virtuals: {
        fullName: function() {
            return this.attributes.first_name + ' ' + this.attributes.last_name;
        },

        isAdmin: function() {
            return this.hasRole(userRole.ADMIN);
        }
    }
});

var DrupalUser = bookshelf.Model.extend({
    tableName: constants.DRUPAL_USERS_TABLE_NAME,
    validPassword: function(password) {
        return drupalHash.checkPassword(this.attributes.pass, hash);       
    }
});

// Create the model and expose it
module.exports = {
    User: User,
    DrupalUser: DrupalUser
};

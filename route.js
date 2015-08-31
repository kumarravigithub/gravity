Router.route('/', function () {
    this.render('login');
}, {
    name: 'root'
});

Router.route('/login', function () {
    this.render('login');
}, {
    name: 'login'
});

Router.route('/cybuzz', function () {
    this.render('loginstaff');
}, {
    name: 'loginstaff'
});

Router.route('/home', function () {
    Meteor.subscribe('ticketsforclients', SessionStore.get("myid"));
    Meteor.subscribe('serviceList', SessionStore.get("myid"));
    this.render('dashboard');
}, {
    name: 'home'
});


Router.route('/open', function () {
    Meteor.subscribe('serviceList', SessionStore.get("myid"));
    this.render('openticket');
}, {
    name: 'openticket'
});

Router.route('/client', function () {
    Meteor.subscribe('clientList', SessionStore.get("myid"));
    this.render('manageclient');
}, {
    name: 'manageclient'
});

Router.route('/staff', function () {
    Meteor.subscribe('staffList', SessionStore.get("myid"));
    this.render('managestaff');
}, {
    name: 'managestaff'
});

Router.route('/service/:_id', function () {
    Meteor.subscribe('serviceListMaster', this.params._id, SessionStore.get("myid"));
    this.render('manageservice', {data: {clientid: this.params._id}});
}, {
    name: 'manageservice'
});

Router.route('/ticket/:_id', function () {
    Meteor.subscribe('ticketView', SessionStore.get("myid"), this.params._id);
    Meteor.subscribe('ticketActivities', SessionStore.get("myid"), this.params._id);
    Meteor.subscribe('ticketRatings', SessionStore.get("myid"), this.params._id);
    Meteor.subscribe('mysession', SessionStore.get("myid"));
    Meteor.subscribe('staffList', SessionStore.get("myid"));
    this.render('ticketview', {data: {clientid: this.params._id}});
}, {
    name: 'ticketview'
});

Router.configure({
    layoutTemplate: 'navbar'
});
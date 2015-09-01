Template.navbar.helpers({
    isLogged: function () {
        // because the Session variable will most probably be undefined the first time
        return SessionStore.get("loggedin");
    },
    isLoading: function () {
        // because the Session variable will most probably be undefined the first time
        return SessionStore.get("loading");
    },
    myMenu: function () {
        // because the Session variable will most probably be undefined the first time
        return SessionStore.get("menu");
    },
    myName: function () {
        // because the Session variable will most probably be undefined the first time
        return SessionStore.get("name");
    },
    myLink: function () {
        // because the Session variable will most probably be undefined the first time
        return SessionStore.get("homelink");
    }
});

Template.navbar.events({
    'click #logout': function (e, t) {
        e.preventDefault();
        // retrieve the input field values
        var type=SessionStore.get("logintype");
        SessionStore.clear();
        SessionStore.set("loading", true);
        Meteor.call('logoutCT', SessionStore.get("myid"), function (error, result) {
            SessionStore.set("loading", false);
            if (error) {
                console.log(error.reason);
            }
            else {

                Router.go('login');
            
            }
        });

        return false;
    }
});
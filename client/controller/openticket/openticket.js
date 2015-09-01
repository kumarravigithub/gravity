Template.openticket.events({
    'click #openticket': function (e, t) {
        SessionStore.set("loading", true);
        e.preventDefault();
        // retrieve the input field values
        var subject = t.find('#subject').value
        var service = t.find('#service').value;
        var detail = t.find('#detail').value;
        Meteor.call('openTicket', subject, service, detail, SessionStore.get("myid"), function (error, result) {
            SessionStore.set("loading", false);
            if (error) {
                SessionStore.set("loginerror", {status: true, message: "Some serious error. Please contact admin"});
            }
            else {
                console.log(result);
                alert(result.message);
                if (result.status) {
                    // get ticket ID and go to the ticket page.

                    Router.go('home');
                } else {

                }
            }
        });
        return false;
    },
    'keydown #supportemail': function (e, t) {
        SessionStore.set("loginerror", undefined);
    },
    'keydown #password': function (e, t) {
        SessionStore.set("loginerror", undefined);
    }
});

Template.openticket.helpers({
    myServices: function () {
        // because the Session variable will most probably be undefined the first time
        return Services.find({});
    }
});
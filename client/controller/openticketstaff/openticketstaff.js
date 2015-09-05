Template.openticketstaff.events({
    'click #openticketstaff': function (e, t) {

        e.preventDefault();
        // retrieve the input field values
        var client = t.find('#client').value
        var subject = t.find('#subject').value
        var service = t.find('#service').value;
        var detail = t.find('#detail').value;
        if (client == "NA") {
            alert("Please select client first");
            return false;
        }
        if (service == "NA") {
            alert("Please select service first");
            return false;
        }
        SessionStore.set("loading", true);
        Meteor.call('openTicketStaff', client, subject, service, detail, SessionStore.get("myid"), function (error, result) {
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
    },
    'change #client': function (e, t) {
        var clientid = $(e.currentTarget).val();
        SessionStore.set("openticketstaff_clientid", clientid);
    }
});

Template.openticketstaff.helpers({
    myServices: function () {
        // because the Session variable will most probably be undefined the first time
        return Services.find({clientid: SessionStore.get("openticketstaff_clientid")});
    },
    myClients: function () {
        // because the Session variable will most probably be undefined the first time
        return Clients.find({});
    }
});
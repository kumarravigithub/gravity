Template.staffAdminDashboard.helpers({
    allClients: function () {
        return Clients.find({});
    },
    allStaffs: function () {
        return Staffs.find({});
    },
    allTickets: function () {
        var clientid = SessionStore.get("ticket_view_clientid");
        if (clientid == undefined) {

        } else {
            return Tickets.find({clientid: clientid});
        }
    },
    getService: function (serviceid) {
        var s = Services.findOne(serviceid);
        return s.name;
    },
    myOpenTickets: function (clientid) {
        // because the Session variable will most probably be undefined the first time
        return Tickets.find({status: 'OPEN', clientid: clientid});
    },
    myClosedTickets: function (clientid) {
        // because the Session variable will most probably be undefined the first time
        return Tickets.find({status: 'CLOSED', clientid: clientid});
    }
});

Template.staffAdminDashboard.events({
    'click a#clientlist': function (e, t) {
        var clientid = $(e.currentTarget).attr("clientid");
        //SessionStore.set("loading", true);
        SessionStore.set("ticket_view_clientid", clientid);
    },
    'change #sel2': function (e, t) {
        var ticketid = $(e.currentTarget).attr("ticketid");
        var staffid = t.find('#sel2').value;
        Meteor.call('staffRole', ticketid, staffid, SessionStore.get("myid"), function (error, result) {
            SessionStore.set("loading", false);
            if (error) {
                SessionStore.set("loginerror", {status: true, message: "Some serious error. Please contact admin"});
            }
            else {
                console.log(result);
                alert(result.message);
                if (result.status) {
                    // get ticket ID and go to the ticket page.

                } else {

                }
            }
        });

    }
});
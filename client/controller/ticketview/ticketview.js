Template.ticketview.events({
    'click a#post': function (e, t) {
        var ticketid = $(e.currentTarget).attr("ticketid");
        var comment = t.find('#comment').value;
        console.log(ticketid, comment);
        SessionStore.set("loading", true);
        Meteor.call('createActivity', ticketid, comment, SessionStore.get("myid"), function (error, result) {
            SessionStore.set("loading", false);
            t.find('#comment').value = "";
            alert(result.message);
        });
    },
    'click input.star': function (e, t) {
        var star = $(e.currentTarget).attr("value");
        var ticketid = $(e.currentTarget).attr("ticketid");
        console.log(star, ticketid);
        //SessionStore.set("loading", true);
        Meteor.call('rateTicket', ticketid, star, SessionStore.get("myid"), function (error, result) {
            SessionStore.set("loading", false);
            console.log(result);
           
        });
    },
    'click a#close': function (e, t) {
        var ticketid = $(e.currentTarget).attr("ticketid")
        SessionStore.set("loading", true);
        Meteor.call('closeTicket', ticketid, SessionStore.get("myid"), function (error, result) {
            SessionStore.set("loading", false);

        });
    },
    'click a#openagain': function (e, t) {
        var ticketid = $(e.currentTarget).attr("ticketid")
        SessionStore.set("loading", true);
        Meteor.call('openAgain', ticketid, SessionStore.get("myid"), function (error, result) {
            SessionStore.set("loading", false);

        });
    }
});

Template.ticketview.helpers({
    isOpen: function (status) {
        if (status == "OPEN") {
            return true
        } else {
            return false
        }
    },
    myRating: function (val) {
        var star = TicketRatings.findOne({});
        if (val == star.star) {
            return "checked";
        } else {
            return '';
        }
    },
    myTicket: function () {
        return Tickets.findOne({});
    },
    myTicketDetails: function () {
        return TicketActivities.find({isInternal:false});
    },
    replyFrom: function (usertype, role) {
        var loggedUser = MySessions.findOne({});
        if (loggedUser.logintype == "CLIENT") {
            if (usertype === "CLIENT") {
                return "You";
            } else {
                return "cyBuzz"
            }
        } else {
            if (usertype === "STAFF") {
                return "You";
            } else {
                return "Client"
            }
        }
    },
    nameSpanClass: function (usertype) {
        if (usertype === "CLIENT") {
            return "label label-success";
        } else {
            return "label label-default"
        }
    },
    userName: function (usertype, userid) {

        var loggedUser = MySessions.findOne({});

        if (loggedUser.logintype == "CLIENT") {
            if (usertype === "CLIENT") {
                return "You";
            } else {
                return Staffs.findOne(userid).name;
            }
        } else {
            if (usertype === "STAFF") {
                return Staffs.findOne(userid).name;
            } else {
                return "Client"
            }
        }
    },
    getService: function (serviceid) {
        var s = Services.findOne(serviceid);
        return s.name;
    },
    getStaffName: function (ticketid) {
        var a = TicketActivities.findOne({ticketid: ticketid, event: 'SA'}, {sort: {timestamp: -1}});
        console.log(a);
        if (Staffs.findOne(a.assignto)) {

            return Staffs.findOne(a.assignto).name;
        } else {
            return "";
        }
    }
});
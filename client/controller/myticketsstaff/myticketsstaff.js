Template.myticketsstaff.events({
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

Template.myticketsstaff.helpers({
    isOpenTickets: function (value) {
        if (value > 0) {
            return true;
        } else {
            return false;
        }
    },
    myOpenTickets: function () {
        // because the Session variable will most probably be undefined the first time
        return Tickets.find({status: 'OPEN'});
    },
    isClosedTickets: function (value) {
        if (value > 0) {
            return true;
        } else {
            return false;
        }
    },
    myClosedTickets: function () {
        // because the Session variable will most probably be undefined the first time
        return Tickets.find({status: 'CLOSED'});
    },
    getService: function (serviceid) {
        var s = Services.findOne(serviceid);
        return s.name;
    },
    getStaffName: function (ticketid) {
        var a = TicketActivities.findOne({ticketid: ticketid, event: 'SA'}, {sort: {timestamp: -1}});
        console.log(a);
        if(Staffs.findOne(a.assignto)) {
            
            return Staffs.findOne(a.assignto).name;
        }else{
            return "";
        }
    }
});
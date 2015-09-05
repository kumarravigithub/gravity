Meteor.publish('ticketsforclients', function (sessionid) {
    var clientid = sessionGet(sessionid, 'id');
    return Tickets.find({clientid: clientid});
});

Meteor.publish('tickets-complete-list', function (sessionid) {
    return Tickets.find({});
});

Meteor.publish('services-complete-list', function (sessionid) {
    return Services.find({});
});

Meteor.publish('serviceList', function (sessionid) {
    var clientid = sessionGet(sessionid, 'id');
    var logintype = sessionGet(sessionid, 'logintype');

    if (logintype === "CLIENT") {
        return Services.find({clientid: clientid});
    }
    console.log("Returning Services for staff :D");
    return Services.find({});
});

Meteor.publish('serviceListMaster', function (clientid, sessionid) {
    return Services.find({clientid: clientid});
});

Meteor.publish('clientList', function (sessionid) {
    return Clients.find({});
});

Meteor.publish('staffList', function (sessionid) {
    return Staffs.find({});
});


Meteor.publish('ticketView', function (sessionid, id) {
    return Tickets.find(id);
});

Meteor.publish('ticketActivities', function (sessionid, id) {
    return TicketActivities.find({ticketid: id, isInternal: false});
});

Meteor.publish('ticket-activities-for-current-staff', function (sessionid) {
    var clientid = sessionGet(sessionid, 'id');
    var tickets = Tickets.find({clientid: clientid}).fetch();
    var ticketids = [];
    tickets.forEach(function (value) {
        ticketids.push(value._id);
    });
    return TicketActivities.find({ticketid: {$in: ticketids}});
});

Meteor.publish('ticket-activities-for-all-staff', function (sessionid) {
    var clientid = sessionGet(sessionid, 'id');
    var tickets = Tickets.find({}).fetch();
    var ticketids = [];
    tickets.forEach(function (value) {
        ticketids.push(value._id);
    });
    return TicketActivities.find({ticketid: {$in: ticketids}});
});

Meteor.publish('ticketRatings', function (sessionid, id) {
    return TicketRatings.find({ticketid: id});
});
Meteor.publish('mysession', function (sessionid) {
    return MySessions.find(sessionid);
});
Meteor.methods({
    'closeTicket': function (ticketid,sessionid) {
//validate ticketid : this ticket id must be owned by session collections id if it is
// a client (session ka logintype) 
        Tickets.update(ticketid, {$set: {status: "CLOSED"}});
    },
    'openAgain': function (ticketid,sessionid) {
//validate ticketid : this ticket id must be owned by session collections id if it is
// a client (session ka logintype) 
        Tickets.update(ticketid, {$set: {status: "OPEN"}});
    }
});
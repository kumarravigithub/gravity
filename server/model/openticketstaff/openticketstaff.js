Meteor.methods({
    'openTicketStaff': function (clientid, subject, service, detail, sessionid) {
// validate client id must and service id belongs to this clientid only
        try {
            id = Meteor.call('generateTicketNumber'); // declared in openticket.js server side
            console.log(subject, service, detail);
            var inserted = Tickets.insert({
                number: id,
                subject: subject,
                serviceid: service,
                detail: detail,
                clientid: clientid,
                status: 'OPEN',
                timestamp: new Date()
            });
        }
        catch (error) {
            console.log("Could not insert due to XYZ " + error);
            return returnFaliure("Error in saving your ticket. " + error);
        }

        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("Ticket saved successfully. Find Ticket ID in the data field of this JSON", id);
        }
    }
});


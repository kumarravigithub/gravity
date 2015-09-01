Meteor.methods({
    'generateTicketNumber': function () {
        currentId = 0;
        record = Tickets.findOne({}, {sort: {number: -1}});
        if (record)
            currentId = record.number;
        currentId = currentId + 1;
        console.log(currentId);
        return currentId;
    },
    'openTicket': function (subject, service, detail, sessionid) {
// validate here
        try {
            id = Meteor.call('generateTicketNumber');
            console.log(subject, service, detail);
            var inserted = Tickets.insert({
                number: id,
                subject: subject,
                serviceid: service,
                detail: detail,
                clientid: sessionGet(sessionid, 'id'),
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


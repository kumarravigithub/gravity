Meteor.methods({
    'createActivity': function (ticketid, comment, sessionid) {
        try {
            console.log(ticketid, comment)
            var inserted = TicketActivities.insert({
                ticketid: ticketid,
                event: 'CC',
                userid: sessionGet(sessionid, 'id'),
                usertype: sessionGet(sessionid, 'logintype'),
                comment: comment,
                isInternal: false,
                timestamp: new Date()
            });
        }
        catch (error) {
            console.log("Could not insert due to " + error);
            return returnFaliure(error + " Comment Error");
        }
        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("Comment saved successfully");
        }
    },
    'rateTicket': function (ticketid, star, sessionid) {
        if (sessionGet(sessionid, 'role') == 'STAFF') {
            return returnFaliure("Staffs are not allowed to rate");
        }
        try {
            TicketRatings.remove({ticketid: ticketid});
            var inserted = TicketRatings.insert({
                ticketid: ticketid,
                star: star,
                comment: 'NOT IMPLEMENTED IN THIS VERSION',
                clientid: sessionGet(sessionid, 'id'),
                timestamp: new Date()
            });
        }
        catch (error) {
            console.log("Could not insert due to " + error);
            return returnFaliure(error);
        }
        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("Star saved successfully");
        }
    }
});
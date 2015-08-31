Meteor.methods({
    'createActivity': function (ticketid, comment, sessionid) {
        Menusyi = new Mongo.Collection("menu");

        Menusyi.insert({
            usertype: "STAFF",
            role: '',
            items: [
                {
                    name: "Open a new Ticket",
                    url: "open"
                },
                {
                    name: "Clients",
                    url: "client"
                },
                {
                    name: "Staffs",
                    url: "staff"
                }
            ]
        });
        var a = Menusyi.find().fetch();
        console.log(a);
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
            return returnFaliure("Error in saving your comment. Kindly try again or call cyBuzz Support.");
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
            return returnFaliure("Error in saving your comment. Kindly try again or call cyBuzz Support.");
        }
        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("Comment saved successfully");
        }
    }
});
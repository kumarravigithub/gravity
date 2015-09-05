Meteor.methods({
   'staffRole': function (ticketid, staffid, sessionid) {
       try {
            var inserted = TicketActivities.insert({
                ticketid: ticketid,
                event: 'SA', //SA=STAFF ASSIGNMENT
                userid: sessionGet(sessionid, 'id'),
                usertype: sessionGet(sessionid, 'logintype'),
                assignto:staffid,
                comment: "Asssigned to Staff",
                isInternal: true,
                timestamp: new Date()
            });
        }
        catch (error) {
            console.log("Could not insert due to " + error);
            return returnFaliure(error + " Error");
        }
        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("Staff Assigned Successfully");
        }
    }
});
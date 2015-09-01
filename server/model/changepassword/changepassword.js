Meteor.methods({
    'changepassword': function (currentpass, newpass, sessionid) {
//validate ticketid : this ticket id must be owned by session collections id if it is
// a client (session ka logintype) 
        var clientid = sessionGet(sessionid, 'id');
        var result = Clients.find({_id: clientid}).fetch();
        var currentPassword = result[0].password;

        if (currentPassword == currentpass) {
            //result[0].password = newpass;
            var a = Clients.update({_id: clientid}, {$set: {password: newpass}});
            if (a) {
                return returnSuccess("Password successfully changed");
            } else {
                return returnFaliure("contact admin");
            }
        } else {
            return returnFaliure("Current password mismatch");
        }
    }
});



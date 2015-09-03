Meteor.methods({
     'smsPortalDetails': function (staffname, mobile, email, msg, sessionid) {
// validate here
var result = Meteor.http.call("GET", "http://petsenergysolutions.com/tata/services/downloadftpfile.php?dt=" + currentemail.date + "&portfolio_id=" + currentemail.portfolioid + "&trader_code=TPTCL");
        try {
            var inserted = Sms.insert({
                name: staffname,
                mobileno:mobile,
                email: email,
                message: msg,
                status:"SEND",
                timestamp: new Date()
            });
        }
        catch (error) {
            console.log("Could not insert due to " + error);
            return returnFaliure("Error in sending SMS. " + error);
        }

        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("SMS send successfully. SMS id : " + inserted, inserted);
        }
    },
});



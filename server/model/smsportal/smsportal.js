Meteor.methods({
     'smsPortalDetails': function (staffname, mobile, email, msg, sessionid) {
      
        try {
           var res= sendSMStoFarmer("cybuzzsc","del12345@",mobile,"CYBUZZ",msg);
           console.log(res);
           if(res){
            var inserted = Sms.insert({
                name: staffname,
                mobileno:mobile,
                email: email,
                message: msg,
                status:"SEND",
                timestamp: new Date()
            });
        }
    }
        catch (error) {
            console.log("Could not insert due to " + error);
            return returnFaliure("Error in sending SMS. " + error);
        }

        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("SMS send successfully.");
        }
        }
});

function sendSMStoFarmer(Username, Password, To, From, Text) {
    var auth_url = "http://203.212.70.200/smpp/sendsms";
    var result = Meteor.http.call("POST", auth_url, {
        params: {
            username: Username,
            password: Password,
            to: To,
            from: From,
            text: Text,
            category: 'bulk'
        }
    });
    console.log("Message Send" + To + Text);
    return result;
}

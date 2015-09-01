Meteor.methods({
    'newClient': function (name, email, password, sessionid) {
// validate here
        try {
            console.log(name, email, password);
            var inserted = Clients.insert({
                name: name,
                email: email,
                password: password,
                timestamp: new Date()
            });
        }
        catch (error) {
            console.log("Could not insert due to " + error);
            return returnFaliure("Error in saving client. " + error);
        }

        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("Client saved successfully. Client id : " + inserted, inserted);
        }
    },
    'deleteClient': function (id, sessionid) {
        console.log(id);
        Clients.remove({_id: id});
        Services.remove({clientid: id.toString()});
    }
});


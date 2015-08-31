Meteor.methods({
    'newService': function (name, description, clientid, sessionid) {
// validate here
        try {
            console.log(name, description, clientid);
            var inserted = Services.insert({
                name: name,
                description: description,
                clientid: clientid,
                timestamp: new Date()
            });
        }
        catch (error) {
            console.log("Could not insert due to " + error);
            return returnFaliure("Error in saving service. Kindly try again or call cyBuzz Support.");
        }

        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("Service saved successfully. Service id : " + inserted, inserted);
        }
    },
    'deleteService': function (id, sessionid) {
        console.log(id);
        Services.remove({_id: id});
    }
});


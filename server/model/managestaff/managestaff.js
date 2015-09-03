Meteor.methods({
    'newStaff': function (name, role, mobile, email, password, sessionid) {
// validate here
        try {
            console.log(name, email, password);
            var inserted = Staffs.insert({
                name: name,
                role:role,
                email: email,
                mobile: mobile,
                password: password,
                timestamp: new Date()
            });
        }
        catch (error) {
            console.log("Could not insert due to " + error);
            return returnFaliure("Error in saving staff. " + error);
        }

        if (inserted) {
            console.log("The inserted record has _id: " + inserted);
            return returnSuccess("Staff saved successfully. Staff id : " + inserted, inserted);
        }
    },
    'deleteStaff': function (id, sessionid) {
        console.log(id);
        Staffs.remove({_id: id});
    },
    
});


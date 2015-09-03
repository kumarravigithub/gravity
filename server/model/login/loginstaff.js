Meteor.methods({
    'loginStaff': function (email, password) {
        // validate here
        var result = Staffs.find({email: email, password: password}).fetch();
        switch (result.length) {
            case 0:
                console.log("false");
                return returnFaliure("User ID and password did not match");
                break;
            case 1:
                var sessionid = sessionSet("LOGIN", "id", result[0]._id);
                var sessionid = sessionSet(sessionid, "logintype", "STAFF");
                var sessionid = sessionSet(sessionid, "role", "STAFF");
                var sessionid = sessionSet(sessionid, "name", result[0].name);
                var sessionid = sessionSet(sessionid, "email", result[0].email);

                 var returnValue={};
                returnValue['sessionid']=sessionid;
                returnValue['menu']=[{
                        name:"Clients",
                        link:"/client"
                },{
                        name:"Staffs",
                        link:"/staff"
                },{
                        name:"SMS Portal",
                        link:"/smsportal"
                }];
                returnValue['homelink'] = "/adminhome";
                returnValue['logintype'] = "STAFF";
                returnValue['name'] = result[0].name;
                return returnSuccess("All set", returnValue);
                break;
            default:
                return returnFaliure("There is some error in login module. These developers are completely useless. Let me find out who wrote this code and teach her a lesson.");
        }
    }
});
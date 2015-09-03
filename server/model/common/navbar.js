Meteor.methods({
    'logoutCT': function (sessionID) {
        sessionDestroy(sessionID);
        return true;
    }
});
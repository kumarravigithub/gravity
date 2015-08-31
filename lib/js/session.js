sessionGet = function (sessionID, key) {
    var thisSession = MySessions.findOne(sessionID);
    if (thisSession) {
        return thisSession[key];
    } else {
        throw "Invalid Session ID provided.";
    }
}

sessionSet = function (sessionID, key, value) {
    if (sessionID == "LOGIN" && key == 'id') {
        var toInsert = {};
        toInsert[key] = value;
        MySessions.remove({id: value});
        var insertid = MySessions.insert(toInsert);
        return insertid;
    }

    var thisSession = MySessions.findOne(sessionID);
    if (thisSession) {
        thisSession[key] = value;
        MySessions.update({_id: sessionID}, thisSession);
        return sessionID;
    } else {
        return false; // the session id on which the session was trying to be set does not exists in mongo.
    }
    console.log(thisSession.count);
}
sessionRemove = function (sessionID, key) {
    var thisSession = MySessions.findOne(sessionID);
    if (thisSession) {
        delete thisSession[key];
        MySessions.update({_id: sessionID}, thisSession);
        return sessionID;
    } else {
        return false; // the session id on which the session was trying to be set does not exists in mongo.
    }
    console.log(thisSession.count);
}

sessionDestroy = function (sessionID) {
    var thisSession = MySessions.findOne(sessionID);
    if (thisSession) {
        MySessions.remove(sessionID);
        return sessionID;
    } else {
        return false; // the session id on which the session was trying to be set does not exists in mongo.
    }
    console.log(thisSession.count);
}
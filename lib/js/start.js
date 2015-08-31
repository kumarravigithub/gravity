returnSuccess = function (msg, data) {
    if (msg === undefined) {
        msg = "The call succeeded. Cheers!"
    }
    var returnValue = {status: true, message: msg, data: data};
    console.log(msg);
    return returnValue;
}

returnFaliure = function (msg, data) {
    if (msg === undefined) {
        msg = "The call succeeded. Cheers!"
    }
    var returnValue = {status: false, message: msg, data: data};
    console.log(msg);
    return returnValue;
}

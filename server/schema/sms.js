Schemas.Sms = new SimpleSchema({

    name: {
        type: String,
        label: "Client's Name",
    },
    message: {
        type: String,
        label: "Message",
    },email: {
        type: SimpleSchema.RegEx.Email,
        label: "Email address",
    },
    mobileno: {
        type: String,
        label: "Mobile no"
    },
    status: {
        type: String,
        label: "Status"
    },
    timestamp: {
        type: Date,
        label: "timestamp"
    }
});

Sms.attachSchema(Schemas.Sms);


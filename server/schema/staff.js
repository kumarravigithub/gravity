Schemas.Staff = new SimpleSchema({
    name: {
        type: String,
        label: "Staff's Name",
    },
    role: {
        type: String,
        label: "Role",
    },
    email: {
        type: SimpleSchema.RegEx.Email,
        label: "Email address",
    },
    mobile: {
        type: String,
        label: "Mobile",
    },
    password: {
        type: String,
        label: "Password",
        min: 6
    },
    timestamp: {
        type: Date,
        label: "timestamp"
    }
});

Staffs.attachSchema(Schemas.Staff);
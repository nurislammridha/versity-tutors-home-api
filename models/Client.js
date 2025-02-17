const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: false,
    },
    password: {
        type: String,
        require: false,
    },
    phone: {
        type: String,
        require: false,
    },
    website: {
        type: String,
        require: false,
    },
    whatsapp: {
        type: String,
        require: false,
    },
    skype: {
        type: String,
        require: false,
    },
    facebook: {
        type: String,
        require: false,
    },
    twitter: {
        type: String,
        require: false,
    },
    linkedin: {
        type: String,
        require: false,
    },
    dribble: {
        type: String,
        require: false,
    },
    avatar: {
        url: {
            type: String,
            require: true,
        },
        publicId: {
            type: String,
            require: true,
        }
    },
    grade: {
        type: String,
        require: false,
    },
    hourlyFee: {
        type: Number,
        require: false,
    },
    tagline: {
        type: String,
        require: false,
    },
    divisionId: {
        type: String,
        require: false,
    },
    divisionInfo: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Division'
    },
    districtId: {
        type: String,
        require: false,
    },
    districtInfo: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'District'
    },
    subDistrictId: {
        type: String,
        require: false,
    },
    subDistrictInfo: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'SubDistrict'
    },
    areaId: {
        type: String,
        require: false,
    },
    areaInfo: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Area'
    },
    address: {
        type: String,
        require: false,
    },
    zipCode: {
        type: String,
        require: false,
    },
    languageId: [{
        type: String,
        require: false,
    }],
    languageInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Language'
    }],
    tutorBriefIntroduction: {
        type: String,
        require: false,
    },
    education: [
        {
            degree: {
                type: String,
                require: false,
            },
            institute: {
                type: String,
                require: false,
            },
            location: {
                type: String,
                require: false,
            },
            startDate: {
                type: String,
                require: false,
            },
            endDate: {
                type: String,
                require: false,
            },
            description: {
                type: String,
                require: false,
            },
            isOngoing: {
                type: Boolean,
                require: false,
            },
        }
    ],
    subjectsTutorCan: [{
        categoryId: {
            type: String,
            require: false,
        },
        categoryInfo: {
            type: mongoose.Schema.Types.ObjectId,
            require: false,
            ref: 'Category'
        },
        subCategoryId: {
            type: String,
            require: false,
        },
        subCategoryInfo: {
            type: mongoose.Schema.Types.ObjectId,
            require: false,
            ref: 'SubCategory'
        },
    }],
    tutorCalender: [{
        day: {
            type: String,
            require: false,
        },
        title: {
            type: String,
            require: false,
        },
        startTime: {
            type: String,
            require: false,
        },
        endTime: {
            type: String,
            require: false,
        },
        breakTime: {
            type: String,
            require: false,
        },
        duration: {
            type: String,
            require: false,
        },
        noAppointSpaces: {
            type: String,
            require: false,
            default: "-1"
        },
    }],
    isPassword: {
        type: Boolean,
        require: false,
        default: false
    },
    googleId: {
        type: String,
        default: ""
    },
    providerId: {
        type: String,
        default: ""
    },
    isTeachingLocationOnline: {
        type: Boolean,
        default: false,
    },
    isTeachingLocationOffline: {
        type: Boolean,
        default: false,
    },
    isTeachingLocationTutorHome: {
        type: Boolean,
        default: false,
    },
    isTeachingLocationStudentHome: {
        type: Boolean,
        default: false,
    },
    isStudentPlace: {
        type: Boolean,
        default: false,
    },
    isTutorPlace: {
        type: Boolean,
        default: false,
    },
    isTutorAccount: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
module.exports = Client = mongoose.model("Client", ClientSchema);

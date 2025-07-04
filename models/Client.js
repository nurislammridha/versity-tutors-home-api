const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
    clientId: { type: String, unique: true },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    additionalPhone: {
        type: String,
        required: false,
    },
    religion: {
        type: String,
        required: false,
    },
    language: [{
        label: { type: String, required: false },
        value: { type: String, required: false },
    }],
    website: {
        type: String,
        required: false,
    },
    whatsapp: {
        type: String,
        required: false,
    },
    skype: {
        type: String,
        required: false,
    },
    facebook: {
        type: String,
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
    linkedin: {
        type: String,
        required: false,
    },
    dribble: {
        type: String,
        required: false,
    },
    avatar: {
        url: {
            type: String,
            required: false,
        },
        publicId: {
            type: String,
            required: false,
        }
    },
    grade: {
        type: String,
        required: false,
    },
    hourlyFee: {
        type: Number,
        required: false,
    },
    tagline: {
        type: String,
        required: false,
    },
    fatherName: {
        type: String,
        required: false,
    },
    fatherPhone: {
        type: String,
        required: false,
    },
    motherName: {
        type: String,
        required: false,
    },
    motherPhone: {
        type: String,
        required: false,
    },
    localGuardianPhone: {
        type: String,
        required: false,
    },
    guardianRelationship: {
        type: String,
        required: false,
    },
    //current address
    divisionId: {
        type: String,
        required: false,
    },
    divisionInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Division'
    },
    districtId: {
        type: String,
        required: false,
    },
    districtInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'District'
    },
    subDistrictId: {
        type: String,
        required: false,
    },
    subDistrictInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'SubDistrict'
    },
    areaId: {
        type: String,
        required: false,
    },
    areaInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Area'
    },
    address: {
        type: String,
        required: false,
    },
    zipCode: {
        type: String,
        required: false,
    },
    //permanent address
    permanentDivisionId: {
        type: String,
        required: false,
    },
    permanentDivisionInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Division'
    },
    permanentDistrictId: {
        type: String,
        required: false,
    },
    permanentDistrictInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'District'
    },
    permanentSubDistrictId: {
        type: String,
        required: false,
    },
    permanentSubDistrictInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'SubDistrict'
    },
    permanentAreaId: {
        type: String,
        required: false,
    },
    permanentAreaInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Area'
    },
    permanentAddress: {
        type: String,
        required: false,
    },
    permanentZipCode: {
        type: String,
        required: false,
    },
    languageId: [{
        type: String,
        required: false,
    }],
    languageInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Language'
    }],
    tutorBriefIntroduction: {
        type: String,
        required: false,
        default: ""
    },
    //new education info START
    sscInstituteName: { type: String, required: false },
    sscMedium: { type: String, required: false },
    sscGroup: { type: String, required: false },
    sscSession: { type: String, required: false },
    sscPassingYear: { type: String, required: false },
    sscResult: { type: String, required: false },

    hscInstituteName: { type: String, required: false },
    hscMedium: { type: String, required: false },
    hscGroup: { type: String, required: false },
    hscSession: { type: String, required: false },
    hscPassingYear: { type: String, required: false },
    hscResult: { type: String, required: false },

    bachelorInstituteType: { type: String, required: false },
    bachelorInstituteTypeId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'InstituteType' },
    bachelorInstituteName: { type: String, required: false },
    bachelorInstituteNameId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'InstituteName' },
    bachelorStudyType: { type: String, required: false },
    bachelorStudyTypeId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'StudyType' },
    bachelorDepartment: { type: String, required: false },
    bachelorDepartmentId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'DepartmentName' },
    bachelorMedium: { type: String, required: false },
    bachelorSession: { type: String, required: false },
    bachelorPassingYear: { type: String, required: false },
    bachelorCgpa: { type: String, required: false },

    postInstituteType: { type: String, required: false },
    postInstituteTypeId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'InstituteType' },
    postInstituteName: { type: String, required: false },
    postInstituteNameId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'InstituteName' },
    postStudyType: { type: String, required: false },
    postStudyTypeId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'StudyType' },
    postDepartment: { type: String, required: false },
    postDepartmentId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'DepartmentName' },
    postMedium: { type: String, required: false },
    postSession: { type: String, required: false },
    postPassingYear: { type: String, required: false },
    postCgpa: { type: String, required: false },
    //new education info END
    //new tuition info START


    tuitionInfos: [{
        divisionId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Division' },
        districtId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'District' },
        subDistrictId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'SubDistrict' },
        areaIds: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Area' }],
        detailsAddress: { type: String, required: false },
        classId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Category' },
        medium: { type: String, required: false },
        group: { type: String, required: false },
        subjectIds: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'SubCategory' }],
        daysPerWeek: [{ label: { type: String, required: false }, value: { type: String, required: false } }],
        daysPerMonth: [{ label: { type: String, required: false }, value: { type: String, required: false } }],
        timeDuration: [{ label: { type: String, required: false }, value: { type: String, required: false } }],
        timeShift: [{ label: { type: String, required: false }, value: { type: String, required: false } }],
        studentGender: { type: String, required: false },
        tuitionExperience: { type: String, required: false },
        tuitionExperienceLabel: { type: String, required: false },
        expectedSalary: { type: String, required: false },
        expectedSalaryLabel: { type: String, required: false },
        isStudentHome: { type: Boolean, required: false, default: false },
        isMyHome: { type: Boolean, required: false, default: false },
        isOnline: { type: Boolean, required: false, default: false },
        isGroupStudy: { type: Boolean, required: false, default: false },
        isTakeDemoClass: { type: Boolean, required: false, default: true },
        demoClass: { type: String, required: false },
        demoClassStyle: { type: String, required: false },
        demoClassPricing: { type: String, required: false },
        //for student extra added
        instituteTypeId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'InstituteType' },
        instituteNameId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'InstituteName' },
        studyTypeId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'StudyType' },
        departmentNameId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'DepartmentName' },
        teacherReligion: { type: String, required: false },
        expectedSalaryOnline: { type: String, required: false },
        expectedSalaryOnlineLabel: { type: String, required: false },
        expectedSalaryOffline: { type: String, required: false },
        expectedSalaryOfflineLabel: { type: String, required: false },
    }],
    //new tuition info END
    unlockInfo: [
        {
            type: String,
            required: false,
            // default:[]
        }
    ],
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        // default:[],
        ref: 'Client'
    }],
    education: [
        {
            degree: {
                type: String,
                required: false,
            },
            institute: {
                type: String,
                required: false,
            },
            location: {
                type: String,
                required: false,
            },
            startDate: {
                type: String,
                required: false,
            },
            endDate: {
                type: String,
                required: false,
            },
            description: {
                type: String,
                required: false,
            },
            isOngoing: {
                type: Boolean,
                required: false,
            },
        }
    ],
    subject: [{
        categoryId: {
            type: String,
            required: false,
        },
        categoryInfo: {
            type: mongoose.Schema.Types.ObjectId,
            requiredd: false,
            ref: 'Category'
        },
        subCategories: [{
            subCategoryId: {
                type: String,
                required: false,
            },
            subCategoryInfo: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: 'SubCategory'
            }
        }]
    }],
    tutorCalender: [{
        day: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
        startTime: {
            type: String,
            required: false,
        },
        endTime: {
            type: String,
            required: false,
        },
        breakTime: {
            type: String,
            required: false,
        },
        duration: {
            type: String,
            required: false,
        },
        noAppointSpaces: {
            type: String,
            required: false,
            default: "-1"
        },
    }],
    isPassword: {
        type: Boolean,
        required: false,
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
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    isRequestToApprove: {//will remove
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    // isAssigned: {
    //     type: Boolean,
    //     default: true,
    // },
    reviewStatus: {
        type: String, // e.g., 'created','requestToApprove', 'under_review', 'approved', 'rejected'
        default: 'created',
        enum: ['created', 'requestInitiated', 'underReview', 'approved', 'rejected', 'sendForReview', 'receiveForReview', 'requestToUpdate'],
    },
    comment: {//reviewComment
        type: String,
        default: false,
    },
    assignedModerator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Moderator assigned for review
        default: null,
    },
    moderationHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ModerationHistory', // Moderator assigned for review
        default: null,
    },
    // moderationHistory: [{
    //     moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    //     action: String, // e.g., 'claimed', 'approved', 'rejected'
    //     timestamp: { type: Date, default: Date.now },
    //     note: String
    // }]

}, { timestamps: true });
module.exports = Client = mongoose.model("Client", ClientSchema);

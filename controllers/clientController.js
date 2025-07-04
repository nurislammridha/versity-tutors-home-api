const Client = require("../models/Client");
const Review = require("../models/Review");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/key');
const otpGenerator = require('otp-generator');
const OTP = require('../models/OtpEmail');
const OtpEmail = require("../models/OtpEmail");
const ForgetOtpEmail = require("../models/ForgetOtpEmail");
const mongoose = require('mongoose');
//@route POST api/admin
//@desc Client signup
//@access Public
const createClient = async (req, res) => {
    const { phone, email, firstName, lastName, password, otp, isTutorAccount } = req.body;
    try {
        let isPhone = false
        let isMail = false
        let otpObj = await OtpEmail.findOne({ email }) || {}
        // if (otp === otpObj?.otp) { //change after real otp
        if (otp === "123456") {
            // Count current clients of the same type
            const count = await Client.countDocuments({ isTutorAccount });

            // Generate custom client ID
            const prefix = isTutorAccount ? 'T-' : 'S-';
            const numberPart = String(count + 1).padStart(6, '0'); // e.g., 0001
            const clientId = prefix + numberPart;
            let clientInfo = new Client({ firstName, lastName, email, phone, password, isPassword: true, isTutorAccount, clientId });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(clientInfo.password, salt, (err, hash) => {
                    if (err) throw err;
                    clientInfo.password = hash;
                    // console.log('clientInfo', clientInfo)
                    clientInfo.save((err, data) => {
                        if (err) {
                            res.status(500).json({
                                error: "There was a server side error!",
                            });
                        } else {
                            const payload = {
                                id: data._id,
                                // name: mail.name
                            };
                            data.password = ""
                            jwt.sign(
                                payload,
                                keys.key,
                                {
                                    expiresIn: 31556926 // 1 year in seconds
                                },

                                (err, token) => {
                                    // console.log('data', data)
                                    data.password = ""
                                    // console.log('phone123', phone)
                                    return res.status(200).json({
                                        message: `Sign Up Completed`,
                                        result: data,
                                        token: "Bearer " + token,
                                        status: true,
                                        isLogin: true
                                    });
                                }
                            );


                            // res.status(200).json({
                            //     result: data,
                            //     message: "Sign Up Completed, Please Login!",
                            //     status: true,
                            //     isSignUp: true
                            // });
                        }
                    });
                });
            });
        } else {
            return res.status(200).json({
                result: [],
                message: "Wrong Otp, Please try again!",
                status: true,
                isSignUp: false
            });
        }
        return 0
        // if (clientPhone.length > 0) {
        //     isPhone = await Client.findOne({ clientPhone })
        // } else {
        //     isMail = await Client.findOne({ clientEmail })
        // }
        // let isExist = await Client.findOne({ $or: [{ clientPhone }, { clientEmail }] });
        //see if user exists
        // console.log('isExist', isPhone, isMail)
        // if (isPhone) {
        //     return res.status(200).json({
        //         message: `You are already our member with this ${clientPhone}, Please login`,
        //         result: "",
        //         status: true,
        //         isSignUp: false
        //     });
        // } else if (isMail) {
        //     return res.status(200).json({
        //         message: `You are already our member with this ${clientEmail}, Please login`,
        //         result: "",
        //         status: true,
        //         isSignUp: false
        //     });
        // }

        // console.log('buye', clientInfo)


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//send otp through email
const sendEmailOtp = async (req, res) => {
    const { email } = req.body
    try {
        // Check if user is already present
        const checkUserPresent = await Client.findOne({ email });
        // If user found with provided email
        if (checkUserPresent) {
            return res.status(200).json({
                message: `You are already our member with this ${email}, Please login`,
                result: "",
                status: true,
                isSignUp: false
            });
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        res.status(200).json({
            result: otp,
            message: 'OTP sent successfully',
            status: true
        });
    } catch (err) {
        console.log('error', err)
    }
}
//send otp through email for forget password
const forgetPasswordOtp = async (req, res) => {
    const { email } = req.body
    try {
        // Check if user is already present
        const checkUserPresent = await Client.findOne({ email });
        // If user found with provided email
        if (checkUserPresent) {
            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            let result = await ForgetOtpEmail.findOne({ otp: otp });
            while (result) {
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                });
                result = await OTP.findOne({ otp: otp });
            }
            const otpPayload = { email, otp };
            const otpBody = await ForgetOtpEmail.create(otpPayload);
            return res.status(200).json({
                result: otp,
                message: 'OTP sent successfully',
                status: true
            });

        } else {
            return res.status(200).json({
                result: "",
                message: "You are n't our member, Please sign up",
                status: false
            });
        }

    } catch (err) {
        console.log('error', err)
    }
}
//password update after match otp 
const setPassword = async (req, res) => {
    const { email, password, otp } = req.body;
    try {
        let otpObj = await ForgetOtpEmail.findOne({ email }) || {}
        if (otp === otpObj?.otp) {
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    //update password
                    Client.updateOne(
                        { email },
                        {
                            $set: { password: hash },
                        },
                        (err) => {
                            if (err) {
                                console.log('err', err)
                                res.status(500).json({

                                    error: "There was a server side error!",
                                });
                            } else {
                                res.status(200).json({
                                    message: "New password set successfully!",
                                    status: true,
                                });
                            }
                        }
                    );

                });
            });
        } else {
            return res.status(200).json({
                result: "",
                message: "Wrong Otp, Please try again!",
                status: false,
            });
        }
        return 0
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//check client through email
const checkClient = async (req, res) => {
    const { email } = req.body
    try {
        // Check if user is already present
        const checkUserPresent = await Client.findOne({ email });
        // If user found with provided email
        if (checkUserPresent) {
            return res.status(200).json({
                message: ``,
                result: "",
                status: true,
                isPresent: true
            });
        } else {
            return res.status(200).json({
                message: `${email} is n't found, Please sign up`,
                result: "",
                status: true,
                isPresent: false
            });
        }

    } catch (err) {
        console.log('error', err)
    }
}
//check client through phone
const checkClientPhone = async (req, res) => {
    const { phone } = req.body
    try {
        // Check if user is already present
        const checkUserPresent = await Client.findOne({ phone })
        // console.log('checkUserPresent', checkUserPresent.password)
        // If user found with provided email
        if (checkUserPresent) {
            return res.status(200).json({
                message: ``,
                result: checkUserPresent,
                status: true,
                isPresent: true
            });
        } else {
            return res.status(200).json({
                message: `${phone} is n't found, Please sign up`,
                result: checkUserPresent,
                status: true,
                isPresent: false
            });
        }

    } catch (err) {
        console.log('error', err)
    }
}
//client login
const clientLogin = async (req, res) => {
    const { phone, email, password } = req.body;
    // console.log('req.body', req.body)
    try {
        let clientPhone = null
        let mail = null
        if (phone.length > 0) {
            phone = await Client.findOne({ phone })
            console.log('phone', phone)
            if (phone) {
                bcrypt.compare(password, phone.password).then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: phone._id,
                            // name: phone.name
                        };
                        jwt.sign(
                            payload,
                            keys.key,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                phone.password = ""
                                console.log('phone123', phone)
                                return res.status(200).json({
                                    message: `You are logged in`,
                                    result: phone,
                                    token: "Bearer " + token,
                                    status: true,
                                    isLogin: true
                                });
                            }
                        );
                    } else {
                        return res.status(200).json({
                            message: `Incorrect password`,
                            result: "",
                            status: true,
                            isLogin: false
                        });
                    }
                });
            } else {
                return res.status(200).json({
                    message: `Your phone number is n't found in system`,
                    result: "",
                    status: true,
                    isLogin: false
                });
            }

        } else if (email.length > 0) {
            mail = await Client.findOne({ email })
            if (mail) {
                bcrypt.compare(password, mail.password).then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: mail._id,
                            // name: mail.name
                        };
                        jwt.sign(
                            payload,
                            keys.key,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                mail.password = ""
                                return res.status(200).json({
                                    message: `You are logged in`,
                                    result: mail,
                                    token: "Bearer " + token,
                                    status: true,
                                    isLogin: true
                                });
                            }
                        );
                    } else {
                        return res.status(200).json({
                            message: `Incorrect password`,
                            result: "",
                            status: true,
                            isLogin: false
                        });
                    }
                })
            }
        } else {
            return res.status(200).json({
                message: `Your email is n't found`,
                result: "",
                status: true,
                isLogin: false
            });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//social media login //

const socialLogin = async (req, res) => {
    const { clientName, clientPhone, clientEmail, googleId, clientImgUrl, isNewUser, providerId } = req.body;
    try {
        if (isNewUser) {
            //sign up
            let clientInfo = new Client({ clientName, clientEmail, clientPhone, googleId, clientImgUrl, providerId, password: "sellKonSocial", isPassword: true });
            clientInfo.save((err, data) => {
                if (err) {
                    res.status(500).json({
                        error: "There was a server side error!",
                    });
                } else {
                    // console.log('data', data)
                    const payload = {
                        id: data._id,
                        // name: mail.name
                    };
                    jwt.sign(
                        payload,
                        keys.key,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            // console.log('data', data)
                            data.password = ""
                            // console.log('phone123', phone)
                            return res.status(200).json({
                                message: `You are logged in`,
                                result: data,
                                token: "Bearer " + token,
                                status: true,
                                isLogin: true
                            });
                        }
                    );
                }
            });
        } else {
            const obj = await Client.findOne({ googleId })
            // console.log('obj', obj)
            const payload = {
                id: obj._id,
                // name: mail.name
            };
            jwt.sign(
                payload,
                keys.key,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    obj.password = ""
                    // console.log('phone123', phone)
                    return res.status(200).json({
                        message: `You are logged in`,
                        result: obj,
                        token: "Bearer " + token,
                        status: true,
                        isLogin: true
                    });
                }
            );
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

//all Client
const allClientList = async (req, res) => {

    try {
        await Client.find((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    result: data,
                    message: "All client are showing!",
                    status: true,
                });
            }
        });
    } catch (error) {
        res.status(500).send("Server error");
    }
};
// client By ID//
const allClientById = async (req, res) => {
    const clients = await Client.find({ _id: req.params.id })
        .populate("divisionInfo districtInfo subDistrictInfo areaInfo permanentDivisionInfo permanentDistrictInfo permanentSubDistrictInfo permanentAreaInfo bachelorInstituteTypeId bachelorInstituteNameId bachelorStudyTypeId bachelorDepartmentId postInstituteTypeId postInstituteNameId postStudyTypeId postDepartmentId wishList")
        .populate("tuitionInfos.divisionId")
        .populate("tuitionInfos.districtId")
        .populate("tuitionInfos.subDistrictId")
        .populate("tuitionInfos.areaIds")
        .populate("tuitionInfos.classId")
        .populate("tuitionInfos.subjectIds")
        .populate("tuitionInfos.instituteTypeId")
        .populate("tuitionInfos.instituteNameId")
        .populate("tuitionInfos.studyTypeId")
        .populate("tuitionInfos.departmentNameId")
    const [client] = clients

    const clientUpdated = client.toObject();
    const reviews = await Review.aggregate([
        { $match: { clientId: client._id } },
        {
            $group: {
                _id: '$clientId',
                averageRating: { $avg: '$starRating' },
                totalComments: { $sum: 1 }
            }
        }
    ]);

    // If reviews exist, update the client object with averageRating and totalComments
    if (reviews.length > 0) {
        clientUpdated.averageRating = reviews[0].averageRating;
        clientUpdated.totalComments = reviews[0].totalComments;
    } else {
        // If no reviews exist, set default values
        clientUpdated.averageRating = 0;
        clientUpdated.totalComments = 0;
    }

    res.status(200).json({
        result: clientUpdated,
        message: "All client by client id!",
        status: true,
    });
};

//Update client by id
const updateClient = async (req, res) => {
    await Client.updateOne(
        { _id: req.params.id },
        {
            $set: req.body,
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "User info were updated successfully!",
                    status: true,
                });
            }
        }
    );
};

//delete client
const deleteClient = async (req, res) => {
    await Client.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Client was deleted successfully!",
                status: true,
            });
        }
    });
};
//filter client
// const filterClient = async (req, res) => {
//     try {
//         let {
//             search, filters, page = 1, limit = 10, sortBy
//         } = req.body;

//         page = parseInt(page);
//         limit = parseInt(limit);
//         const skip = (page - 1) * limit;

//         let query = {};

//         // Search by multiple fields
//         if (search) {
//             const regex = new RegExp(search, "i"); // Case-insensitive search
//             query.$or = [
//                 { firstName: regex },
//                 { lastName: regex },
//                 { tagline: regex },
//                 { address: regex },
//                 { "divisionInfo.divisionName": regex },
//                 { "districtInfo.districtName": regex },
//                 { "subDistrictInfo.subDistrictName": regex },
//                 { "areaInfo.areaName": regex },
//                 { "subject.categoryInfo.categoryName": regex },
//                 { "subject.subCategories.subCategoryInfo.subCategoryName": regex }
//             ];
//         }

//         // Apply filters if provided
//         if (filters) {
//             if (filters.hourlyFee) {
//                 query.hourlyFee = {
//                     $gte: filters.hourlyFee.min || 0,
//                     $lte: filters.hourlyFee.max || Number.MAX_SAFE_INTEGER
//                 };
//             }
//             if (filters.gender) query.gender = filters.gender;
//             if (filters.divisionId) query.divisionId = filters.divisionId;
//             if (filters.districtId) query.districtId = filters.districtId;
//             if (filters.subDistrictId) query.subDistrictId = filters.subDistrictId;
//             if (filters.areaId) query.areaId = filters.areaId;
//             if (filters.address) query.address = new RegExp(filters.address, "i");

//             if (filters.categoryId) query["subject.categoryId"] = filters.categoryId;
//             // if (filters.subCategoryId) query["subject.subCategories.subCategoryId"] = filters.subCategoryId;
//             if (filters.subCategoryId && Array.isArray(filters.subCategoryId) && filters.subCategoryId.length > 0) {
//                 query["subject.subCategories.subCategoryId"] = { $in: filters.subCategoryId };
//             }
//             if (filters.isTeachingLocationOnline !== undefined) query.isTeachingLocationOnline = filters.isTeachingLocationOnline;
//             if (filters.isTeachingLocationOffline !== undefined) query.isTeachingLocationOffline = filters.isTeachingLocationOffline;
//             if (filters.isTeachingLocationTutorHome !== undefined) query.isTeachingLocationTutorHome = filters.isTeachingLocationTutorHome;
//             if (filters.isTeachingLocationStudentHome !== undefined) query.isTeachingLocationStudentHome = filters.isTeachingLocationStudentHome;
//             if (filters.isTutorAccount !== undefined) query.isTutorAccount = filters.isTutorAccount;
//             if (filters.isFeatured !== undefined) query.isFeatured = filters.isFeatured;
//             if (filters.isBooked !== undefined) query.isBooked = filters.isBooked;
//             if (filters.isRequestToApprove !== undefined) query.isRequestToApprove = filters.isRequestToApprove;
//             if (filters.isApproved !== undefined) query.isApproved = filters.isApproved;
//         }
//         // Sorting logic
//         let sortOptions = {};
//         if (sortBy) {
//             if (sortBy === "Best Match") {
//                 sortOptions = { createdAt: -1 }; // Default to latest clients
//             } else if (sortBy === "Price low to high") {
//                 sortOptions = { hourlyFee: 1 }; // Ascending order
//             } else if (sortBy === "Price high to low") {
//                 sortOptions = { hourlyFee: -1 }; // Descending order
//             }
//         }
//         // console.log('query', query)
//         // Fetch data with pagination
//         const clients = await Client.find(query)
//             .populate("divisionInfo districtInfo subDistrictInfo areaInfo subject.categoryInfo subject.subCategories.subCategoryInfo")
//             .sort(sortOptions)
//             .skip(skip)
//             .limit(limit);

//         // Get total count for pagination
//         const totalClients = await Client.countDocuments(query);
//         //Client review and ratings add
//         // for (let client of clients) {
//         //     const reviews = await Review.aggregate([
//         //         { $match: { clientId: client._id } },
//         //         {
//         //             $group: {
//         //                 _id: '$clientId',
//         //                 averageRating: { $avg: '$starRating' },
//         //                 totalComments: { $sum: 1 }
//         //             }
//         //         }
//         //     ]);
//         //     // Check if the reviews array has results and then update the client object
//         //     if (reviews.length > 0) {
//         //         client.averageRating = reviews[0].averageRating;
//         //         client.totalComments = reviews[0].totalComments;
//         //     } else {
//         //         // If no reviews exist, set default values
//         //         client.averageRating = 0;
//         //         client.totalComments = 0;
//         //     }
//         //     // Log to check if averageRating and totalComments are being added
//         //     console.log('client.averageRating', client.averageRating);
//         //     console.log('client.totalComments', client.totalComments);
//         // }
//         const updatedClients = await Promise.all(clients.map(async (clientDoc) => {
//             // Run an aggregate query to get the averageRating and totalComments for each client
//             // Convert Mongoose document to plain object
//             const client = clientDoc.toObject();
//             const reviews = await Review.aggregate([
//                 { $match: { clientId: client._id } },
//                 {
//                     $group: {
//                         _id: '$clientId',
//                         averageRating: { $avg: '$starRating' },
//                         totalComments: { $sum: 1 }
//                     }
//                 }
//             ]);

//             // If reviews exist, update the client object with averageRating and totalComments
//             if (reviews.length > 0) {
//                 client.averageRating = reviews[0].averageRating;
//                 client.totalComments = reviews[0].totalComments;
//             } else {
//                 // If no reviews exist, set default values
//                 client.averageRating = 0;
//                 client.totalComments = 0;
//             }
//             // console.log('client.totalComments', client.totalComments)
//             // Return the updated client object
//             return client;
//         }));

//         // console.log('clients', clients)

//         res.json({
//             status: true,
//             result: updatedClients,
//             pagination: {
//                 total: totalClients,
//                 page,
//                 limit,
//                 totalPages: Math.ceil(totalClients / limit)
//             }
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }

// };
const filterClient = async (req, res) => {
    try {
        let {
            search, filters, page = 1, limit = 10, sortBy
        } = req.body;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        // Start aggregation pipeline
        let pipeline = [];

        // Lookups (populate equivalents)
        pipeline.push(
            {
                $lookup: {
                    from: 'divisions',
                    localField: 'divisionInfo',
                    foreignField: '_id',
                    as: 'divisionInfo'
                }
            },
            { $unwind: { path: '$divisionInfo', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'districts',
                    localField: 'districtInfo',
                    foreignField: '_id',
                    as: 'districtInfo'
                }
            },
            { $unwind: { path: '$districtInfo', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'subdistricts',
                    localField: 'subDistrictInfo',
                    foreignField: '_id',
                    as: 'subDistrictInfo'
                }
            },
            { $unwind: { path: '$subDistrictInfo', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'areas',
                    localField: 'areaInfo',
                    foreignField: '_id',
                    as: 'areaInfo'
                }
            },
            { $unwind: { path: '$areaInfo', preserveNullAndEmptyArrays: true } },
        );
        //new code subjects
        // Group subCategories back into array for each subject


        // 1. Unwind subject array
        pipeline.push({
            $unwind: {
                path: '$subject',
                preserveNullAndEmptyArrays: true
            }
        });

        // 2. Lookup categoryInfo for each subject
        pipeline.push({
            $lookup: {
                from: 'categories',
                localField: 'subject.categoryInfo',
                foreignField: '_id',
                as: 'subject.categoryInfoData'
            }
        });

        // 3. Replace categoryInfo ID with full document
        pipeline.push({
            $addFields: {
                'subject.categoryInfo': {
                    $arrayElemAt: ['$subject.categoryInfoData', 0]
                }
            }
        });

        // 4. Unwind subCategories array
        pipeline.push({
            $unwind: {
                path: '$subject.subCategories',
                preserveNullAndEmptyArrays: true
            }
        });

        // 5. Lookup subCategoryInfo for each subCategory
        pipeline.push({
            $lookup: {
                from: 'subcategories',
                localField: 'subject.subCategories.subCategoryInfo',
                foreignField: '_id',
                as: 'subject.subCategories.subCategoryInfoData'
            }
        });

        // 6. Replace subCategoryInfo ID with full document
        pipeline.push({
            $addFields: {
                'subject.subCategories.subCategoryInfo': {
                    $arrayElemAt: ['$subject.subCategories.subCategoryInfoData', 0]
                }
            }
        });

        // 7. Group subCategories per subject
        pipeline.push({
            $group: {
                _id: {
                    clientId: '$_id',
                    categoryId: '$subject.categoryInfo._id'
                },
                doc: { $first: '$$ROOT' },
                subCategories: { $push: '$subject.subCategories' }
            }
        });

        // 8. Flatten subCategories
        pipeline.push({
            $addFields: {
                'doc.subject.subCategories': {
                    $reduce: {
                        input: '$subCategories',
                        initialValue: [],
                        in: { $concatArrays: ['$$value', ['$this']] }
                    }
                }
            }
        });

        // 9. Restore document
        pipeline.push({
            $replaceRoot: {
                newRoot: '$doc'
            }
        });

        // 10. Group all subjects per client
        pipeline.push({
            $group: {
                _id: '$_id',
                clientDoc: { $first: '$$ROOT' },
                subjects: { $push: '$subject' }
            }
        });

        // 11. Set clientDoc.subject = all subjects
        pipeline.push({
            $addFields: {
                'clientDoc.subject': '$subjects'
            }
        });

        // 12. Final output
        pipeline.push({
            $replaceRoot: {
                newRoot: '$clientDoc'
            }
        });
        pipeline.push(
            {
                $lookup: {
                    from: 'moderationhistories', // collection name (plural and lowercase)
                    localField: 'moderationHistory',
                    foreignField: '_id',
                    as: 'moderationHistory'
                }
            },
            {
                $unwind: {
                    path: '$moderationHistory',
                    preserveNullAndEmptyArrays: true
                }
            }
        );


        //new code subjects



        // Search logic
        if (search) {
            const regex = new RegExp(search, "i");

            pipeline.push({
                $match: {
                    $or: [
                        { firstName: regex },
                        { lastName: regex },
                        { tagline: regex },
                        { address: regex },
                        { email: regex },
                        { phone: regex },
                        { whatsapp: regex },
                        { "divisionInfo.divisionName": regex },
                        { "districtInfo.districtName": regex },
                        { "subDistrictInfo.subDistrictName": regex },
                        { "areaInfo.areaName": regex },
                        { "subject.categoryInfo.categoryName": regex },
                        { "subject.subCategories.subCategoryInfo.subCategoryName": regex },
                        { "education.institute": regex }
                    ]
                }
            });
        }

        // Filters logic
        let matchStage = {};
        if (filters) {
            if (filters.hourlyFee) {
                matchStage.hourlyFee = {
                    $gte: filters.hourlyFee.min || 0,
                    $lte: filters.hourlyFee.max || Number.MAX_SAFE_INTEGER
                };
            }
            if (filters.gender) matchStage.gender = filters.gender;
            if (filters.divisionId) matchStage.divisionId = filters.divisionId;
            if (filters.districtId) matchStage.districtId = filters.districtId;
            if (filters.subDistrictId) matchStage.subDistrictId = filters.subDistrictId;
            if (filters.areaId) matchStage.areaId = filters.areaId;
            if (filters.address) matchStage.address = new RegExp(filters.address, "i");

            if (filters.categoryId) matchStage["subject.categoryId"] = filters.categoryId;
            if (filters.subCategoryId && Array.isArray(filters.subCategoryId) && filters.subCategoryId.length > 0) {
                matchStage["subject.subCategories.subCategoryId"] = { $in: filters.subCategoryId };
            }
            if (filters.reviewStatus) matchStage.reviewStatus = filters.reviewStatus;
            // Filter clients that are not yet assigned to any moderator
            if (filters.onlyUnassignedModerator) {
                matchStage.$or = [
                    { assignedModerator: { $exists: false } },
                    { assignedModerator: null }
                ];
            }

            // Optional: if you want to filter by assigned moderator
            if (filters.moderatorId) {
                matchStage.assignedModerator = mongoose.Types.ObjectId(filters.moderatorId);
            }
            // Boolean filters
            const boolFields = [
                'isTeachingLocationOnline', 'isTeachingLocationOffline',
                'isTeachingLocationTutorHome', 'isTeachingLocationStudentHome',
                'isTutorAccount', 'isFeatured', 'isBooked', 'isRequestToApprove', 'isApproved'
            ];
            boolFields.forEach(field => {
                if (filters[field] !== undefined) {
                    matchStage[field] = filters[field];
                }
            });
        }

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        // Sorting logic
        let sortStage = {};
        if (sortBy === "Price low to high") {
            sortStage.hourlyFee = 1;
        } else if (sortBy === "Price high to low") {
            sortStage.hourlyFee = -1;
        } else {
            sortStage.createdAt = -1; // Default
        }
        pipeline.push({ $sort: sortStage });

        // Count total documents before pagination
        const totalClientsPipeline = [...pipeline, { $count: 'total' }];
        const totalResult = await Client.aggregate(totalClientsPipeline);
        const totalClients = totalResult.length > 0 ? totalResult[0].total : 0;

        // Pagination
        pipeline.push({ $skip: skip }, { $limit: limit });

        const clients = await Client.aggregate(pipeline);

        // Add review info
        const updatedClients = await Promise.all(clients.map(async (client) => {
            const reviews = await Review.aggregate([
                { $match: { clientId: client._id } },
                {
                    $group: {
                        _id: '$clientId',
                        averageRating: { $avg: '$starRating' },
                        totalComments: { $sum: 1 }
                    }
                }
            ]);
            if (reviews.length > 0) {
                client.averageRating = reviews[0].averageRating;
                client.totalComments = reviews[0].totalComments;
            } else {
                client.averageRating = 0;
                client.totalComments = 0;
            }
            return client;
        }));

        res.json({
            status: true,
            result: updatedClients,
            pagination: {
                total: totalClients,
                page,
                limit,
                totalPages: Math.ceil(totalClients / limit)
            }
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = { socialLogin, createClient, clientLogin, allClientList, allClientById, updateClient, deleteClient, sendEmailOtp, checkClient, forgetPasswordOtp, setPassword, checkClientPhone, filterClient };

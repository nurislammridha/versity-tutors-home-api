const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/key');
const otpGenerator = require('otp-generator');
const OTP = require('../models/OtpEmail');
const OtpEmail = require("../models/OtpEmail");
const ForgetOtpEmail = require("../models/ForgetOtpEmail");
//@route POST api/admin
//@desc Client signup
//@access Public
const createClient = async (req, res) => {
    const { phone, email, firstName, lastName, password, otp, isTutorAccount } = req.body;
    try {
        let isPhone = false
        let isMail = false
        let otpObj = await OtpEmail.findOne({ email }) || {}
        if (otp === otpObj?.otp) {
            let clientInfo = new Client({ firstName, lastName, email, phone, password, isPassword: true, isTutorAccount });

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
    await Client.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            let [obj] = data;
            res.status(200).json({
                result: obj,
                message: "All client by client id!",
                status: true,
            });
        }
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
module.exports = { socialLogin, createClient, clientLogin, allClientList, allClientById, updateClient, deleteClient, sendEmailOtp, checkClient, forgetPasswordOtp, setPassword, checkClientPhone };

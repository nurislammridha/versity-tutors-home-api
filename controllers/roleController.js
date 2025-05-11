const express = require("express");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const keys = require('../config/key');
//@route POST api/admin
//@desc Admin login
//@access Public
const createRole = async (req, res) => {
    const { email } = req.body;
    try {
        let divName = await Role.findOne({ email });
        //see if user exists
        if (divName) {
            return res.status(400).json({ message: "This user already exist by this email" });
        }
        let role = new Role(req.body);
        await role.save();
        res.status(200).json({
            message: "Role inserted succesfully",
            status: true,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//all Role
const allRoles = async (req, res) => {
    try {
        await Role.find((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    result: data,
                    message: "All Role are showing!",
                    status: true,
                });
            }
        });
    } catch (error) {
        res.status(500).send("Server error");
    }
};
//all role filter
const allRolesFilter = async (req, res) => {
    try {
        const { search = null, filters = null, page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        let query = {};
        // Search by multiple fields
        if (search && search.length > 0) {
            const regex = new RegExp(search, "i"); // Case-insensitive search
            query.$or = [
                { name: regex },
                { gender: regex },
                { email: regex },
                { phone: regex },
                { whatsapp: regex },
                { roleType: regex },
                { address: regex },
            ];
        }
        if (filters && filters.length > 0) {
            query.managerId = filters;
        }
        const total = await Role.countDocuments(query);
        const subCat = await Role.find(query)
            .skip(skip)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .populate('managerInfo')

        res.status(200).json({
            result: subCat,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            message: "Role get successfully",
            status: true,
        });
    } catch (error) {
        console.log('error', error)
        res.status(500).send("Server error");
    }
};
//All Role By roleType//
const allRolesByRoleType = async (req, res) => {
    const roleType = req.query.roleType;
    await Role.find({ roleType }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "All role by role type!",
                status: true,
            });
        }
    });
};

// Role By Id//
const roleById = async (req, res) => {
    await Role.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            let [obj] = data;
            res.status(200).json({
                result: obj,
                message: "Role details!",
                status: true,
            });
        }
    }).populate('managerInfo');
};

//Update Role
const updateRole = async (req, res) => {
    await Role.updateOne(
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
                    message: "Data were updated successfully!",
                    status: true,
                });
            }
        }
    );
};

//delete Role
const deleteRole = async (req, res) => {
    await Role.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Role was deleted successfully!",
                status: true,
            });
        }
    });
};
//role registration
const roleRegistration = async (req, res) => {
    const { email, password } = req.body;
    try {
        let info = await Role.findOne({ email }).populate('managerInfo');

        if (info) {
            if (info.isRegistered) {
                //all ready registered
                return res.status(200).json({
                    message: `You are already registered, please login`,
                    result: "",
                    status: false,
                    isLogin: false
                });
            } else {
                //registered process, update password
                await Role.updateOne(
                    { email },
                    {
                        $set: { password, isRegistered: true },
                    },
                    (err) => {
                        if (err) {
                            res.status(500).json({
                                error: "There was a server side error!",
                            });
                        } else {
                            //now finally login
                            const payload = {
                                email, password
                            };
                            jwt.sign(
                                payload,
                                keys.key,
                                {
                                    expiresIn: 31556926 // 1 year in seconds
                                },
                                (err, token) => {
                                    return res.status(200).json({
                                        message: `Your are successfully registered`,
                                        result: info,
                                        token: "Bearer " + token,
                                        status: true,
                                        isLogin: true
                                    });
                                }
                            );

                        }
                    }
                );
            }

        } else {
            return res.status(200).json({
                message: `Your email is n't found`,
                result: "",
                status: false,
                isLogin: false
            });
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//role Login
const roleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let info = await Role.findOne({ email, password }).populate('managerInfo');

        if (info) {

            //now finally login
            const payload = {
                email, password
            };
            jwt.sign(
                payload,
                keys.key,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    return res.status(200).json({
                        message: `Your are successfully login`,
                        result: info,
                        token: "Bearer " + token,
                        status: true,
                        isLogin: true
                    });
                }
            );


        } else {
            return res.status(200).json({
                message: `Wrong credential`,
                result: "",
                status: false,
                isLogin: false
            });
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
module.exports = { createRole, allRoles, roleById, updateRole, deleteRole, allRolesFilter, allRolesByRoleType, roleRegistration, roleLogin };

const jwt = require("jsonwebtoken");
const User = require("../models/users.model.js");

const authenticateUser = async (req, res, next) => {
    const accessToken =
        req.cookies.accessToken ||
        (req.header("Authorization") &&
            req.header("Authorization").replace("Bearer ", ""));

    if (!accessToken) {
        return res
            .status(401)
            .json({ message: "Authorization denied - Access token missing" });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error(error.message);
        return res
            .status(401)
            .json({ message: "Authorization Failed - Invalid token" });
    }
};

module.exports = authenticateUser;

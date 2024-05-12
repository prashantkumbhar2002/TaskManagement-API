const User = require('../models/users.model.js');

class UserService {
    async findByUserName(userName) {
        try {
            const desanitizedUser = await User.findOne({ userName: userName });
            return this.sanitizeUser(desanitizedUser);
        } catch (error) {
            throw new Error(`Error finding user by username: ${error.message}`);
        }
    }

    async registerUser(userData) {
        try {
            const newUser = new User(userData);
            return await newUser.save();
            // return this.sanitizeUser(desanitizesUser); 
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    }


    async findById(userId) {
        try {
            const desanitizedUser = await User.findById(userId);
            return this.sanitizeUser(desanitizedUser); 
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    async findByIdDesanitized(userId) {
        try {
            return await User.findById(userId); 
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    async updateUser(userId, updateData) {
        try {
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                throw new Error('User not found');
            }
            // Update user fields based on the provided data
            for (const field in updateData) {
                existingUser[field] = updateData[field];
            }
            const desanitizedUser = await existingUser.save();
            return this.sanitizeUser(desanitizedUser);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async findByIdAndUpdate(userId, payload, options) {
        try {
            const desanitizedUser = await User.findByIdAndUpdate(userId, payload, options);
            return this.sanitizeUser(desanitizedUser);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async isPasswordCorrect(uSer, password) {
        try {
            const user = await User.findById(uSer._id);
            return await user.isPasswordCorrect(password);
        }
        catch (error) {
            console.error("Error validating user password:", error);
            return false;
        }
    }

    async generateAccessAndRefreshTokens(userId) {
        try {
            const user = await  User.findById(userId);
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();
            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false });
            return { accessToken, refreshToken };
        } 
        catch (error) {
            console.error("Error generating tokens:", error);
            throw new Error(`Something went wrong while generating access and refresh token: ${error.message}`);
        }
    };


    sanitizeUser(user) {
        // Create a new object with user data, excluding sensitive fields
        if(user){
            const sanitizedUser = {
                _id: user._id,
                userName: user.userName,
                fullName: user.fullName,
            };
            return sanitizedUser;
        }
    }
}

module.exports = new UserService();

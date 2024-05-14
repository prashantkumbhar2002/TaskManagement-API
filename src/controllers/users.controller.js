const jwt = require('jsonwebtoken');
const userService = require('../services/users.services.js')

class UserController {
    async registerUser(req, res) {
        try {
            let { userName, fullName, password } = req.body;
            const existingUserName = await userService.findByUserName(userName);
            if (existingUserName) {
                return res.status(400).json({ message: 'UserName already exists' });
            }
            userName = userName.toLowerCase();
            const user = await userService.registerUser({ userName, fullName, password });
            if (!user) {
                return res.status(500).json({ message: 'Error while registering user' });
            }
            res.status(201).json({ 
                message: 'User registered successfully',
                user: user
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async loginUser(req, res) {
        try {
            const { userName, password } = req.body;
            if (!userName) {
                return res.status(400).json({ message: 'UserName is required' });
            }
            // Find user by username or email
            const user = await userService.findByUserName(userName);
            if (!user) {
                return res.status(404).json({ message: "User not found with this userName" });
            }
            const isPasswordCorrect = await userService.isPasswordCorrect(user, password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid user password." });
            }
            // Generate access token and refresh Token
            const { accessToken, refreshToken } = await userService.generateAccessAndRefreshTokens(user._id);
            const loggedInUser = await userService.findById(user._id);
            const options = {
                httpOnly: true,
                secure: true,
            };
            res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({
                    message: "User logged-in Successfully",
                    loggedInUser,
                    //temporarily sending access token in res for swagger use
                    accessToken,
                    refreshToken
                });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async refreshAccessToken(req, res) {

        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            return res.status(401).json({ message: 'Unauthorized Request' });
        }
        try {
            // Find user by refresh token
            const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await userService.findByIdDesanitized(decodedToken?._id);
            if (!user) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }
            if (incomingRefreshToken !== user?.refreshToken) {
                return res.status(401).json({ message: "Refresh Token is expires or used." });
            }

            const options = {
                httpOnly: true,
                secure: true,
            };
            // Generate new access token
            const { accessToken, refreshToken } = await userService.generateAccessAndRefreshTokens(user._id );
            res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "Access token refreshed", 
                accessToken,    
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async logoutUser(req, res) {
        try {
            await userService.findByIdAndUpdate(
                req.user._id,
                {
                    $unset: {
                        refreshToken: 1
                    }
                },
                {
                    new: true,
                }
            );
          
            const options = {
              httpOnly: true,
              secure: true,
            };
          
            res
                .status(200)
                .clearCookie("accessToken", options)
                .clearCookie("refreshToken", options)
                .json({message: "User Logged Out Successfully"});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
        
    }

    async getCurrentUser(req, res) {
        const user = req.user;
        res
            .status(200)
            .json({
                message: "User fetched Successfully",
                user
            });
    }

    async changeCurrentPassword (req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await userService.findById(req.user?._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isPasswordCorrect = await userService.isPasswordCorrect(user, oldPassword);
        
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid Password" });
            }
            await userService.updateUser(user?._id, {password : newPassword} );
        
            return res
            .status(200)
            .json( { message: "Password Updated successfully"});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    };


    /* Temporarily stay on this */
    // async updateAccountDetails(req, res) {
    //     const { fullName } = req.body;
    //     if (!fullName ) {
    //       throw new APIError(400, "All fields are required");
    //     }
      
    //     const user = await User.findByIdAndUpdate(
    //       req.user?._id,
    //       {
    //         $set: {
    //           // fullName: fullName,
    //           // email: email
      
    //           fullName,
    //           email,
    //         },
    //       },
    //       { new: true }
    //     ).select("-password");
      
    //     return res
    //       .status(200)
    //       .json(new APIResponse(200, user, "Account details updated successfully"));
    // };

}

module.exports = new UserController();

import { uploadOnCloudinary} from "../utils/cloudinary.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const generateAccessAndRefereshTokens = (async (userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
})

const registerUser = asyncHandler(async (req, res) => {
    // Steps to register user (proposed) : 
    // 1.) Are they already registered ?
    // 2.) if yes send to login page 
    // 3.) if no give email, name, pass, avatar,
    // 4.) send otp on email , phone etc
    // 5.) done

    // Steps to regster (actual) :
    // 1.) get user details from front-end (here postman) 
    // 2.) validation (already registered or not)
    // 3.) check if user already regstered or not (check via username and email)
    // 4.) check for images, check for avatar
    // 5.) upload them to cloudinary, avtar
    // 6.) create user object - create entry in db
    // 7.) remove password and refresh token field from respnse 
    // 8.) check for creation 
    // 9.) retarn response

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const { fullname, email, username, password } = req.body;

    //console.log("email: ", email);

    console.log("Request body:", req.body);

    // advanced syntax : 
    // if (
    //     [fullname, email, username, password].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(400, "All fields are required")
    // }

    if(fullname == ""){
        throw new ApiError(400,"Full-Name is Required");
    }
    if(email == ""){
        throw new ApiError(400,"E-Mail is Required");
    }
    if(username == ""){
        throw new ApiError(400,"User-Name is Required");
    }
    if(password == ""){
        throw new ApiError(400,"Password is Required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordMatch(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);

    const isPasswordValid = await user.isPasswordMatch(oldPassword);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid old password");
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false});

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User details fetched successfully"));
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const {fullname, email} = req.body
    
    if(!fullname && !email){
        throw new ApiError(400, "Fullname or email is required");
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                fullname,
                email : email.toLowerCase()
            }
        },
        {
            new : true
        }
    ).select("-password ")

    return res
    .statsu(200)
    .json(new ApiResponse(200, user, "User details updated successfully"))
})

const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User
        .findById(req.user?._id)
        .select("avatar");

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const oldAvatarUrl = user.avatar;

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar?.url) {
        throw new ApiError(400, "Error in uploading Image");
    }

    if (oldAvatarUrl) {
        const oldAvatarPublicId = extractPublicIdFromUrl(oldAvatarUrl); // Extract public ID from URL
        await deleteFromCloudinary(oldAvatarPublicId); // Function to delete from Cloudinary
    }

    user.avatar = avatar.url;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, user, "Avatar updated successfully"));
});

const updateCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;

    if(!coverImageLocalPath){
        throw new ApiError(400, "Cover Image file is required");
    }
    
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!coverImage?.url){
        throw new ApiError(400, "Error in uploading Image");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                avatar : coverImage.url
            }
        },
        {
            new : true
        }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, user, "Cover Image updated successfully"));
})

const  GetUserChannelProfile = asyncHandler(async (req,res) => {
    const { username } = req.params;
    if(!username?.trim()){
        throw new ApiError(400, "Username is required");
    }

    const channel =  User.aggregate([
        {
            $match : {
                username : username?.toLowerCase()
            }
        },
        {
            $loopup : {
                from : "subscriptions",
                localfield : "_id",
                foreignField : "channel",
                as : "subscribers"
            }
        },
        {
            $lookup : {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project : {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }
    ])

    if(!channel?.length){
        throw new ApiError(404, "Channel not found");
    }

    return res.status(200).json(new ApiResponse(200, channel[0], "Channel profile fetched successfully"));
})

const getWatchHstory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match : {
                _id : mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup : {
                from : "videos",
                localField : "watchHistory",
                foreignField : "_id",
                as : "watchHistory",
                pipeline : [
                    {
                        $lookup : {
                            from : "users",
                            localField : "user",
                            foreignField : "_id",
                            as : "owner",
                            pipeline : [
                                {
                                    $project : {
                                        fullname : 1,
                                        username : 1,
                                        avatar : 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields : {
                            owner : {
                                $first : "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])
    return res.status(200).json(new ApiResponse(200, user[0], "Watch History fetched successfully"));
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
    GetUserChannelProfile,
    getWatchHstory
}


// // import { asyncHandler } from "./asyncHandler.js"; // This is incorrect if `asyncHandler` is exported as default
// // import asyncHandler from "./asyncHandler.js"; // This is correct

// // 1. export default
// // The export default keyword is used to export a single value or entity from a module. When a module uses export default, you can import that value with any name in another module.

// // 2. Named Exports
// // Named exports allow you to export multiple values from a module. Each value is exported with its name and must be imported using the exact same name (enclosed in curly braces).

// // Why export default vs Named Exports
// // Single Export (export default): Use export default when you want to export a single main value from a module. This is useful when your module is focused on a single function, class, or object.

// // Multiple Exports (Named Exports): Use named exports when you want to export multiple values or functions from a module. This is useful for utility modules where you have several related functions or constants.
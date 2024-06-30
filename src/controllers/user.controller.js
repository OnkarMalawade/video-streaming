import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiRespose } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler(async(req,res) => {
    //res.status(200).json({
    //    message : "ok"
    //})
    const {fullname, email, username, password} = req.body;
    console.log("email:", email);
    console.log(req.body);
    console.log(existedUser);

    //if (fullname === "") {
    //    throw new ApiError(400, "Fullname is Required")
    //}

    if ([fullname, email, username, password].some(
        (field)=>{
            field?.trim() === ""
        }
        )
    ) {
        throw new ApiError(400, "All Fields are Required")
    }

    const existedUser = User.findOne({
        $or : [{ username },{ email }]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists.");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400,"Avatar file is required");
    }

    User.create({
        fullname,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiRespose(200, createdUser, "User registered successfully.")
    );

})

export {registerUser} 
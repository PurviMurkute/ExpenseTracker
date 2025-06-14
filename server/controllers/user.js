import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from  'jsonwebtoken';

const postSignUp = async (req, res) => {
  const { name, email, password, DOB, city } = req.body;

  if(!name || !email || !password || !DOB || !city){
    return res.status(400).json({
        success: false,
        data: null,
        message: "All fiels are required"
    })
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: encryptedPassword,
    DOB,
    city,
  });

  try {
    const savedUser = await user.save();

    return res.status(201).json({
      success: true,
      data: savedUser,
      message: "SignUp Successful",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e.message,
    });
  }
};

const postLogin = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            data: null,
            message: "All fiels are required"
        })
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({
            success: false,
            data: null,
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Invalid email or password'
        })
    }

    user.password = undefined; //remove pass from response

    const jwtToken = jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 }
  )

    res.status(200).json({
        success: true,
        data: user,
        jwtToken: jwtToken,
        message: "Login Successful"
    })
}

export {
    postSignUp,
    postLogin
}

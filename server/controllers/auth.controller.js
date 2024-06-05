
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const signup = async (req, res, next) => {
  res.clearCookie('access_token').status(200)
  console.log("signup hello00");
  const { username, email, password } = req.body;
  console.log("step 1");
  const emailValidator=validator.isEmail(email)
  console.log("step 2");
  const nameValidator=validator.isAlpha(username)
  console.log("step 3");
  const strongPassword=validator.isStrongPassword(password)
  console.log("step 4");
  if(!emailValidator  )
  {
      console.log("eerros validation");
      return next(errorHandler(401,"Invalid Email"))
  }
  console.log("step 5");
  if(!nameValidator)
  {
      console.log("eerros validation");
      return next(errorHandler(401,"Username Must be Alphabets Only"))
  }
  console.log("step 6");
  if(!strongPassword)
  {
      console.log("eerros validation");
      return next(errorHandler(401,"Password must contain min 8 character, min 1 UpperCase , 1 LowerCase and min 1 Symbol"))
  }
  console.log("step 7");
  const hashedPassword = bcryptjs.hashSync(password, 10);
  console.log("step 8");
  const newUser = new User({ username, email, password: hashedPassword });
  console.log("step 9");
  try {
    console.log("step 10");
    await newUser.save();
    console.log("step 11");
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next("Account Already Exists")
  }
};

export const signin = async (req, res, next) => {
  // res.clearCookie('access_token').status(200)
  console.log("signin hello jojo");
  const { email, password } = req.body;

  console.log("user login data",req.body);
  console.log("step 1");
  
  console.log("step 4");
  try {
    console.log("step 5");
    const validUser = await User.findOne({ email });
    console.log("login verified step 1");
    console.log("user",validUser);
    if(validUser===null)
    {
      console.log("no user exist");
      return next(errorHandler(403, 'Account Not Exists'));
    }
    if (!validUser.verified) {
      console.log("User not verified");
      return next(errorHandler(403, 'User is not verified'));
    }
    console.log("login validation step 3");
    console.log("user Details is",validUser);
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log("step eror");
    console.log(error);
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        verified:true,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  console.log("User signout successfully");
  res.clearCookie('access_token').status(200).json('Signout success!');
  
};

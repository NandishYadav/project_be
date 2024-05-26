
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('./config');
const utiles = {
     validatePassword : async(password)=> {
        const minLength = 8;
        const hasLowercase = password.toLowerCase() !== password;
        const hasUppercase = password.toUpperCase() !== password;
        const hasNumber = /\d/.test(password);
        const hasSymbol = !/^[a-zA-Z0-9]+$/.test(password);
      
        if (password.length < minLength) {
          return `Password must be at least ${minLength} characters long.`;
        } else if (!hasLowercase) {
          return "Password must contain at least one lowercase letter.";
        } else if (!hasUppercase) {
          return "Password must contain at least one uppercase letter.";
        } else if (!hasNumber) {
          return "Password must contain at least one number.";
        } else if (!hasSymbol) {
          return "Password must contain at least one symbol (e.g., !@#$%^&*)";
        }
      
        // Password is valid
        return "Valid";
      },
    hashPassword : async(password)=> {
        if (!password || typeof password !== 'string') {
          throw new Error('Invalid password: must be a non-empty string');
        }
      
        try {
          // Use a strong, work-factoring hashing algorithm like bcrypt
          const saltRounds = 10; // Adjust based on security needs and processing power
          const salt = await bcrypt.genSalt(saltRounds);
          const hash = await bcrypt.hash(password, salt);
          return hash;
        } catch (error) {
          console.error('Error hashing password:', error);
          throw error; // Re-throw the error for proper handling
        }
      },
      verifyPassword : async(password, hashedPassword) => {
        if (!password || typeof password !== 'string' || !hashedPassword || typeof hashedPassword !== 'string') {
          throw new Error('Invalid password or hashed password: must be non-empty strings');
        }
        try {
          const isMatch = await bcrypt.compare(password, hashedPassword);
          return isMatch;
        } catch (error) {
          console.error('Error verifying password:', error);
          throw error; // Re-throw the error for proper handling
        }
      },
      generateToken:async(payload) => {
        return jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn,
        });
      },
      sendMail:async(email,subject,text,html) => {
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        });
        
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: subject,
          text: text,
          html: html
        };
        return 
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            return info.response;
          }
        });
      }
}

module.exports = utiles;

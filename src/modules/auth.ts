import bcrypt from 'bcrypt'      //  bcrypt is a cryptographic hashing function designed primarily for securely hashing passwords.
import jwt from 'jsonwebtoken'  // its a safe way of transmitting information between two parties


export const comparePasswords = (password, hash) => {     // function that takes two parameters: password (the plain-text password) and hash (the bcrypt hash to compare against).
  return bcrypt.compare(password, hash)                  //  compares the plain-text password (password) with the bcrypt hash (hash)
}                                                        //  returns a boolean indicating whether they match.

export const hashPassword = (password) => {            // password representing the plain-text password that you want to hash.
  return bcrypt.hash(password, 5)                      // bcrypt.hash to hash the passowrd (the plain-text password) and the number of the passowrd conatins 5 characters
}

export const createJWT = (user) => {                 // function to generate a JSON Web Token (JWT) based on user information
  const token = jwt.sign({                           // the parameter user used to generate the JWT.
      id: user.id,                                  // jwt.sign is a function used to sign a JWT payload. It takes two main parameters 
      username: user.username                     // the first parameter is the user id and the username 
    },                                           // process.env.JWT_SECRET is secret key used to sign the JWT. It's retrieved from the environment variable
    process.env.JWT_SECRET
  )
  return token                                 // returns the generated JWT token
}

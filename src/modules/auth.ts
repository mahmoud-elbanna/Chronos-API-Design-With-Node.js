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

export const protect = (req, res, next) => {    // middleware function named (protect) to protect routes by requiring a valid JWT (JSON Web Token) in the request headers for authentication.
  const bearer = req.headers.authorization      // next is a callback to pass control to the next middleware
                                                // const bearer retrieves the value of the Authorization header from the incoming request, which typically contains the JWT
  if (!bearer) {                                // checks if the Authorization header is missing (!bearer). If it is missing, it sends a 401 Unauthorized status                                                                              // with a JSON response indicating that the request is not authorized.
    res.status(401)
    res.json({message: 'not authorized'})
    return
  }

  const [, token] = bearer.split(' ')        // const [, token] is a function splits the Authorization header to extract the token part.
                                              // if (!token) to checks if a token exists. If it doesn't, it sends a 401 Unauthorized status 
  if (!token) {                                    // with a JSON response indicating that the token is not valid.
    res.status(401)
    res.json({message: 'not valid token'})
    return
  }
                                                          // try block, the user function attempts to verify the JWT using jwt.verify() from the jsonwebtoken library
  try {                                                      // passing in the token info user and the JWT secret (process.env.JWT_SECRET). 
    const user = jwt.verify(token, process.env.JWT_SECRET)   // If the token is successfully verified, the user object decoded from the token is attached 
    req.user = user                                         // to the request (req.user) and the middleware calls next() to pass control to the next middleware
    next()
  } catch (e) {                                          // If an error occurs during verification (invalid token or expired token), it catches the error
    console.error(e)                             // and logs it to the console, sends a 401 Unauthorized status, and returns a JSON response indicating that the token is not valid.
    res.status(401)
    res.json({message: 'not valid token'})
    return
  }
}

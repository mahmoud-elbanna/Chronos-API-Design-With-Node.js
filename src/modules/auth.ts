import bcrypt from 'bcrypt'      //  bcrypt is a cryptographic hashing function designed primarily for securely hashing passwords.
import jwt from 'jsonwebtoken'  // its a safe way of transmitting information between two parties


export const comparePasswords = (password, hash) => {     // function that takes two parameters: password (the plain-text password) and hash (the bcrypt hash to compare against).
  return bcrypt.compare(password, hash)                  //  compares the plain-text password (password) with the bcrypt hash (hash)
}                                                        //  returns a boolean indicating whether they match.


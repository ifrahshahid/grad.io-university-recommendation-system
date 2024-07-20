import express from 'express';
import bcrypt from 'bcrypt';
import Jwt, { decode } from "jsonwebtoken";
import db from './db.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();
const salt = 10;


router.post('/signup', [
    check('email', "Email is invalid!").isEmail(),
    check('password', "Password must have 6 characters!").isLength({ min: 6, max: 20 }),
    check('confirmPassword', "Passwords do not match!").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match");
        }
        return true;
    })
], (req, res) => {
    const sql = "INSERT INTO login(`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password" })
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json(errors.array()); // Return an array of validation errors
            } else {
                if (err) return res.json({ Error: "Error inserting data in server" });
                return res.json({ Status: "success" });
            }
        })
    })
})


router.post('/signin', [
    check('email', "Email is invalid!").isEmail(),
    check('password', "Password must have 6 characters!").isLength({ min: 6, max: 20 })
  ], (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";
    console.log("Request Email:", req.body.email);
    db.query(sql, [req.body.email], (err, data) => {
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        if (err) {
          console.error("Login Error in server:", err);
          return res.status(500).json({ Error: "Login Error in server", details: err });
        }
        console.log("Retrieved Data:", data);
        if (data.length > 0) {
          const userId = data[0].id;
          bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
            if (err) {
              console.error("Password compare error:", err);
              return res.status(500).json({ Error: "Password compare error", details: err });
            }
            if (response) {
              const name = data[0].name;
              const token = Jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
              req.session.token = token;
              req.session.userId = userId;
              req.session.save((err) => {
                if (err) {
                  console.error("Session save error:", err);
                  return res.status(500).json({ Error: "Session save error", details: err });
                }
                console.log("Session saved successfully:", req.session);
                return res.json({ Status: "success", userId,token });
              });
            } else {
              return res.status(401).json({ Error: "Invalid Email or Password" });
            }
          });
        } else {
          return res.status(401).json({ Error: "Invalid Email or Password" });
        }
      }
    });
  });



export default router;
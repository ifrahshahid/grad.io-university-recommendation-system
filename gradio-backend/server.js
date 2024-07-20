import express, { response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import session from "express-session";
import UserAuth from './routes/userAuth.js';
import verifyUser from "./routes/VerifyUser.js";
import UserResponse from "./routes/userResponse.js";
import db from "./routes/db.js";
import AdminAuth from './routes/AdminAuth.js';
import dotenv from 'dotenv'
import RedisStore from 'connect-redis';
import redis from 'redis';

const redisClient = redis.createClient({
  password: 'ceZmJir4Gg75KS3ECvDIJQ7JrXOgRxF9',
    socket: {
        host: 'redis-18925.c74.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 18925
    }
  });

dotenv.config()
const app = express();
app.use(express.json());


const allowAllOrigins = (req, callback) => {
  const corsOptions = {
    origin: req.header('Origin'), // Reflect request origin
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  callback(null, corsOptions);
};

app.use(cors(allowAllOrigins));

app.use(cookieParser());
redisClient.connect().then(()=>console.log("redis connected")).catch(console.error); // Ensure the client is connected

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'gradio',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));


app.get('/home', verifyUser, (req, res) => {
  return res.json({ Status: 'success', name: req.name });
  console.log
});




app.delete('/deleteUniversity/:id', (req, res) => {
  const universityId = req.params.id;

  db.query(
    'DELETE FROM all_universities WHERE id = ?',
    [universityId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to delete university' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: 'University not found' });
      } else {
        res.status(200).json({ message: 'University deleted successfully' });
      }
    }
  );
});

app.put('/updateUniversity/:id', (req, res) => {
  const universityId = req.params.id;
  const { University_name, Location, URL, program, Percentage, sector } = req.body;

  db.query(
      'UPDATE all_universities SET University_name = ?, Location = ?, URL = ?, program = ?, Percentage = ?, sector = ? WHERE id = ?',
      [University_name, Location, URL, program, Percentage, sector, universityId],
      (err, result) => {
          if (err) {
              console.log(err);
              res.status(500).json({ message: 'Failed to update university' });
          } else if (result.affectedRows === 0) {
              res.status(404).json({ message: 'University not found' });
          } else {
              res.status(200).json({ message: 'University updated successfully' });
          }
      }
  );
});



// =================================== User Auth ==================================

app.use(UserAuth);

app.use(AdminAuth);

// =================================== User Response ==============================


app.use(UserResponse);











app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy()
    return res.json({ Status: "success" })
  }

  else {
    return res.redirect('/signin')
  }
})

const PORT = process.env.PORT || 8081

app.listen(PORT,"0.0.0.0",() => {
  console.log("Running....");
})

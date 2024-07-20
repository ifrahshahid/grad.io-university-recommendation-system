
import express from 'express';
import db from './db.js';
import stringSimilarity from 'string-similarity';
import verifyUser from './VerifyUser.js';
import natural from 'natural';
import Sentiment from 'sentiment';
import cors from 'cors';

const sentiment = new Sentiment();
const stemmer = natural.PorterStemmer;
const TfIdf = natural.TfIdf;
const TextAnalysis = new TfIdf();

const UserResponse = express.Router();

const allowAllOrigins = (req, callback) => {
  const corsOptions = {
    origin: req.header('Origin'), // Reflect request origin
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  callback(null, corsOptions);
};

UserResponse.use(cors(allowAllOrigins));



let disciplineNames;

let universityNames;

UserResponse.get('/getRandomQuestions', (req, res) => {
  const sql = "SELECT * FROM riasec_questions ORDER BY RAND() Limit 42 ";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching questions from the database:', err);
      return res.json({ Error: "Error fetching questions from the database" });
    }

    console.log('Fetched questions:', result);
    return res.json({ questions: result });
  });
});

// =====================================================

UserResponse.get('/fetchDataformodel', (req, res) => {
  const query = `
    SELECT 
    ur.question_id, 
      ur.response_weight,
      um.modelquestion, 
      um.selected_option 
    FROM 
      user_res_model AS um
    JOIN 
      user_responses AS ur 
    
    `;

  db.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data: ', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});





UserResponse.get('/getmodelsquestions', (req, res) => {
  const query = 'SELECT * FROM model_questions';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching questions from the database:', err);
      return res.json({ Error: "Error fetching questions from the database" });
    }

    console.log('Fetched questions:', result);
    return res.json({ questions: result });
  });
});


UserResponse.get('/getuserresponseformodel', (req, res) => {
  const sql = `
    SELECT ur.response_weight, rq.QuestionID
    FROM user_responses AS ur
    JOIN riasec_questions AS rq ON ur.question_id = rq.QuestionID`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Process results
    console.log('User responses:', results);
    res.json(results); // Sending results back to the client
  });
});


UserResponse.get('/getuserresponseformodel', (req, res) => {
  const sql = `
  SELECT * FROM user_responses`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Process results
    console.log('User responses:', results);
    res.json(results); // Sending results back to the client
  });
});




UserResponse.get('/getalluserresponsesformodel', (req, res) => {
  const sql = `
    SELECT * FROM user_responses`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Process results
    console.log('User responses:', results);
    res.json(results); // Sending results back to the client
  });
});


UserResponse.post('/getuserresponse', verifyUser, (req, res) => {
  const userId = req.body.userId || req.session.userId;
  console.log("_____API Call_____",userId)
  // Retrieve user responses and corresponding trait types
  const sql = `
    SELECT ur.response, rq.traittype
    FROM user_responses ur
    INNER JOIN riasec_questions rq ON ur.question_id = rq.QuestionID
    WHERE ur.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user responses from the database:', err);
      return res.json({ error: 'Error fetching user responses from the database' });
    }

    // Calculate scores for each trait type
    const scores = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };

    result.forEach((row) => {
      const responseWeight = getResponseWeight(row.response); // Assuming getResponseWeight function exists
      scores[row.traittype] += responseWeight;
    });

    // Log scores to the console
    console.log('Scores for each trait type:', scores);

    // Find the combination of the two highest scores
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [firstType, secondType] = sortedScores.slice(0, 2);

    // Extract the first letter of each type
    const firstLetterFirstType = firstType[0].charAt(0);
    const firstLetterSecondType = secondType[0].charAt(0);

    // Combine the first letters into a single string
    const combinedString = firstLetterFirstType + firstLetterSecondType;

    // Log the combination to the console
    console.log('Combination of Personality Types:', { firstType, secondType });

    // Retrieve disciplines based on trait_type_combination
    const disciplinesSql = `
      SELECT discipline_title, trait_type_combination
      FROM disciplines
      WHERE trait_type_combination = ?
    `;

    db.query(disciplinesSql, [combinedString], (disciplinesErr, disciplinesResult) => {
      if (disciplinesErr) {
        console.error('Error fetching disciplines from the database:', disciplinesErr);
        return res.json({ error: 'Error fetching disciplines from the database' });
      }

      // Log all discipline names in one go
      console.log('Disciplines for the Combined String:', disciplinesResult);

      // Retrieve user target from gradio.user_preference
      const thesql = `SELECT * FROM user_preference WHERE user_id = ${userId}`;
      let userDesire, userTarget; // Declare variables in an accessible scope

      db.query(thesql, (err, result) => {
        if (err) {
          console.error('Error fetching user preferences from the database:', err);
          return res.json({ error: 'Error fetching user preferences from the database' });
        }

        if (result.length === 0) {
          console.log('No preferences found for the user');
          return res.json({ error: 'No preferences found for the user' });
        }

        userDesire = result[0].user_desire;
        userTarget = result[0].user_target;

        // Respond with only disciplinesResult and userTarget
        res.json({
          disciplinesResult,
          userTarget
        });
      });
    });
  });
});

import axios from 'axios';

// Assuming you have an Express router defined as UserResponse
UserResponse.post('/getResults', verifyUser, async (req, res) => {
  try {
    const userId = req.body.userId || req.session.userId;
    console.log('dbl A',userId);
    const response = await axios.get('http://209.97.144.39/get-results',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const suggestedDisciplines = response.data.disciplines;
    const sql = `
      SELECT ur.response, rq.traittype
      FROM user_responses ur
      INNER JOIN riasec_questions rq ON ur.question_id = rq.QuestionID
      WHERE ur.user_id = ?
    `;

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user responses from the database:', err);
        return res.status(500).json({ error: 'Error fetching user responses from the database' });
      }

      const scores = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };

      result.forEach((row) => {
        const responseWeight = getResponseWeight(row.response); // Assuming getResponseWeight function exists
        scores[row.traittype] += responseWeight;
      });

      console.log('Scores for each trait type:', scores);

      const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const [firstType, secondType] = sortedScores.slice(0, 2);

      const firstLetterFirstType = firstType[0].charAt(0);
      const firstLetterSecondType = secondType[0].charAt(0);

      const combinedString = firstLetterFirstType + firstLetterSecondType;

      console.log('Combination of Personality Types:', { firstType, secondType });

      const disciplinesSql = `
        SELECT discipline_title, trait_type_combination
        FROM disciplines
        WHERE trait_type_combination = ?
      `;

      db.query(disciplinesSql, [combinedString], (disciplinesErr, disciplinesResult) => {
        if (disciplinesErr) {
          console.error('Error fetching disciplines from the database:', disciplinesErr);
          return res.status(500).json({ error: 'Error fetching disciplines from the database' });
        }

        const disciplineNames = disciplinesResult.map((discipline) => discipline.discipline_title);
        console.log('Disciplines for the Combined String:', disciplineNames);

        const unisql = `
          SELECT Program
          FROM all_universities
        `;

        db.query(unisql, (UniversityErr, UniversityResult) => {
          if (UniversityErr) {
            console.error('Error fetching university data from the database:', UniversityErr);
            return res.status(500).json({ error: 'Error fetching university data from the database' });
          }

          const universityNames = UniversityResult.map((universityData) => universityData.Program);
          console.log('University Majors:', universityNames);

          const matchingDisciplines = [];

          for (const suggestedDiscipline of suggestedDisciplines) {
            const matches = [];
            for (const targetDiscipline of universityNames) {
              const StringResult = stringSimilarity.findBestMatch(suggestedDiscipline, [targetDiscipline]);
              if (StringResult.bestMatch.rating >= 0.2) {
                matches.push({ discipline: StringResult.bestMatch.target, rating: StringResult.bestMatch.rating });
              }
            }
            matches.sort((a, b) => b.rating - a.rating);
            const topMatches = matches.slice(0, 20).map(match => match.discipline);
            matchingDisciplines.push(topMatches);
          }

          const universitiesSql = `
            SELECT University_name, program, Percentage, Sector, location,URL
            FROM all_universities
            WHERE program IN (${Array(matchingDisciplines.flat().length).fill('?').join(',')})
          `;
          const universitiesPrograms = matchingDisciplines.flat();

          db.query(universitiesSql, universitiesPrograms, (UniversityErr, UniversityResult) => {
            if (UniversityErr) {
              console.error('Error fetching university data from the database:', UniversityErr);
              return res.status(500).json({ error: 'Error fetching university data from the database' });
            }
            console.log('University Programs that are the best match:', UniversityResult);

            const getUserPreferencesQuery = `
              SELECT selectedCity, universitySector, percentage
              FROM user_academic
              WHERE userId = ?
            `;
            db.query(getUserPreferencesQuery, [userId], (err, userPreferences) => {
              if (err) {
                console.error('Error fetching user preferences from the database:', err);
                return res.status(500).json({ error: 'Error fetching user preferences from the database' });
              }

              if (userPreferences.length === 0) {
                return res.status(404).json({ error: 'User preferences not found' });
              }

              const preferredCity = userPreferences[0].selectedCity;
              const universitySector = userPreferences[0].universitySector;
              const userPercentage = parseFloat(userPreferences[0].percentage);

              let sectorCondition = '';
              let sectorParams = [];
              if (universitySector === "Both") {
                sectorCondition = 'AND (Sector = ? OR Sector = ?)';
                sectorParams = ["Private", "Govt."];
              } else {
                sectorCondition = 'AND Sector = ?';
                sectorParams = [universitySector];
              }


              let percentageCondition = '';
              if (!isNaN(userPercentage)) { // Check if userPercentage is a valid number
                percentageCondition = `AND Percentage <= ${userPercentage}`;
              } else {
                console.error('Invalid percentage value:', userPercentage);
                return res.status(500).json({ error: 'Invalid percentage value' });
              }

              const universitiesQuery = `
                SELECT University_name, program, Percentage, Sector, location, URL
                FROM all_universities
                WHERE program IN (${Array(matchingDisciplines.flat().length).fill('?').join(',')})
                  ${sectorCondition} ${percentageCondition} AND location = ?
              `;
              const universityParams = [...matchingDisciplines.flat(), ...sectorParams, preferredCity];

              db.query(universitiesQuery, universityParams, (universityErr, universityResult) => {
                if (universityErr) {
                  console.error('Error fetching university data from the database:', universityErr);
                  return res.status(500).json({ error: 'Error fetching university data from the database' });
                }
                console.log('University Programs that match user preferences:', universityResult);
                res.json({
                  university: universityResult,
                  universities: UniversityResult,
                  combination: combinedString,
                  disciplines: disciplineNames,
                  matchingDisciplines,
                  suggestedDisciplines,
                  userPreferences
                });
              });
            });
          });
        });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
});



UserResponse.post('/save-academic-data', verifyUser, (req, res) => {
  const userId = req.body.userId || req.session.userId;
  const { percentage, gender, universitySector, selectedCity } = req.body; // Include only the necessary fields

  // Function to insert new data
  const insertData = () => {
    const insertSql = `
      INSERT INTO user_academic (userId, percentage, gender, universitySector, selectedCity)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(insertSql, [userId, percentage, gender, universitySector, selectedCity], (insertErr) => {
      if (insertErr) {
        console.error('Error inserting data:', insertErr);
        return res.status(500).json({ message: 'Error inserting data' });
      }
      res.status(200).json({ message: 'Data saved successfully' });
    });
  };

  // Check if userId exists in the table
  const checkSql = 'SELECT * FROM user_academic WHERE userId = ?';
  db.query(checkSql, [userId], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking data:', checkErr);
      return res.status(500).json({ message: 'Error checking data' });
    }

    if (checkResult.length > 0) {
      // If userId exists, delete the existing row
      const deleteSql = 'DELETE FROM user_academic WHERE userId = ?';
      db.query(deleteSql, [userId], (deleteErr) => {
        if (deleteErr) {
          console.error('Error deleting data:', deleteErr);
          return res.status(500).json({ message: 'Error deleting data' });
        }

        // Insert new data after deleting the existing row
        insertData();
      });
    } else {
      // If userId does not exist, directly insert the new data
      insertData();
    }
  });
});

UserResponse.get('/getuser_forcheck', (req, res) => {

  const universities = `
        SELECT University_name, program, Percentage,Sector,location
        FROM all_universities
        WHERE program IN (${Array(matchingDisciplines.flat().length).fill('?').join(',')})
    `;
  const universitiesPrograms = matchingDisciplines.flat();
  db.query(universities, universitiesPrograms, (UniversityErr, UniversityResult) => {
    if (UniversityErr) {
      console.error('Error fetching university data from the database:', UniversityErr);
      return res.json({ error: 'Error fetching university data from the database' });
    }
    console.log('University Programs are this which is best match:', UniversityResult);
    res.json({
      universities: UniversityResult
    });
  });

});








function getResponseWeight(response) {
  switch (response) {
    case 'Strongly Disagree':
      return 1;
    case 'Disagree':
      return 2;
    case 'Neutral/Undecided':
      return 3;
    case 'Agree':
      return 4;
    case 'Strongly Agree':
      return 5;
    default:
      return 0;
  }
}




UserResponse.post('/submitResponses', verifyUser, (req, res) => {
  console.log('Received POST request at /submitResponses');
  const userId =req.body.userId || req.session.userId;
  console.log(userId);
  const userResponses = req.body.userResponses;
  const questions = req.body.questions;
  console.log(req.body);
  if (!userResponses || !Array.isArray(userResponses) || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  // Check if userId data exists
  const checkSql = "SELECT * FROM user_responses WHERE user_id = ?";
  db.query(checkSql, [userId], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking for existing user responses:', checkErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // If entries exist for userId, delete them
    if (checkResult.length > 0) {
      const deleteSql = "DELETE FROM user_responses WHERE user_id = ?";
      db.query(deleteSql, [userId], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Error deleting existing user responses:', deleteErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Successfully deleted existing user responses.');
        // Insert new data after deletion
        insertUserResponses(userId, userResponses, questions, res);
      });
    } else {
      // If no entries exist for userId, directly insert new data
      insertUserResponses(userId, userResponses, questions, res);
    }
  });
});

function insertUserResponses(userId, userResponses, questions, res) {
  userResponses.forEach((response, index) => {
    const question = questions[index];
    let responseWeight;
    switch (response) {
      case "Strongly Disagree":
        responseWeight = 1;
        break;
      case "Disagree":
        responseWeight = 2;
        break;
      case "Neutral":
        responseWeight = 3;
        break;
      case "Agree":
        responseWeight = 4;
        break;
      case "Strongly Agree":
        responseWeight = 5;
        break;
      default:
        responseWeight = 0;
    }

    const sql = "INSERT INTO user_responses(user_id, question_id, response, response_weight) VALUES (?, ?, ?, ?)";

    db.query(sql, [userId, question.QuestionID, response, responseWeight], (err, result) => {
      if (err) {
        console.error(`Error inserting user response for question ${question.QuestionID}:`, err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Successfully inserted into the database.');
    });
  });

  return res.json({ status: 'success' });
}



UserResponse.post('/submituser_preference', verifyUser, (req, res) => {
  const user_id = req.body.userId || req.session.userId;
  console.log("User ID from session:", user_id);
  const { user_desire, user_target } = req.body;

  // SQL query to check if the user ID exists
  const checkSql = "SELECT COUNT(*) AS count FROM user_preference WHERE user_id = ?";
  const deleteSql = "DELETE FROM user_preference WHERE user_id = ?";
  const insertSql = "INSERT INTO user_preference (user_id, user_desire, user_target) VALUES (?, ?, ?)";
  const values = [user_id, user_desire, user_target];

  // Check if the user ID exists
  db.query(checkSql, [user_id], (err, result) => {
    if (err) {
      console.error('Error checking user preference:', err);
      return res.json({ Status: "error", Error: "Error checking data in server" });
    }

    // If user ID exists, delete the previous entry
    if (result[0].count > 0) {
      db.query(deleteSql, [user_id], (err, deleteResult) => {
        if (err) {
          console.error('Error deleting previous user preference:', err);
          return res.json({ Status: "error", Error: "Error deleting data in server" });
        }
        console.log(`Deleted previous preference for user ID: ${user_id}`);
      });
    }

    // Insert the new user preference
    db.query(insertSql, values, (err, insertResult) => {
      if (err) {
        console.error('Error inserting user preference:', err);
        return res.json({ Status: "error", Error: "Error inserting data in server" });
      }
      return res.json({ Status: "success", result: insertResult });
    });
  });
});




UserResponse.post('/submituserresponses', verifyUser, (req, res) => {
  const user_id = req.body.userId || req.session.userId;
  const userResponses = req.body.userResponses;

  // Iterate over userResponses object and save each response in the database
  Object.entries(userResponses).forEach(([questionID, selectedOption]) => {
    const sql = "INSERT INTO user_res_model (user_id, modelquestion, selected_option) VALUES (?, ?, ?)";
    const values = [user_id, questionID, selectedOption];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting user response:', err);
        return res.status(500).json({ error: "Error inserting user response in server" });
      }
    });
  });

  return res.json({ Status: "success" });
});








UserResponse.get('/userresponsesformodeltraning', verifyUser, (req, res) => {
  const user_id = req.body.userId || req.session.userId; // Assuming you store user ID in session

  // Query to fetch all user responses for the given user ID
  const sql = "SELECT * FROM user_responses WHERE user_id = ?";
  const values = [user_id];

  // Execute the query
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error fetching user responses:', err);
      return res.status(500).json({ error: "Error fetching user responses from server" });
    }
    // If successful, return the user responses
    res.json({ userResponses: results });
  });
});


UserResponse.get('/getuser_preference', verifyUser, (req, res) => {
  const userId = req.body.userId || req.session.userId;
  const sql = `SELECT * FROM user_preference WHERE user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching user preferences from the database:', err);
      return res.json({ error: 'Error fetching user preferences from the database' });
    }
    // Handle the 'result' from the database query as needed
    return res.json({ preferences: result });
  });
});



UserResponse.get('/show_user_preference_admin', (req, res) => {
  const sql = `
    SELECT
      userpre.id,
      userpre.user_id,
      userpre.user_desire,
      userpre.user_target,
      login.name,
      login.email
    FROM user_preference AS userpre
    JOIN login ON userpre.user_id = login.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching user preferences from the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if result is empty
    if (result.length === 0) {
      return res.json({ message: 'No user preferences found' });
    }

    // Send the fetched preferences as response
    return res.json({ preferences: result });
  });
});



UserResponse.get('/show_user_preference_admin', (req, res) => {
  const sql = `SELECT 
      academic.id,
      academic.userId,
      academic.user_desire,
      academic.user_target,
      login.name,
      login.email
    FROM user_preference AS academic
    JOIN login ON academic.userId = login.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching user preferences from the database:', err);
      return res.json({ error: 'Error fetching user preferences from the database' });
    }
    // Handle the 'result' from the database query as needed
    return res.json({ preferences: result });
  });
});




UserResponse.get('/get_total_users', (req, res) => {
  const sql = 'SELECT COUNT(*) as totalUsers FROM login';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching total number of registered users from the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const totalUsers = result[0].totalUsers;
    return res.json({ totalUsers });
  });
});


UserResponse.get('/get_academic_data', (req, res) => {
  const sql = `SELECT 
  academic.id,
  academic.userId,
  academic.percentage,
  academic.gender,
  academic.universitySector,
  academic.selectedCity,
  login.name,
  login.email
FROM user_academic AS academic
JOIN login ON academic.userId = login.id
`


  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching academic data from the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json({ results: result });
  });
});


UserResponse.get('/get_total_question', (req, res) => {
  const sql = 'SELECT COUNT(*) as question FROM riasec_questions';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching total number of registered users from the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const question = result[0].question;
    return res.json({ question });
  });
});
UserResponse.get('/get_total_university', (req, res) => {
  const sql = 'SELECT COUNT(*) as university FROM universities';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching total number of registered users from the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const university = result[0].university;
    return res.json({ university });
  });
});








UserResponse.post('/user_feedbacks_form', (req, res) => {
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO user_feedbacks (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save feedback' });
    }
    return res.status(200).json({ message: 'Feedback saved successfully' });
  });
});


UserResponse.get('/get_user_feedbacks_form', (req, res) => {
  const sql = `SELECT * FROM user_feedbacks`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching user preferences from the database:', err);
      return res.json({ error: 'Error fetching user preferences from the database' });
    }
    return res.json({ preferences: result });
  });
});



UserResponse.post('/addUniversitydata', (req, res) => {
  const { URL, program, Percentage, University_name, Location, sector } = req.body;

  db.query(
    'INSERT INTO all_universities (URL, program, Percentage, University_name, Location, sector) VALUES (?, ?, ?, ?, ?, ?)',
    [URL, program, Percentage, University_name, Location, sector],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to add university' });
      } else {
        res.status(201).json({ message: 'University added successfully' });
      }
    }
  );
});

UserResponse.get('/all_universities', (req, res) => {
  db.query('SELECT * FROM all_universities', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to fetch universities' });
    } else {
      res.status(200).json(results);
    }
  });
});


UserResponse.get('/all_registered_users', (req, res) => {
  const sql = 'SELECT * FROM login';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    console.log('Fetched data:', results);
    res.json({ users: results });  // Return data in the expected format
  });
});



UserResponse.post('/submitquestion', (req, res) => {
  const sql = "INSERT INTO riasec_questions(`QuestionID`, `QuestionText`, `TraitType`) VALUES (?, ?, ?)";
  const values = [
    req.body.QuestionID,
    req.body.QuestionText,
    req.body.TraitType,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: "Error inserting data in server" });
    return res.json({ Status: "success" });
  });
});


export default UserResponse;
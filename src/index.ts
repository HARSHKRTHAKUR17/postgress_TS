// import { Client } from 'pg'
 
// const client = new Client({
//   connectionString: "postgres://postgres:yourpassword@localhost:5432/yourdatabase"
// })

// // postgres://postgres:yourpassword@localhost:5432/yourdatabase


// async function createUsersTable() {
//     await client.connect()
//     const result = await client.query(`
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `)
//     console.log(result)
// }

// createUsersTable();


//                                         sql injection possibility code

// import { Client } from 'pg';

// // Async function to insert data into a table
// async function insertData() {
// const client: Client = new Client({
//     host: process.env.DB_HOST as string,
//     port: parseInt(process.env.DB_PORT || '5432'),
//     database: process.env.DB_NAME as string,
//     user: process.env.DB_USER as string,
//     password: process.env.DB_PASSWORD as string,
//     ssl: {
//         rejectUnauthorized: false, // Modify if stricter SSL needed
//     },
// });

//   try {
//     await client.connect(); // Ensure client connection is established
//     const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
//     const res = await client.query(insertQuery);
//     console.log('Insertion success:', res); // Output insertion result
//   } catch (err) {
//     console.error('Error during the insertion:', err);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

// insertData();


//                           NO SQL INJECTION

// import { Client } from 'pg';

// // Async function to insert data into a table
// async function insertData(username: string, email: string, password: string) {
// const client: Client = new Client({
//     host: process.env.DB_HOST as string,
//     port: parseInt(process.env.DB_PORT || '5432'),
//     database: process.env.DB_NAME as string,
//     user: process.env.DB_USER as string,
//     password: process.env.DB_PASSWORD as string,
//     ssl: {
//         rejectUnauthorized: false, // Modify if stricter SSL needed
//     },
// });
//   try {
//     await client.connect(); // Ensure client connection is established
//     // Use parameterized query to prevent SQL injection
//     const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
//     const values = [username, email, password];
//     const res = await client.query(insertQuery, values);
//     console.log('Insertion success:', res); // Output insertion result
//   } catch (err) {
//     console.error('Error during the insertion:', err);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

// // Example usage
// insertData('username5', 'user5@example.com', 'user_password').catch(console.error);






//               ANOTHER QUESTION CODEE

import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
// Async function to fetch user data from the database given an email
async function getUser(email: string) {
    const client: Client = new Client({
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    ssl: {
        rejectUnauthorized: false, // Modify if stricter SSL needed
    },
});

    

  try {
    await client.connect(); // Ensure client connection is established
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await client.query(query, values);
    
    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log('No user found with the given email.');
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error('Error during fetching user:', err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
getUser('user5@example.com').catch(console.error);
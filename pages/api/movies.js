// EXAMPLE 1 - Data Fetching through a defined API Endpoint
//import the clientPromise - contains all instructions on how to connect to the MongoDB Atlas cluster.  In the promise we cache the instance of our connection so that subsequent requests do not have to reconnect to the cluster

import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db.collection("movies").find({}).sort({ metacritic: -1 }).limit(10).toArray();

    res.json(movies);
  } catch (error) {
    console.error(error);
  }
};

// try to create an API route by creating additional files in the "api" directory that returns a single movie based on a user provided id.
// Use Next.js Dynamic API Routes to capture the [id]
// Example : http://localhost:3000/api/movies/573a1394f29313caabcdfa3e - should return "Seven Samurai"
// the "_id" property for the "sample_mflix" database in MongoDb is stored as an ObjectID, so you will need to convert the string to an ObjectID.

// EXAMPLE 3 - Data Fetching from MongoDB with Static Site Generation
// This loads extremely slowly in dev because it makes the request each time during refresh or navigation -- but after running npm run build and npm start (production mode) the site is "pre-rendered" and static which loads faster on navigation than the /movies or /api/movies routes which are fetching on demand.

import clientPromise from "../lib/mongodb";

export default function Top({ movies }) {
  return (
    <div>
      <h1>Top 1000 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map((movie) => (
          <li>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db.collection("movies").find({}).sort({ metacritic: -1 }).limit(1000).toArray();

    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (error) {
    console.error(error);
  }
}

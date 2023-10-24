// EXAMPLE - 2 Data Fetching on Server with "getServerSideProps()"
//server-side rendering using getServerSideProps()
//will fetch data on the server-side and then return those as props to our client-side components

import clientPromise from "../lib/mongodb";

export default function Movies({ movies }) {
  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
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

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db.collection("movies").find({}).sort({ metacritic: -1 }).limit(20).toArray();

    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (error) {
    console.error(error);
  }
}

//The only change from the API route method was that we needed to change how the response was parsed inside the getServerSideProps().  The return method has trouble serializing the data - open GitHub issue...(probably fixed by now) but the workaround is to stringify and then parse the data manually.

//The page component "Movies" gets the props from the "getServerSideProps()" method and we use that data to render the page showing the top movie title, metacritic rating, and plot.

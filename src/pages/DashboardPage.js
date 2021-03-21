import React, { useState, useEffect } from 'react';
import RecentlyProducts from "../components/dashboard/RecentlyProducts";
import globalStyles from "../styles";
import Grid from "@material-ui/core/Grid";
import hostName from '../constants';

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${hostName}/library/books/`, { headers: { 'Bypass-Tunnel-Reminder': 's' } })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setIsLoaded(true);
          setBooks(result);
        },
        (error) => {
          console.log(error)
          setIsLoaded(true);
          setError(error);
        });
    /*
        const result = {
          books: [
            {
              url: "https://google.com",
              title: "Artiom blyat"
            },
            {
              url: "https://google.com",
              title: "Artiom2 blyat"
            },
            {
              url: "https://google.com",
              title: "Artiom3 blyat"
            },
            {
              url: "https://google.com",
              title: "Artiom4 blyat"
            }
          ]
        }
    
        setBooks(result.books);
        setIsLoaded(true);*/
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3 style={globalStyles.navigation}>Application / Dashboard</h3>
        <Grid item xs={12} sm={12}>
          <RecentlyProducts books={books} />
        </Grid>
      </div>
    )
  }
};

export default DashboardPage;

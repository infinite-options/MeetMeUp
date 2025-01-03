import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const ListContext = createContext();

// Context Provider
export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/lists'; // Replace with the actual API endpoint
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);

        const results = response.data.result;
        const categorizedData = results.reduce((acc, item) => {
          const { list_category, list_item } = item;
          if (!acc[list_category]) {
            acc[list_category] = [];
          }
          acc[list_category].push(list_item);
          return acc;
        }, {});

        setData(categorizedData);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ListContext.Provider value={{ data, loading, error }}>
      {children}
    </ListContext.Provider>
  );
};

// Custom Hook
export const useListContext= () => {
  return useContext(ListContext);
};

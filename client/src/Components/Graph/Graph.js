import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Hooks/UserContext";
import api from "../../api";

function Graph() {
  console.log("foo");
  const { user } = useContext(UserContext);
  const [moodpoints, setMoodpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await api.get(`/moodpoints/${user.user_id}`);
        console.log("Here's the response: ", response);
      } catch (error) {
        console.log("Here's the error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>Graph goes here</div>
    </>
  );
}

export default Graph;

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Hooks/UserContext";
import api from "../../api";
import { plugins } from "chart.js";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function Graph() {
  const { user } = useContext(UserContext);
  const [moodpoints, setMoodpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await api.get(`/moodpoints/${user.user_id}`);
        console.log("Here's the response: ", response);
        setMoodpoints(response.data)
      } catch (error) {
        console.log("Here's the error: ", error);
      }
    };

    fetchData();
  }, []);

  const dates = moodpoints.map((mp) => mp.created_at)
  const energyPoints = moodpoints.map((mp) => mp.energy)
  const pleasantnessPoints = moodpoints.map((mp) => mp.pleasantness)

  const graphData = {
    labels: dates,
    datasets: [
      {
        label: "Popularity of colors",
        data: energyPoints,
        backgroundColor: [
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 1,
      },
      {
        label: "Pleasantness",
        data: pleasantnessPoints,
        backgroundColor: [
            "",
            "",
            "",
        ]
      }
    ],
  };

  return (
    <>
      <div>Graph goes here</div>
      <Line
        data={graphData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "your feelings",
            },
          },
        }}
      />
    </>
  );
}

export default Graph;

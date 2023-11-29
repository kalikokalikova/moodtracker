import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../Hooks/UserContext";
import api from "../../api";
import {
  Chart,
  TimeScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import "chartjs-adapter-date-fns";

function Graph() {
  const { user } = useContext(UserContext);
  const [moodpointData, setMoodpointData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    Chart.register(
      TimeScale,
      LinearScale,
      LineController,
      PointElement,
      LineElement,
      Tooltip,
      Legend
    );

    const fetchData = async () => {
      try {
        let response = await api.get(`/moodpoints/line/${user.user_id}`);
        console.log("Here's the response: ", response);
        setMoodpointData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Here's the error: ", error);
      }
    };

    fetchData();
  }, [user.user_id]);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart before rendering a new one
      chartRef.current.destroy();
    }
    // Check if moodpointData is not empty before creating a new chart
    if (moodpointData.dates?.length > 0) {
      const ctx = document.getElementById("myChart").getContext("2d");
      const newChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: moodpointData.dates,
          datasets: [
            {
              label: "Energy",
              data: moodpointData.energy_values,
              backgroundColor: moodpointData.colors,
              borderColor: "#acffee",
              borderWidth: 1,
            },
            {
              label: "Pleasantness",
              data: moodpointData.pleasantness_values,
              backgroundColor: moodpointData.colors,
              borderColor: "#b8b4ff",
              borderDash: [5, 5],
              borderWidth: 1,
            },
          ],
        },
        options: {
          elements: {
            point: {
              radius: 5,
            },
          },
          plugins: {
            legend: {
              labels: {
                color: (context) => {
                  const datasetIndex = context.datasetIndex;
                  return datasetIndex === 0 ? "#acffee" : "#b8b4ff";
                },
              }
            }
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: 'day',
                displayFormats: {
                  day: "MMM d",
                },
              },
            },
            y: {
              min: 0,
              max: 8,
            },
          },
        },
      });

      // Save the chart reference
      chartRef.current = newChart;
    }
  }, [moodpointData]);

  return <>{loading ? <div>Loading...</div> : <canvas id="myChart" />}</>;
}

export default Graph;

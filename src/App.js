// Third-party dependencies

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// In-house dependencies
import Navbar from './components/Navbar';
import UserRow from './components/UserRow';
import Button from './components/Button';

// Graphics and stylesheets
import WallE from './graphics/walle.png';
import CSSS from './graphics/csss.gif';
import './App.css';

const WALL_E_API_URL = 'https://api.walle.sfucsss.org/api';

function App() {
  const [userPoints, setUserPoints] = useState([]);

  async function loadUserPoints() {
    try {
      const response = await axios.get(`${WALL_E_API_URL}/user_points/?format=json`);

      if (response.status === 200) {
        // load user data
        setUserPoints(
          // map user information for use in UserRow component
          response.data.results.map((user, position) => {
            return {
              position: position + 1,
              name: user.name,
              avatar: user.avatar,
              points: user.points,
              levelNumber: user.level_number,
              messageCount: user.message_count,
              levelUpSpecificPoints: user.level_up_specific_points,
              pointsNeededToLevelUp: user.points_needed_to_level_up
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
      setUserPoints([]);
    }
  }

  useEffect(() => {
    loadUserPoints();
  }, []);

  return (
    <>
      <Navbar
        leading={[
          <img src={WallE} height='32' alt='Wall-E' />,
          <h2 style={{ fontWeight: 800 }}>Wall-E</h2>
        ]}
        center={[
          <h1>Leaderboard</h1>
        ]}
        trailing={[
          <Button img={CSSS} text='Discord' href='https://discord.gg/sfucsss' />,
          <Button text='Website' href='https://sfucsss.org' />,
        ]}
      />
      <div class='page'>
        {
          userPoints.map(user => {
            return <UserRow user={user} />;
          })
        }
      </div>
    </>
  );
}

export default App;

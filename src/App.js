// Third-party dependencies

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// In-house dependencies
import Navbar from './components/Navbar';
import UserRow from './components/UserRow';
import { UIRow, Button, Input, HorizontalSpacer } from './components/UI';

// Graphics and stylesheets
import WallE from './graphics/walle.png';
import CSSS from './graphics/csss.gif';
import Mural from './graphics/mural.png';
import './App.css';

const WALL_E_API_URL    = 'https://api.walle.sfucsss.org/api';
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE     = 100;

function App() {
  const [userPoints, setUserPoints] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [leaderboardStatus, setLeaderboardStatus] = useState('Loading...');

  async function loadUserPoints() {
    try {
      setLeaderboardStatus('Loading...');
      const response = await axios.get(`${WALL_E_API_URL}/user_points/?format=json&page_size=${pageSize}&page=${page}`);

      if (response.status === 200) {
        const startingPosition = (page - 1) * pageSize + 1;
        setTotalNumberOfPages(response.data.total_number_of_pages);
        setLeaderboardStatus(`${pageSize} users loaded.`);

        // load user data
        setUserPoints(
          // map user information for use in UserRow component
          response.data.results.map((user, position) => {
            return {
              position: startingPosition + position,
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

  function onPageChange(newPage) {
    if (isNaN(newPage) || +newPage < 0 || +newPage > totalNumberOfPages)
      return; // don't set page to newPage

    // set page to be the numeric value of newPage
    setPage(+newPage);
  }

  function onPageSizeChange(newPageSize) {
    if (isNaN(newPageSize) || +newPageSize < 0 || +newPageSize > MAX_PAGE_SIZE)
      return; // don't set page size to newPageSize

    // set page size to be the numeric value of newPageSize
    setPageSize(+newPageSize);
  }

  useEffect(() => {
    // don't load user points with page or pageSize equals 0
    if (page === 0 || pageSize === 0)
      return;

    loadUserPoints();
  }, [page, pageSize]);

  return (
    <>
      <Navbar
        leading={[
          <img src={WallE} height='32' alt='Wall-E' />,
          <h2 style={{ fontWeight: 800 }}>Wall-E</h2>,
          <h1>Leaderboard</h1>
        ]}
        trailing={[
          <Button img={CSSS} text='Discord' href='https://discord.gg/sfucsss' />,
          <Button text='CSSS' href='https://sfucsss.org' />
        ]}
      />
      <div className='page'>
        <section>
          <img src={Mural} alt='Mural' />
          <h1>Wall-E Leaderboard</h1>
          <p>This leaderboard ranks members of the Simon Fraser University <a href="https://sfucsss.org">Computing Science Student Society</a>&apos;s <a href="https://github.gg/sfucsss">Discord server</a>, by number of messages sent.</p>
        </section>
        <UIRow>
          <p>Page</p>
          <Input value={page} onChange={onPageChange} />
          <p>of {totalNumberOfPages}</p>
          <HorizontalSpacer scale='6px' />
          <p>;</p>
          <HorizontalSpacer scale='6px' />
          <p>Page size is</p>
          <Input value={pageSize} onChange={onPageSizeChange} />
          <HorizontalSpacer scale='6px' />
          <p>;</p>
          <HorizontalSpacer scale='6px' />
          <p>{leaderboardStatus}</p>
        </UIRow>
        {
          userPoints.map(user => {
            return <UserRow user={user} />;
          })
        }
        <section>
          <p style={{ textAlign: "center" }}>Made with &lt;3 from the CSSS :)</p>
        </section>
      </div>
    </>
  );
}

export default App;

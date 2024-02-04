import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Flex, helpers } from 'csss-react-lib';
import { Input, Navbar, Row } from './components';

const WALL_E_API_URL = 'https://api.walle.sfucsss.org';
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;
const isMobileDeviceQuery = '(max-width: 768px)';

export default function App() {
  const [isMobileDevice, setIsMobileDevice] = useState(
    helpers.checkMediaQuery(isMobileDeviceQuery)
  );
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [leaderboardStatus, setLeaderboardStatus] = useState('Loading...');

  async function loadUserPoints() {
    try {
      setLeaderboardStatus('Loading...');

      // eslint-disable-next-line max-len
      const { data } = await axios.get(`${WALL_E_API_URL}/user_points/?format=json&page_size=${pageSize}&page=${page}`);
      const startingPosition = (page - 1) * pageSize + 1;
      setTotalNumberOfPages(data.total_number_of_pages);
      setLeaderboardStatus(`${pageSize} users loaded.`);

      setUsers(
        // map user information for use in Row component
        data.results.map((user, position) => {
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
    } catch (error) {
      setUsers([]);
    }
  }

  function onPageChange(newPage) {
    if (isNaN(newPage) || +newPage < 0 || +newPage > totalNumberOfPages) {
      return; // don't set page to newPage
    }

    // set page to be the numeric value of newPage
    setPage(+newPage);
  }

  function onPageSizeChange(newPageSize) {
    if (isNaN(newPageSize) ||
      +newPageSize < 0 ||
      +newPageSize > MAX_PAGE_SIZE) {
      return; // don't set page size to newPageSize
    }

    // set page size to be the numeric value of newPageSize
    setPageSize(+newPageSize);
  }

  useEffect(() => {
    helpers.watchMediaQuery(isMobileDeviceQuery, setIsMobileDevice);
  }, []);

  useEffect(() => {
    // don't load user points with page or pageSize equals 0
    if (page === 0 || pageSize === 0) {
      return;
    }

    loadUserPoints();
  }, [page, pageSize]);

  return (
    <>
      <Navbar>
        <Flex.Container flow='row nowrap' gap='8px' alignItems='center'>
          <img src='walle.png' height='32px' alt='Wall-E' />
          <h1 style={{ fontSize: '14pt', fontWeight: 800 }}>Wall-E</h1>
          <h1 style={{ fontSize: '14pt', fontWeight: 600 }}>Leaderboard</h1>
        </Flex.Container>
        <Flex.Container flow='row nowrap' gap='8px' alignItems='center'>
          <Button className='transparent' href='https://discord.gg/sfucsss'>
            <img src='discord.gif' height='24px' alt='Discord' /> Discord
          </Button>
          <Button className='transparent' href='https://sfucsss.org'>
            CSSS
          </Button>
        </Flex.Container>
      </Navbar>
      <Flex.Container
        flow='column nowrap'
        style={{
          margin: 'auto',
          marginTop: '8px',
          width: 'var(--csss-page-width)'
        }}
      >
        <section>
          <img src='mural.png' alt='Mural' className='mural' />
          <h1>Wall-E Leaderboard</h1>
          <p>
            This leaderboard ranks members of the Simon Fraser University&nbsp;
            <a href="https://sfucsss.org">
              Computing Science Student Society
            </a>&apos;s&nbsp;
            <a href="https://github.gg/sfucsss">Discord server</a>,&nbsp;
            by number of messages sent.
          </p>
        </section>
        <Flex.Container flow='row nowrap' alignItems='center' gap='16px'>
          <Flex.Container flow='row nowrap' alignItems='center' gap='4px'>
            <p>Page</p>
            <Input value={page} onChange={onPageChange} />
            <p>of {totalNumberOfPages}</p>
          </Flex.Container>
          <Flex.Container flow='row nowrap' alignItems='center' gap='4px'>
            <p>Page size is</p>
            <Input value={pageSize} onChange={onPageSizeChange} />
          </Flex.Container>
          <p>{leaderboardStatus}</p>
        </Flex.Container>
        <p>{isMobileDevice}</p>
        {users.map(
          user => <Row user={user} isMobileDevice={isMobileDevice} />
        )}
        <section>
          <p style={{ textAlign: 'center' }}>
            Made with &lt;3 from the CSSS :)
          </p>
        </section>
      </Flex.Container>
    </>
  );
}

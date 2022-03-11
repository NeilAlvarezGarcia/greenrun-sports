import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/CardHome'
import { ContainerCards } from '../components/Containers'
import ModeButton from '../components/ModeButton'
import NavBar from '../components/NavBar'
import axios from 'axios';

export interface typeSportData {
  idSport: string,
  strSport: string,
  strFormat: string,
  strSportThumb: string,
  strSportIconGreen: string,
  strSportDescription: string
}

const Home = () => {
  const [sports, setSports] = useState<typeSportData[]>([]);

  const fetchSportData = async () => {
    const URL = 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php';

    try {
      const res = await axios.get(URL);

      setSports(res.data.sports);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchSportData();

    document.title = 'GreenRun Sports - Home';
  }, [])

  return (
    <ContainerHome>
        <div className="top-container">
          <ModeButton/>
          <ContainerCards className='cards'>
            {sports.map(sport => (
                <Card key={sport.idSport} sport={sport}/>
            ))}
          </ContainerCards>
        </div>
        <NavBar/>
    </ContainerHome>
  )
}

export const ContainerHome = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-container {
    flex: 2;
    overflow: hidden;
    width: 100%;
  }

  .cards {
    scroll-snap-type: y mandatory;
  }
`;

export default Home
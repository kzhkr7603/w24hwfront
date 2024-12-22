import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Container from './Container.js';

const App = () => {

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const getActivity = async () => {
      try {
        const response = await axios.get('https://w24hwbackend.onrender.com/api/Activity');
        setActivity(response.data); // 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getActivity();
  }, []);

  return (
    <div>
      <Header />
      <TrainingList listTraining={activity} />
      <CompetitionList listCompetition={activity} />
    </div>
  );
};

const Header = () => {
  return (
    <>
      <h1 className="logo">
        <a href="/">
          <img src="https://res.cloudinary.com/dod3qcnxx/image/upload/v1734798162/logo_tlwv1g.png" alt="LOGO" />
        </a>
        <span className="logo-text">GURYONGPO FS</span>
        <a href="https://www.instagram.com/9ryongpo_official/" target="_blank" rel="noreferrer">
          <img src="https://res.cloudinary.com/dod3qcnxx/image/upload/v1734798160/instagram_logo_rzbpl3.png" alt="insta_LOGO" style={{ width: '48px', height: '48px', marginLeft: '50px' }} />
        </a>
      </h1>
    </>
  );
};


const TrainingList = (props) => {
  const [isExpanded,setIsExpanded] = useState(false);

  const toggleTitle = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <div className='training'>
      <h2 className="training-title" onClick={toggleTitle} style={{ cursor: 'pointer' }}>훈련</h2>
      {isExpanded&&props.listTraining.map(training => (
        training.type === 'T' &&
        <Container key={training.id} aurl={training.aurl} date={training.date} name={training.name} additionalContent={training.additionalContent} />
      ))}
    </div>
  );
};

const CompetitionList = (props) => {
  const [isExpanded,setIsExpanded] = useState(false);

  const toggleTitle = () => {
    setIsExpanded(prevState => {
      return !prevState;
  });
  };

  return (
    <div className='competition'>
      <h2 className="competition-title" onClick={toggleTitle} style={{ cursor: 'pointer' }}>대회</h2>
      {isExpanded&&props.listCompetition.map(competition => (
        competition.type === 'C' &&
        <Container key={competition.id} aurl={competition.aurl} date={competition.date} name={competition.name} additionalContent={competition.additionalContent} />
      ))}
    </div>
  );
};

export default App;

import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar } from './Calendar';
import axios from 'axios';


export const QueryParamCalControler = () => {
    const {search} = useLocation();
    const navigate = useNavigate();
    const month = new URLSearchParams(search).get('m');
    const year = new URLSearchParams(search).get('y');

    const today = moment();

    const [currentMonthMoment, setCurrentMonthMoment] = useState(
        (month && year)
            ? moment(`${month}${year}`, 'MMYYYY')
            : today
    );
    
    const incrementMonth = () => {
        const newMonth = moment(currentMonthMoment.add(1, 'months'));
        navigate(`?m=${newMonth.format('MM')}&y=${newMonth.format('YYYY')}`);
        setCurrentMonthMoment(newMonth);
    }

    const decrementMonth = () => {
        const newMonth = moment(currentMonthMoment.subtract(1, 'months'));
        navigate(`?m=${newMonth.format('MM')}&y=${newMonth.format('YYYY')}`);
        setCurrentMonthMoment(newMonth);
    }

    const [commitsByDate, setCommitsByDate] = useState({});
    useEffect(() => {
        async function fetchCommits() {
          try {
            const fromDate = currentMonthMoment.startOf('month').format();
            const toDate = currentMonthMoment.endOf('month').format();
            const branchName = 'main'; 
    
            const response = await axios.get(
                `https://api.github.com/repos/Adrijana1308/portfolio/commits?since=${fromDate}&until=${toDate}&sha=${branchName}`
            );
    
            const commits = response.data;
            const commitsData = {};
    
            commits.forEach(commit => {
              const date = commit.commit.committer.date.split('T')[0];
              if (!commitsData[date]) {
                commitsData[date] = [];
              }
              commitsData[date].push(commit);
            });
    
            setCommitsByDate(commitsData);
          } catch (error) {
            console.error('Error fetching commits:', error);
          }
        }
    
        fetchCommits();
      }, [currentMonthMoment]);

    return (
        <Calendar  
            month={currentMonthMoment.format('MM')}
            year={currentMonthMoment.format('YYYY')}
            onPrev={decrementMonth} 
            onNext={incrementMonth}
            commitsByDate={commitsByDate}/>
    );
}
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar } from './Calendar';
import { Octokit } from "@octokit/core";

export const QueryParamCalControler = () => {
  const octokit = new Octokit();

  const fetchCommits = async (month, year) => {
    const owner = 'Adrijana1308';
    const repo = 'portfolio';
    const startOfMonth = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DDTHH:mm:ssZ');
    const endOfMonth = moment(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DDTHH:mm:ssZ');

    let allCommits = [];
    let page = 1;

    while (true) {
      try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
          owner: owner,
          repo: repo,
          since: startOfMonth,
          until: endOfMonth,
          page: page,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        });

        const commits = response.data;
        if (commits.length === 0) {
          break;
        }

        allCommits = [...allCommits, ...commits];
        page++;
      } catch (error) {
        console.error('Error fetching commit data:', error);
        return null;
      }
    }

    return allCommits;
  };

  const { search } = useLocation();
  const navigate = useNavigate();
  const month = new URLSearchParams(search).get('m');
  const year = new URLSearchParams(search).get('y');

  const [commitData, setCommitData] = useState([]);

  useEffect(() => {
    if (month && year) {
      fetchCommits(month, year)
        .then((data) => {
          if (data) {
            setCommitData(data);
          }
        });
    }
  }, [month, year]);

  const today = moment();
  const [currentMonthMoment, setCurrentMonthMoment] = useState(
    (month && year)
      ? moment(`${month}${year}`, 'MMYYYY')
      : today
  );

  const incrementMonth = () => {
    const newMonth = moment(currentMonthMoment).add(1, 'months');
    navigate(`?m=${newMonth.format('MM')}&y=${newMonth.format('YYYY')}`);
    setCurrentMonthMoment(newMonth);
  };

  const decrementMonth = () => {
    const newMonth = moment(currentMonthMoment).subtract(1, 'months');
    navigate(`?m=${newMonth.format('MM')}&y=${newMonth.format('YYYY')}`);
    setCurrentMonthMoment(newMonth);
  };

  return (
    <Calendar
      month={currentMonthMoment.format('MM')}
      year={currentMonthMoment.format('YYYY')}
      onPrev={decrementMonth}
      onNext={incrementMonth}
      commitData={commitData}
    />
  );
};

import moment from 'moment';
import { getDaysInMonth, segmentIntoWeeks, padWeekFront, padWeekBack, daysOfTheWeek } from './util';
import './Calendar.css';
import { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CloseIcon from '@mui/icons-material/Close';

export const Calendar = ({ month, year, onPrev, onNext, commitData }) => {
  const currentMonthMoment = moment(`${month}${year}`, 'MMYYYY');
  const [selectedDate, setSelectedDate] = useState(null);

  const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment));

  const handleCellClick = (dateMoment) => {
    const commitsOnDate = getCommitsOnDate(dateMoment);
    if (commitsOnDate.length > 0) {
      setSelectedDate(dateMoment);
    }
  };

  const handleClose = () => {
    setSelectedDate(null);
  };

  const getCommitsOnDate = (dateMoment) => {
    console.log('Searching for commits on date:', dateMoment.format('YYYY-MM-DD'));
    const filteredCommits = commitData.filter((commit) => {
      const commitDateMoment = moment(commit.commit.author.date);
      return commitDateMoment.isSame(dateMoment, 'day');
    });
    console.log('Found commits:', filteredCommits);
    return filteredCommits;
  };

  return (
    <>
        <div className='calendar-table-wrap'>
            <div className='header'>
                <h1>{currentMonthMoment.format('MMMM YYYY')}</h1>
                <div className='header-buttons'>
                    <button onClick={onPrev}><NavigateBeforeIcon className='icon' /></button>
                    <button onClick={onNext}><NavigateNextIcon className='icon' /></button>
                </div>
            </div>
            <div className='calendar-table'>
                {selectedDate && (
                    <div className='expanded-commit-info'>
                        <div className='text'>
                            <h3>Commits on {selectedDate.format('MMMM D, YYYY')}:</h3>
                            <CloseIcon className='close' onClick={handleClose} />
                        </div>
                        <div className='expanded-commits'>
                            {getCommitsOnDate(selectedDate).map((commit, index) => (
                                <div key={index} className='expanded-commit'>
                                    <div className='commit'>
                                        <p>{commit.commit.message}</p>
                                        <p>{moment(commit.commit.author.date).format('HH:mm:ss')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className='calendar-heading'>
                    {daysOfTheWeek.map(day => <div className='calendar-heading-cell' key={day}>{day}</div>)}
                </div>
                    {weeks.map((week, i) => {
                        const displayWeek = i === 0
                        ? padWeekFront(week)
                        : i === weeks.length - 1
                            ? padWeekBack(week)
                            : week;
                        return (
                            <div className='calendar-row' key={i}>
                                {displayWeek.map((dayMoment, j) => (
                                    <div className='calendar-cell-wrap' key={j}>
                                        {dayMoment ? (
                                            <div className={`calendar-cell${getCommitsOnDate(dayMoment).length > 0 ? ' with-commits' : ''}`} key={dayMoment.format('D')} onClick={() => handleCellClick(dayMoment)}>
                                                <p className='day-number'>{dayMoment.format('D')}</p>
                                                    {getCommitsOnDate(dayMoment).length > 0 && (
                                                        <div className='commit-info'>
                                                            <div className='commit-details'>
                                                                <p>{getCommitsOnDate(dayMoment)[0].commit.message}</p>
                                                            </div>
                                                                {getCommitsOnDate(dayMoment).length > 1 ? (
                                                                    <div className='more-commits'>{`+ ${getCommitsOnDate(dayMoment).length - 1}`}</div>
                                                                ) : null}
                                                        </div>
                                                    )}
                                            </div>
                                        ) : (
                                        <div className='calendar-cell' key={`${i}${j}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
            </div>
        </div>
    </>
  );
};
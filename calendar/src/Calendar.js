import moment from 'moment';
import { getDaysInMonth, segmentIntoWeeks, padWeekFront, padWeekBack, daysOfTheWeek } from './util'
import './Calendar.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export const Calendar = ({ month, year, onPrev, onNext}) => {
    const currentMonthMoment = moment(`${month}${year}`, 'MMYYYY')


    const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment));

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
                                        <div className='calendar-cell-wrap'>
                                            {dayMoment
                                                ? <div className='calendar-cell' key={dayMoment.format('D')}><p>{dayMoment.format('D')}</p></div>
                                                : <div className='calendar-cell' key={`${i}${j}`}></div>}
                                        </div>
                                    ))}
                                </div>
                            );        
                        })} 
                    
                </div>
            </div>
            
        </>
    );
}

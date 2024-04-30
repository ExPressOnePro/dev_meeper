import React from 'react';

export default function Index({ weeklyData }) {
    return (
        <div>
            {weeklyData.map((week) => (
                <div key={week.week_number}>
                    <h2>Week {week.week_number}</h2>
                    <p>Date Range: {week.date_range}</p>
                    {week.days.map((day) => (
                        <div key={day.day_number}>
                            <h3>Day {day.day_number}</h3>
                            <p>Date: {day.date}</p>
                            {day.hours.map((hour) => (
                                <div key={hour.time}>
                                    <p>Time: {hour.time}</p>
                                    <ul>
                                        {hour.record.map((record) => (
                                            <li key={record.record_id}>
                                                <strong>Record ID:</strong> {record.record_id}<br />
                                                <strong>Users:</strong>
                                                <ul>
                                                    {record.users.map((user) => (
                                                        <li key={user.user_id}>
                                                            {user.first_name} {user.last_name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// import React from 'react';
//
// const ScheduleBlock = ({ day, date, time, location, partner }) => {
//     return (
//         <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//             <div className="text-gray-500 text-sm">{day}</div>
//             <div className="text-gray-700 text-lg font-semibold">{date}</div>
//             <div className="text-gray-700 text-lg font-semibold">{time}</div>
//             <div className="text-gray-500 text-sm mt-2">Location</div>
//             <div className="text-gray-700 text-base">{location}</div>
//             <div className="text-gray-500 text-sm mt-2">Partner</div>
//             <div className="text-gray-700 text-base">{partner}</div>
//         </div>
//     );
// };
//
// const ScheduleList = ({ schedules }) => {
//     return (
//         <div className="container mx-auto p-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {schedules.map((schedule, index) => (
//                     <ScheduleBlock
//                         key={index}
//                         day={schedule.day}
//                         date={schedule.date}
//                         time={schedule.time}
//                         location={schedule.location}
//                         partner={schedule.partner}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default ScheduleList;
//
// // Пример использования компонента ScheduleList
// // В реальном приложении данные будут поступать из базы данных или API
//
// const schedules = [
//     {
//         day: 'Monday',
//         date: '2024-07-15',
//         time: '09:00 - 10:00',
//         location: 'Conference Room A',
//         partner: 'John Doe',
//     },
//     {
//         day: 'Tuesday',
//         date: '2024-07-16',
//         time: '10:00 - 11:00',
//         location: 'Conference Room B',
//         partner: 'Jane Smith',
//     },
//     // Добавьте больше записей по необходимости
// ];
//
// const App = () => {
//     return (
//         <div>
//             <h1 className="text-2xl font-bold text-center my-4">My Schedules</h1>
//             <ScheduleList schedules={schedules} />
//         </div>
//     );
// };
//
// export default App;

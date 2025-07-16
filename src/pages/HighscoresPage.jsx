import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const HighscoresPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get('/highscores').then((r) => setData(r.data));
  }, []);
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">글로벌 랭킹 (최고 WPM)</h2>
      <table className="border">
        <thead>
          <tr>
            <th className="border px-4 py-2">순위</th>
            <th className="border px-4 py-2">닉네임</th>
            <th className="border px-4 py-2">WPM</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.username}>
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{row.username}</td>
              <td className="border px-4 py-2">{row.best_wpm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HighscoresPage;

import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

const MyPage = () => {
  const { token, username } = useContext(AuthContext);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('/records', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setRecords(res.data))
      .catch(err => alert('기록 불러오기 실패'));
  }, [token]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">{username}님의 연습 기록</h2>

      <table className="table-fixed border">
        <thead>
          <tr>
            <th className="border px-4 py-2">날짜</th>
            <th className="border px-4 py-2">WPM</th>
            <th className="border px-4 py-2">정확도(%)</th>
            <th className="border px-4 py-2">오타수</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td className="border px-4 py-2">{r.played_at}</td>
              <td className="border px-4 py-2">{r.wpm}</td>
              <td className="border px-4 py-2">{r.accuracy}</td>
              <td className="border px-4 py-2">{r.mistake_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPage;

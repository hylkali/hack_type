import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const AllSentencesPage = () => {
  const [list, setList] = useState([]);
  const load = () => api.get('/sentences').then((r) => setList(r.data));
  useEffect(load, []);
  const del = (id) => confirm('삭제?') && api.delete(`/sentences/${id}`).then(load);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">전체 글 (관리자)</h2>
      {list.map((s) => (
        <div key={s.id} className="border p-2 mb-2 flex justify-between">
          <span>{s.text}</span>
          <button className="text-red-500" onClick={() => del(s.id)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};
export default AllSentencesPage;
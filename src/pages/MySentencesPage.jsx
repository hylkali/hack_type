import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const MySentencesPage = () => {
  const [sentences, setSentences] = useState([]);

  const load = () => api.get('/sentences').then((r) => setSentences(r.data));
  useEffect(load, []);

  const handleDelete = (id) => {
    if (!confirm('삭제?')) return;
    api.delete(`/sentences/${id}`).then(load);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">내가 올린 글</h2>
      {sentences.filter((s) => s.uploader_id).map((s) => (
        <div key={s.id} className="border p-2 mb-2 flex justify-between">
          <span>{s.text}</span>
          <button className="text-red-500" onClick={() => handleDelete(s.id)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};
export default MySentencesPage;
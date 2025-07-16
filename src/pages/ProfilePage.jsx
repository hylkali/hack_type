
import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPwd, setEditPwd] = useState('');

  useEffect(() => {
    api.get('/me').then((res) => {
      setProfile(res.data);
      setEditName(res.data.username);
    });
  }, []);

  const handleSave = () => {
    api
      .patch('/me', { username: editName, password: editPwd })
      .then(() => alert('수정 완료'))
      .catch(() => alert('실패'));
  };

  if (!profile) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">프로필</h2>
      <div className="border p-4 w-80">
        <p>이메일: {profile.email}</p>
        <p>레벨: {profile.level}</p>
        <p>경험치: {profile.experience}</p>
        <p>최고 WPM: {profile.best_wpm ?? '-'}</p>
        <p>최고 정확도: {profile.best_accuracy ?? '-'}</p>
      </div>
      <div className="mt-4 w-80 flex flex-col">
        <input
          className="border p-2 mb-2"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <input
          className="border p-2 mb-2"
          type="password"
          placeholder="새 비밀번호(선택)"
          value={editPwd}
          onChange={(e) => setEditPwd(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
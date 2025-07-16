import React, { useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      login(
        res.data.access_token,
        res.data.username,
        res.data.is_admin // ⭐ 관리자 여부 넘김
      );
      alert('로그인 성공');
    } catch (err) {
      alert(err.response?.data?.msg || '로그인 실패');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <form className="flex flex-col w-64" onSubmit={handleSubmit}>
        <input className="border p-2 m-1" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 m-1" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 mt-2" type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;

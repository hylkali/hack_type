import React, { useState } from 'react';
import axios from '../api/axios';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', { email, username, password });
      alert('회원가입 성공! 로그인 해주세요.');
      // 이후 라우팅 이동 가능
    } catch (err) {
      alert(err.response.data.msg || '회원가입 실패');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input className="border p-2 m-1" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 m-1" placeholder="닉네임" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="border p-2 m-1" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white p-2 mt-2" type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;

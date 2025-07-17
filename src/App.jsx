import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TypingPage from './pages/TypingPage';
import MyPage from './pages/MyPage';
import { AuthContext } from './contexts/AuthContext';
import ProfilePage from './pages/ProfilePage';
import MySentencesPage from './pages/MySentencesPage';
import AllSentencesPage from './pages/AllSentencesPage';
import HighscoresPage from './pages/HighscoresPage';

const App = () => {
  const { token, username, isAdmin, logout } = useContext(AuthContext); // ✅ isAdmin 포함

  useEffect(() => {
    console.log(isAdmin)
  }, [isAdmin])

  return (
    <BrowserRouter>
      <nav className="flex justify-between bg-gray-200 p-4 mb-8">
        <div className="font-bold">Typing App</div>
        <div className="flex gap-4">
          {token ? (
            <>
              <Link to="/">연습</Link>
              <Link to="/mypage">기록</Link>
              <Link to="/profile">프로필</Link>
              <Link to="/mysentences">내 글</Link>
              <Link to="/highscores">랭킹</Link>
              {isAdmin && <Link to="/admin/sentences">글 관리</Link>} {/* ✅ 관리자만 표시 */}
              <button onClick={logout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/register">회원가입</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/" element={token ? <TypingPage /> : <Navigate to="/login" />} />
        <Route path="/mypage" element={token ? <MyPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/mysentences" element={token ? <MySentencesPage /> : <Navigate to="/login" />} />
        <Route path="/admin/sentences" element={token && isAdmin ? <AllSentencesPage /> : <Navigate to="/login" />} />
        <Route path="/highscores" element={<HighscoresPage />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* ✅ fallback */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

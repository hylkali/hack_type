import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

const TypingPage = () => {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sentence, setSentence] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);

  // 초기 카테고리 불러오기
  useEffect(() => {
    axios.get('/categories', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCategories(res.data))
      .catch(err => alert('카테고리 로드 실패'));
  }, [token]);

  // 카테고리 선택 후 문장 불러오기
  const loadSentence = () => {
    if (!selectedCategory) return alert('카테고리를 선택해주세요');
    axios.get(`/sentences?category_id=${selectedCategory}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const random = res.data[Math.floor(Math.random() * res.data.length)];
        setSentence(random);
        setInput('');
        setStartTime(null);
        setFinished(false);
      })
      .catch(err => alert('문장 로드 실패'));
  };

  // 입력 감지
  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setInput(value);
    if (value === sentence.text) {
      setFinished(true);
      handleFinish();
    }
  };

  // 연습 완료 시 기록 저장
  const handleFinish = () => {
    const endTime = Date.now();
    const timeMinutes = (endTime - startTime) / 1000 / 60;
    const wordCount = sentence.text.split(' ').length;
    const wpm = (wordCount / timeMinutes).toFixed(2);
    const mistakes = countMistakes(sentence.text, input);
    const accuracy = (((sentence.text.length - mistakes) / sentence.text.length) * 100).toFixed(2);

    axios.post('/records', {
      sentence_id: sentence.id,
      wpm: parseFloat(wpm),
      accuracy: parseFloat(accuracy),
      total_keys: input.length,
      mistake_count: mistakes
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => alert(`기록 저장 성공: WPM ${wpm}, 정확도 ${accuracy}%`))
      .catch(err => alert('기록 저장 실패'));
  };

  // 오타 수 계산
  const countMistakes = (target, input) => {
    let mistakes = 0;
    for (let i = 0; i < target.length; i++) {
      if (input[i] !== target[i]) mistakes++;
    }
    return mistakes;
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">타자 연습</h2>

      <div className="flex mb-4">
        <select className="border p-2 mr-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">카테고리 선택</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button className="bg-blue-500 text-white p-2" onClick={loadSentence}>문장 불러오기</button>
      </div>

      {sentence && (
        <div className="w-2/3 border p-4 mb-4 text-lg">{sentence.text}</div>
      )}

      {sentence && (
        <textarea
          className="w-2/3 h-24 border p-4"
          value={input}
          onChange={handleChange}
          disabled={finished}
        />
      )}
    </div>
  );
};

export default TypingPage;

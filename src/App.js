import React from 'react'; //import React Component
import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from './src/pages/MainPage';
import { Signup } from './src/pages/Signup';
import { Signin } from './src/pages/Signin';
import { Account } from './src/pages/Account';
import { MakePost } from './src/pages/MakePost';
import { ReviseAccount } from './src/pages/ReviseAccount';
import { Diversity } from './src/pages/Diversity'
import { PostDetail } from './src/pages/PostDetail';
import { Festival } from './src/pages/Festival';
import { OtherUserAccount } from './src/pages/OtherUserAccount';
import { Qa } from './src/pages/Qa';
import { Error } from './src/pages/Error';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="main" />} />
        <Route path="*" element={<Navigate to="error" />} />
        <Route path="error" element={<Error />} />
        <Route path="main" element={<MainPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="account" element={<Account />} />
        <Route path="makePost" element={<MakePost />} />
        <Route path="reviseAccount" element={<ReviseAccount />} />
        <Route path="diversity" element={<Diversity />} />
        <Route path="festival" element={<Festival />} />
        <Route path="qa" element={<Qa />} />
        <Route path="/postDetail/:post" element={<PostDetail />} />
        <Route path="/otherUserAccount/:user" element={<OtherUserAccount />} />
      </Routes>
    </div>
  );
}

export default App;

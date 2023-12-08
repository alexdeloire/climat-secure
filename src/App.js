import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Postes from './views/Postes';
import Game from './views/Game';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import MesPostes from './views/MesPostes';
import EditPost from './views/EditPost';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 'User',
  'Admin': 'Admin',
  'Super': 'Super'
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route path="postes" element={<Postes />} />
          <Route path="game" element={<Game />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="mes-postes" element={<MesPostes />} />
              <Route path="edit-post/:post_id" element={<EditPost />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Super]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>


            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Super, ROLES.Admin]} />}>
              <Route path="lounge" element={<Lounge />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
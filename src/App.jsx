<<<<<<< HEAD
import React from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Message from './pages/Message';
import Setting from './pages/Setting';
import Notification from './pages/Notification';
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />}> </Route>
      <Route path="/login" element={<Login />}> </Route>
      <Route path="/pages" element={<RootLayout />}>
          <Route path="home" element={<Home />}> </Route>
          <Route path="message" element={<Message />}> </Route>
          <Route path="setting" element={<Setting />}> </Route>
          <Route path="notification" element={<Notification />}> </Route>
      </Route>
    </>
  )
);


const app = () => {
  return (
    <RouterProvider router={router} />
  )
}

=======
import React from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Message from './pages/Message';
import Setting from './pages/Setting';
import Notification from './pages/Notification';
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />}> </Route>
      <Route path="/login" element={<Login />}> </Route>
      <Route path="/pages" element={<RootLayout />}>
          <Route path="home" element={<Home />}> </Route>
          <Route path="message" element={<Message />}> </Route>
          <Route path="setting" element={<Setting />}> </Route>
          <Route path="notification" element={<Notification />}> </Route>
      </Route>
    </>
  )
);


const app = () => {
  return (
    <RouterProvider router={router} />
  )
}

>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
export default app
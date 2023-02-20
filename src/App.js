import React from "react";
import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import "./App.css";
import "./assets//fonts/font.css";
import { EditProfile } from "./pages/EditProfile";
import WelcomePage from "./pages/WelcomePage";
import Profile from "./pages/UserProfile";
import EditListing from "./pages/EditListing";

import HomePage from "./pages/HomePage";
import ViewListing from "./pages/ViewListing";
import UserIndividualListing from "./pages/UserIndividualListing";
import CreateListing from "./pages/CreateListing";
import ListingDisplay from "./pages/ListingPage";
import CreateListingPage from "./pages/CreateListing";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  let { user_id } = useParams();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path=":user_id">
          <Route path="homepage" element={<HomePage />} />
          {/* listings page URL to be confirmed */}
          <Route path="listings/:listing_id" element={<ViewListing />} />
          <Route path="userlistings/:listing_id" element={<UserIndividualListing />} />
          <Route path="createlisting" element={<CreateListing />} />
          <Route path="settings" element={<EditProfile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editlisting/:listing_id" element={<EditListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

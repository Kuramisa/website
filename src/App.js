import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { AuthProvider } from "./providers/AuthProvider";

import "./assets/less/App.less";

import Home from "./pages/Home";
import GuildPage from "./pages/GuildPage";
import Me from "./pages/Me";

import Login from "./components/Login";
import Navigation from "./components/Navigation";

import { ProgressSpinner } from "primereact/progressspinner";

import { FetchClientUser } from "./gql/queries/client";

const App = () => {
    console.log("%cStop!", "color: red; font-size: 40px; font-weight: bold;");
    console.log(
        "%cDo not enter any scripts or some sort of \"hack\" here, it will most likely compromise your account and steal your information",
        "font-size: 30px; font-weight: bold;"
    );
    console.log(
        "%cThis browser feature is intended for developers only",
        "font-size: 30px; font-weight: bold;"
    );

    const { loading, error, data: { clientUser: bot }= {}} = useQuery(FetchClientUser, { pollInterval: 100000 });

    if(loading || error) return (
      <div className="flex align-items-center justify-content-center">
          {loading && (
            <ProgressSpinner style={{ width: "50px", height: "50px"}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
      )}
          {error && (
            <h1>Bot seems to be offline</h1>
      )}
      </div>
    );

    return (
        <Router>
            <AuthProvider>
                <Navigation bot={bot} />
                <Routes>
                    <Route caseSensitive element={<Home />} path="/" />
                    <Route caseSensitive element={<Me />} path="/@me" />
                    <Route caseSensitive path="guild">
                        <Route path=":guildId" element={<GuildPage bot={bot} />} />
                    </Route>
                    <Route element={<Login />} path="/login" />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;

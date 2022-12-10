import { useContext } from "react";

import { AuthContext } from "../providers/AuthProvider";
import Servers from "../components/Servers";

const Home = () => {
    const { auth } = useContext(AuthContext);
    return <Servers auth={auth} />;
};

export default Home;

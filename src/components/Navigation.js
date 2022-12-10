import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import PropTypes from "prop-types";

import "../assets/less/Navigation.less";

import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";

import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";

const Navigation = ({ bot }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const items = [
        {
            label: "Home",
            command: () => navigate("/"),
        },
    ];


    const logo = <Avatar image={bot.avatarURL} size="large" shape="circle" className="shadow-8" />;

    const authLink =
        process.env.NODE_ENV === "production"
            ? "https://discord.com/api/oauth2/authorize?client_id=969414951292788766&redirect_uri=https%3A%2F%2Fkuramisa.com%2Flogin&response_type=code&scope=identify%20guilds"
            : "https://discord.com/api/oauth2/authorize?client_id=969414951292788766&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds";

    if (!auth)
        return (
            <Menubar
                className="top-nav"
                start={logo}
                model={items}
                end={
                <>
                    <Button
                        label="Invite"
                        className="p-button-danger"
                        onClick={() => window.open("https://discord.com/oauth2/authorize?client_id=969414951292788766&permissions=1634569944311&scope=bot", "_blank")}
                      style={{ marginRight: ".25em" }}
                    />
                    <Button
                        label="Login"
                        className="p-button-success"
                        onClick={() => window.open(authLink, "_self")}
                    />
                </>
                }
            />
        );

    return (
        <Menubar end={
            <>
                <Button
                  label="Invite"
                  className="p-button-rounded p-button-danger p-button"
                  onClick={() => window.open("https://discord.com/oauth2/authorize?client_id=969414951292788766&permissions=1634569944311&scope=bot", "_blank")}
                  style={{ marginRight: ".25em" }}
                />
            <ProfileButton />
            </>
        } className="top-nav" start={logo} model={items} />
    );
};

Navigation.propTypes = {
    bot: PropTypes.object,
};
export default Navigation;

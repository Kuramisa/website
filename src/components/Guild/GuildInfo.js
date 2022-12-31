import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const GuildInfo = ({ guild }) => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    return (
        <div className="guild">
            <div className="guild-content">
                <div className="mb-3">
                    <img
                        src={guild.iconURL}
                        className="guild-icon"
                        alt="Guild Icon"
                        onClick={() => navigate(`/guild/${guild.id}`)}
                    />
                </div>
                <div>
                    <h3 className="mb-1">{guild.name}</h3>
                    <h6 className="mb-3">
                        {guild.members.length} Members
                    </h6>
                </div>
                {guild.promoted &&
                    (guild.members.includes(auth?.id) ? (
                        <Button
                            className="p-button-danger"
                            label="Already joined"
                            disabled
                        />
                    ) : (
                        <Button
                            className="p-button-success"
                            label="Join the server"
                            onClick={() =>
                                window.open(guild.inviteURL, "_blank")
                            }
                        />
                    ))}
            </div>
        </div>
    );
};

GuildInfo.propTypes = {
    guild: PropTypes.object
};

export default GuildInfo;

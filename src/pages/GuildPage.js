import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";

import { Splitter, SplitterPanel } from "primereact/splitter";

import { AuthContext } from "../providers/AuthProvider";

import { FetchGuild } from "../gql/queries/guilds";

import GuildInfoPage from "../components/Guild/GuildInfoPage";
import MemberTable from "../components/Guild/MemberTable";

const GuildPage = ({ bot }) => {
    const { auth } = useContext(AuthContext);
    const { guildId } = useParams();
    const { loading, data: { guild } = {} } = useQuery(FetchGuild, {
        variables: { guildId, fetchDb: true }
    });

    if (loading) return <></>;

    if (!guild) return <Navigate to="/" replace={true} />;

    return auth &&
    bot &&
    guild.members.includes(bot.id) &&
    guild.members.includes(auth.id) ? (
        <div className="flex align-items-center justify-content-center">
            <Splitter layout="horizontal">
                <SplitterPanel minSize={20} size={30}>
                    <GuildInfoPage guild={guild} />
                </SplitterPanel>
                <SplitterPanel minSize={70} size={80}>
                    <MemberTable auth={auth} guild={guild} />
                </SplitterPanel>
            </Splitter>
        </div>
    ) : (
        <div className="flex align-items-center justify-content-center">
            <Splitter layout="horizontal" className="w-7">
                <SplitterPanel>
                    <GuildInfoPage guild={guild} />
                </SplitterPanel>
            </Splitter>
        </div>
    );
};

GuildPage.propTypes = {
    bot: PropTypes.object
};

export default GuildPage;

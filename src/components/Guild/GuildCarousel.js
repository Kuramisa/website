import { useQuery } from "@apollo/client";

import "../../assets/less/GuildCarousel.less";

import { Carousel } from "primereact/carousel";
import { ProgressSpinner } from "primereact/progressspinner";

import { FetchGuilds } from "../../gql/queries/guilds";

import GuildInfo from "./GuildInfo";

const GuildCarousel = () => {
    const { loading, data: { guilds } = {} } = useQuery(FetchGuilds, { variables: { fetchDb: true } });
    const guildTemplate = (guild) => <GuildInfo guild={guild} />;

    const breakpoints = [
        {
            breakpoint: "1800px",
            numVisible: 1,
            numScroll: 1
        }
    ];

    return loading && !guilds ? (
        <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
        />
    ) : (
        <Carousel
            value={guilds}
            itemTemplate={guildTemplate}
            numVisible={3}
            numScroll={1}
            responsiveOptions={breakpoints}
        />
    );
};

export default GuildCarousel;

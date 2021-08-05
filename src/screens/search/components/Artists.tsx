import { getResultFromSearch } from "api/requests";
import { CardContainer, CardMedia, Spacer, Spinner } from "components-lib";
import { useInfiniteScroll } from "hooks";
import React, { useEffect, useState } from "react";
import avatar from "assets/avatar.png";
import { useSearch } from "../provider";
import { Storage } from 'storage'
import { Grid } from "@material-ui/core";

interface IArtist {
    id: string;
    type: string;
    images: { url: string }[];
    name: string;
}

export function Artists() {
    const { result, query }: any = useSearch();
    const [artists, setArtists] = useState<any>([]);
    const [offset, setOffset] = useState<number>(5);
    const [total, setTotal] = useState<number>(10);
    const [isFetching, setIsFetching] = useInfiniteScroll(moreData);

    async function moreData() {
        if (artists.length < total) {
            const response = await getResultFromSearch(Storage.getItem("query"), 10, offset);
            setArtists([...artists, ...response.artists.items]);
            setOffset(offset + 10);
            setIsFetching(false);
            if (isFetching) {
                return <Spinner />;
            }
        }
    }

    useEffect(() => {
        async function persistData() {
            if (!result) {
                const query = Storage.getItem("query")
                setOffset(offset + 10);
                const response = await getResultFromSearch(query, 10, offset)
                setTotal(response.artists.total)
                setArtists(response.artists.items)
            }
        }
        persistData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (result) {
            setTotal(result.artists.total)
            result && setArtists(result.artists.items);
            Storage.setItem("query", query)
            setOffset(offset + 10);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            Storage.removeItem("query")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkForData = () => {
        if (result && artists.length === 0) {
            return result && artists
        }
        return artists
    }

    return (
        <>
            <CardContainer title={Storage.getItem("query") ? `All artists for “${Storage.getItem("query")}”` : ""}>
                {checkForData().map((artist: IArtist) => (
                    <Grid key={artist.id} item>
                        <CardMedia
                            path={`../../artists/${artist.id}`}
                            image={
                                artist.images.length > 0 ? artist.images[0].url : avatar
                            }
                            name={artist.name}
                            description={artist.type}
                            withFlex={false}
                            height={274}
                        />
                    </Grid>
                ))}
            </CardContainer>
            <Spacer height={150} />
        </>
    )
}



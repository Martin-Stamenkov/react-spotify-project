import { getResultFromSearch } from "api/requests";
import { Button, CardContainer, Spacer, Spinner, Table } from "components-lib";
import { useInfiniteScroll } from "hooks";
import React, { useEffect, useState } from "react";
import { millisecondsConverter } from "utils";
import { useSearch } from "../provider";
import { Storage } from 'storage'

interface ITrack {
  id: string;
  album: {
    id: string;
    name: string;
    images: { url: string }[];
  };
  name: string;
  duration_ms: string;
}

export function Songs() {
  const { result, query }: any = useSearch();
  const [songs, setSongs] = useState<any>([]);
  const [offset, setOffset] = useState<number>(5);
  const [total, setTotal] = useState<number>(10);
  const [isFetching, setIsFetching] = useInfiniteScroll(moreData);

  async function moreData() {
    if (songs.length < total) {
      const response = await getResultFromSearch(Storage.getItem("query"), 10, offset);
      setSongs([...songs, ...response.tracks.items]);
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
        setTotal(response.tracks.total)
        setSongs(response.tracks.items)
      }
    }
    persistData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (result) {
      setTotal(result.tracks.total)
      result && setSongs(result.tracks.items);
      Storage.setItem("query", query)
      setOffset(offset + 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      Storage.removeItem("query");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkForData = () => {
    if (result && songs.length === 0) {
      return result && songs
    }
    return songs
  }

  return (
    <>
      <CardContainer title={`All songs for “${Storage.getItem("query")}”`}>
        <Table.Container>
          {checkForData().map((track: ITrack) => (
            <Table.Row key={track.id} hover>
              <Table.Cell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {checkForData().indexOf(track) + 1}
                  <img
                    style={{
                      width: 40,
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                    alt="avatar"
                    src={track.album?.images[2].url}
                  />
                  {track.name}
                </div>
              </Table.Cell>
              <Table.Cell align="center">
                <Button.Link to={`/album/${track.album.id}`}>
                  {track?.album.name}
                </Button.Link>
              </Table.Cell>
              <Table.Cell align="right">
                {millisecondsConverter(track.duration_ms)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Container>
      </CardContainer>
      <Spacer height={150} />
    </>
  )
}



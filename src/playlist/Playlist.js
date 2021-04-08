import React, { useEffect } from "react";
import { Table, About, Spinner, Button, Spacer } from "components-lib";
import { useParams } from "react-router-dom";
import { getPlaylist } from "./api/requests";
import { format, parseISO } from "date-fns";
import { millisecondsConverter } from "utils";
import { useQuery } from "react-query";
import avatar from "assets/music_placeholder.png";


export function Playlist() {
  const { id } = useParams();
  const { data, status } = useQuery(
    "playlist",
    async () => await getPlaylist(id)
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          {data && (
            <>
              <About
                backgroundColor={data.primary_color}
                type={data.type}
                avatar={data.images.length > 0 ? data.images[0].url : avatar}
                name={data.name}
                description={data.description}
                additionalInfo={`${data.owner.display_name} \n\u2022 Followers ${data.followers.total} \n\u2022 ${data.tracks.items.length} songs`}
              />
              <>
              {data.tracks.items.length === 0 ? null :
              
                <Table.Container withBottomHeight withDateAdded>
                  {data.tracks.items.map((item, index) => (
                    <Table.Row key={index} hover>
                      <Table.Cell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {data.tracks.items.indexOf(item) + 1}
                          <img
                            style={{
                              width: 40,
                              marginRight: 10,
                              marginLeft: 10,
                            }}
                            alt="avatar"
                            src={item.track?.album.images[2].url}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {item.track?.name}
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              {item.track?.artists.map((x, index) => (
                                <div key={index}>
                                  <Button.Link to={`/artists/${x.id}`}>
                                    {`${"\n\u2022"} ${x.name}`}
                                  </Button.Link>
                                  <Spacer width={3} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell align="right">
                        <Button.Link to={`/album/${item.track?.album.id}`}>
                          {item.track?.album.name}
                        </Button.Link>
                      </Table.Cell>
                      <Table.Cell align="right">
                        {format(parseISO(item.added_at), "LLL dd, yyyy")}
                      </Table.Cell>
                      <Table.Cell align="right">
                        {millisecondsConverter(item.track?.duration_ms)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Container>
                }
              </>
            </>
          )}
        </>
      )}
    </>
  );
}

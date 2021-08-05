import { Box, Grid } from "@material-ui/core";
import {
    Button,
    Spacer,
    Table,
    Typography,
} from "components-lib";
import { format, parseISO } from "date-fns";
import React from "react";
import { useHistory } from "react-router-dom";
import { Colors } from "styles";
import { AddAndRemoveEpisodes, truncate } from "utils";

interface IEpisode {
    id: string;
    name: string;
    description: string;
    images: string;
    release_date: string;
    duration_ms: number;
}

export function Episode({ description, duration_ms, id, images, name, release_date }: IEpisode) {
    const history = useHistory()

    return (
        <Table.Row onClick={() => history.push(`/episode/${id}`)} key={id} hover>
            <Table.Cell>
                <Grid style={{ display: "flex", alignItems: "center" }}>
                    <img
                        style={{
                            marginRight: 10,
                            marginLeft: 10,
                            width: 150,
                            borderRadius: 10,
                        }}
                        alt="avatar"
                        src={images}
                    />
                    <Box width="100%">
                        <Grid
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <Typography customStyle={{ fontWeight: 900 }}>
                                {name}
                            </Typography>
                            <Spacer height={20} />
                            <Typography
                                customStyle={{ fontSize: 14, color: Colors.Grey02 }}
                            >
                                {truncate(description, {
                                    length: 175,
                                    separator: " ",
                                })}
                            </Typography>
                        </Grid>
                        <Box
                            margin="15px"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                            >
                                <Button.Play
                                    buttonColor={Colors.Black01}
                                    buttonBackgroundColor={Colors.White}
                                    position="inherit"
                                />
                                <Typography
                                    customStyle={{
                                        fontSize: 14,
                                        color: Colors.Grey02,
                                        marginLeft: 10,
                                    }}
                                >
                                    {format(parseISO(release_date), "LLL dd")}
                                    {"\n\u2022"} {"\n"}
                                    {`${Math.round(duration_ms / 60000)} min`}
                                </Typography>
                            </Box>
                            <AddAndRemoveEpisodes
                                id={id}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Table.Cell>
        </Table.Row>
    );
}

import React from "react";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";

export function ErrorPrompt() {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()

    return (<> {enqueueSnackbar("Oops something went wrong", { variant: "error" })}{setTimeout(() => {
        history.goBack()
    }, 2000)}</>)
}


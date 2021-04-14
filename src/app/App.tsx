import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router as Routes } from "./Router";
import { Router } from "react-router";
import { Layouts } from "components-lib";
import { ProfileProvider } from "user";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
            <Router history={history}>
              <ProfileProvider>
                <Layouts>
                  <Routes />
                </Layouts>
              </ProfileProvider>
            </Router>
          </SnackbarProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;

import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import "./App.css"

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { PostCreate, PostEdit, PostList, PostShow } from "pages";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <Refine
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              resources={[
                {
                  name: "posts",
                  list: PostList,
                  show: PostShow,
                  create: PostCreate,
                  edit: PostEdit,
                  canDelete: true
                }
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route path="/posts" element={<PostList/>}/>
                <Route path="/posts/show/:id" element={<PostShow/>}/>
                <Route path="/posts/edit/:id" element={<PostEdit/>}/>
                <Route path="/posts/create" element={<PostCreate/>}/>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </ColorModeContextProvider>
        </RefineKbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

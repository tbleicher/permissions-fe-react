import React from "react";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { theme } from "@chakra-ui/core";
import { TabsContainer } from "./components/TabsContainer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "60%", minWidth: 800 }}>
          <TabsContainer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

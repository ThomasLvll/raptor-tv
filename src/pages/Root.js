import { Outlet, Link } from "react-router-dom";
import { Button, useColorMode, ColorModeScript } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function Root() {

  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <>
      <div>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Button
          style={{ position: "absolute", right: 10, top: 10 }}
          onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
        </Button>
      </div>
      <div id="sidebar">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/"><img
            style={{ width: 200, borderRadius: 30, marginTop:"2rem", border: "2px solid white" }}
            src="/img/RaptorJesus.jpg"
            alt="raptor"
          />
          </Link>
        </div>
        <h1>Raptor TV</h1>
      </div>
      <Outlet/>
    </>
  );
}


import { Flex } from "@chakra-ui/react";
import SiteNavbar from "./generalComponents/SiteNavbar";
import Body from "./body/Body";
import SiteFooter from "./generalComponents/SiteFooter";

function App(): JSX.Element {
  return (
    <Flex id="AppFlex" direction="column" minHeight={"auto"}>
      <SiteNavbar />
      <Body />
      <SiteFooter />
    </Flex>
  );
}

export default App;

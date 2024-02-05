import { Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import BadgeGeneratorPage from "./BadgeGeneratorPage";

export default function Body(): JSX.Element {
  return (
    <Flex id="Body">
      <Routes>
        <Route path="/" element={<BadgeGeneratorPage />} />
        <Route path="*" element={<BadgeGeneratorPage />} />
      </Routes>
    </Flex>
  );
}

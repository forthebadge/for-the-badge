import { Flex, Box, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function SiteFooter() {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      bgColor="lightgray"
      position="relative"
      width="100%"
      zIndex={1}
    >
      <Box
        height="150px"
        bg={useColorModeValue("black", "black")}
        color={useColorModeValue("white", "white")}
      >
        <HStack justifyContent="center" alignItems="center" mt="70px">
          <Text fontWeight={"extrabold"} fontSize="9" letterSpacing="2px">
            2024 FOR THE BADGE™, LLC
          </Text>
        </HStack>
        <HStack justifyContent="center" alignItems="center" mt="10px">
          <a
            href="https://github.com/forthebadge/for-the-badge/blob/master/COPYING"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text fontWeight={"extrabold"} fontSize="9" letterSpacing="2px">
              {t("footer.license")}
            </Text>
          </a>
        </HStack>
      </Box>
    </Flex>
  );
}

export default SiteFooter;

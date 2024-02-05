import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  ButtonGroup,
  Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaArrowRight, FaGithub, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

function Navbar() {
  const { t } = useTranslation();

  const lightModeLogoUrl = "https://forthebadge.com/images/logo_black.svg";
  const darkModeLogoUrl = "https://forthebadge.com/images/logo.svg";

  const { colorMode, setColorMode } = useColorMode();

  const toggleColorMode = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };

  const handleLanguageChange = (language: string | undefined) => {
    changeLanguage(language)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Language change error:", error);
      });
  };

  const logoUrl = useColorModeValue(lightModeLogoUrl, darkModeLogoUrl);

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "zh", label: "Chinese (Simplified)" },
    { value: "ar", label: "Arabic" },
    { value: "hi", label: "Hindi" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
  ];

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "black")}
        color={useColorModeValue("black", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        ></Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image
            src={logoUrl}
            alt="Logo"
            maxH={{ base: "auto", md: "80px" }}
            maxW={{ base: "auto", md: "200px" }}
          />
        </Flex>
        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"}>
          <Button
            as={Link}
            href="https://forthebadge.com"
            isExternal
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            leftIcon={<FaArrowRight />}
          >
            {t("navbar.credit")}
          </Button>
          <Button
            as={Link}
            href="https://github.com/forthebadge/for-the-badge"
            isExternal
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            leftIcon={<FaGithub />}
          >
            {t("navbar.contribute")}
          </Button>

          <ButtonGroup isAttached>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FaGlobe />}
                aria-label="Select language"
              />
              <MenuList>
                {languageOptions.map((language) => (
                  <MenuItem
                    key={language.value}
                    onClick={() => handleLanguageChange(language.value)}
                  >
                    {language.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <IconButton
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle theme"
            />
          </ButtonGroup>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Navbar;

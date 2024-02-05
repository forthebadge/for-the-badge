import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  Circle,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Icon,
  ButtonGroup,
  useToast,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { SketchPicker } from "react-color";
import { FaCode, FaDownload, FaShareSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function BadgeGeneratorPage(): JSX.Element {
  const { t } = useTranslation();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const [isCopyLoading, setIsCopyLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [isShareLoading, setIsShareLoading] = useState(false);

  const [panels, setPanels] = useState(2);

  const primaryTextRef = useRef<SVGTextElement | null>(null);
  const secondaryTextRef = useRef<SVGTextElement | null>(null);
  const tertiaryTextRef = useRef<SVGTextElement | null>(null);

  const [primaryWidth, setPrimaryWidth] = useState(64.3);
  const [secondaryWidth, setSecondaryWidth] = useState(92.5);
  const [tertiaryWidth, setTertiaryWidth] = useState(80);

  const [primaryBGColor, setPrimaryBGColor] = React.useState("#31C4F3");
  const [primaryTextColor, setPrimaryTextColor] = React.useState("#FFFFFF");
  const [secondaryBGColor, setSecondaryBGColor] = React.useState("#389AD5");
  const [secondaryTextColor, setSecondaryTextColor] = React.useState("#FFFFFF");
  const [tertiaryBGColor, setTertiaryBGColor] = React.useState("#2674A4");
  const [tertiaryTextColor, setTertiaryTextColor] = React.useState("#FFFFFF");
  const [primaryLabel, setPrimaryLabel] = React.useState("");
  const [secondaryLabel, setSecondaryLabel] = React.useState("");
  const [tertiaryLabel, setTertiaryLabel] = React.useState("");

  useEffect(() => {
    if (primaryTextRef.current && secondaryTextRef.current) {
      setPrimaryWidth(primaryTextRef.current.getBBox().width + 20);
      setSecondaryWidth(secondaryTextRef.current.getBBox().width + 20);
      if (panels === 3 && tertiaryTextRef.current) {
        setTertiaryWidth(tertiaryTextRef.current.getBBox().width + 20);
      }
    }
  }, [primaryLabel, secondaryLabel, tertiaryLabel]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setPrimaryBGColor(params.get("primaryBGColor") ?? primaryBGColor);
    setPrimaryTextColor(params.get("primaryTextColor") ?? primaryTextColor);
    setSecondaryBGColor(params.get("secondaryBGColor") ?? secondaryBGColor);
    setSecondaryTextColor(
      params.get("secondaryTextColor") ?? secondaryTextColor
    );
    setTertiaryBGColor(params.get("tertiaryBGColor") ?? tertiaryBGColor);
    setTertiaryTextColor(params.get("tertiaryTextColor") ?? tertiaryTextColor);
    setPrimaryLabel(params.get("primaryLabel") ?? primaryLabel);
    setSecondaryLabel(params.get("secondaryLabel") ?? secondaryLabel);
    setTertiaryLabel(params.get("tertiaryLabel") ?? tertiaryLabel);

    const panelCount = params.get("panels");
    if (panelCount) {
      setPanels(Number(panelCount));
    }
  }, []);

  const svgRef = useRef(null);
  const toast = useToast();

  const downloadSVG = () => {
    setIsDownloadLoading(true);
    if (!svgRef.current) return;

    const labels = [primaryLabel, secondaryLabel, tertiaryLabel]
      .map((label) => label.trim())
      .filter((label) => label !== "")
      .map((label) => label.toLowerCase().replace(/\s+/g, "-"));

    const filename = labels.join("-") + ".svg";

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsDownloadLoading(false);
  };

  const copyMarkdown = () => {
    setIsCopyLoading(true);
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.current);
    const base64 = btoa(unescape(encodeURIComponent(svgStr)));
    const md = `[![forthebadge](data:image/svg+xml;base64,${base64})](https://forthebadge.com)`;
    navigator.clipboard.writeText(md).then(
      () => {
        toast({
          title: t("toast.markdownCopied"),
          status: "success",
          duration: 3000,
          position: "top",
        });
      },
      (err) => {
        console.error("Could not copy markdown: ", err);
      }
    );
    setIsCopyLoading(false);
  };

  const generateShareLink = () => {
    const params = new URLSearchParams({
      primaryBGColor,
      primaryTextColor,
      secondaryBGColor,
      secondaryTextColor,
      tertiaryBGColor,
      tertiaryTextColor,
      primaryLabel,
      secondaryLabel,
      tertiaryLabel,
      panels: panels.toString(),
    });

    return `https://forthebadge.com?${params.toString()}#/generator`;
  };

  const copyShareLink = () => {
    setIsShareLoading(true);
    const link = generateShareLink();
    navigator.clipboard.writeText(link).then(
      () => {
        toast({
          title: t("toast.shareLinkCopied"),
          status: "success",
          duration: 3000,
          position: "top",
        });
      },
      (err) => {
        console.error("Could not copy link: ", err);
      }
    );
    setIsShareLoading(false);
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      p={4}
    >
      <Flex mb={4}>
        <Button
          size="sm"
          onClick={() => {
            setPanels(2);
            setTertiaryLabel("");
          }}
        >
          {t("badgeGenerator.twoPanels")}
        </Button>
        <Button size="sm" ml={2} onClick={() => setPanels(3)}>
          {t("badgeGenerator.threePanels")}
        </Button>
      </Flex>

      <Box
        display="flex"
        width="70%"
        borderRadius="md"
        p={5}
        shadow="md"
        position="relative"
        bg={bgColor}
      >
        <Flex
          direction="column"
          width="50%"
          pr={2}
          alignItems="center"
          justifyContent="center"
        >
          <Flex direction="column" alignItems="flex-start">
            <Text fontSize="xl" mb={2} fontWeight="bold">
              {t("badgeGenerator.primary")}
            </Text>
            <Input
              placeholder={t("badgeGenerator.sampleText")}
              mb={2}
              value={primaryLabel}
              onChange={(e) => setPrimaryLabel(e.target.value)}
            />
            <Flex justifyContent="space-between" mt={2}>
              <Flex align="center" mr={4}>
                <Popover>
                  <PopoverTrigger>
                    <Circle
                      size="30px"
                      backgroundColor={primaryBGColor}
                      border="2px solid black"
                      mr={2}
                      cursor="pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent width="220px">
                    <SketchPicker
                      color={primaryBGColor}
                      onChangeComplete={(color) => setPrimaryBGColor(color.hex)}
                    />
                  </PopoverContent>
                </Popover>
                <Text ml={2}>{t("badgeGenerator.backgroundColor")}</Text>
              </Flex>
              <Flex align="center">
                <Popover>
                  <PopoverTrigger>
                    <Circle
                      size="30px"
                      backgroundColor={primaryTextColor}
                      border="2px solid black"
                      mr={2}
                      cursor="pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent width="220px">
                    <SketchPicker
                      color={primaryTextColor}
                      onChangeComplete={(color) =>
                        setPrimaryTextColor(color.hex)
                      }
                    />
                  </PopoverContent>
                </Popover>
                <Text ml={2}>{t("badgeGenerator.textColor")}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          direction="column"
          width="50%"
          pl={2}
          alignItems="center"
          justifyContent="center"
        >
          <Flex direction="column" alignItems="flex-start">
            <Text fontSize="xl" mb={2} fontWeight="bold">
              {t("badgeGenerator.secondary")}
            </Text>
            <Input
              placeholder={t("badgeGenerator.sampleText")}
              mb={2}
              value={secondaryLabel}
              onChange={(e) => setSecondaryLabel(e.target.value)}
            />
            <Flex justifyContent="space-between" mt={2}>
              <Flex align="center" mr={4}>
                <Popover>
                  <PopoverTrigger>
                    <Circle
                      size="30px"
                      backgroundColor={secondaryBGColor}
                      border="2px solid black"
                      mr={2}
                      cursor="pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent width="220px">
                    <SketchPicker
                      color={secondaryBGColor}
                      onChangeComplete={(color) =>
                        setSecondaryBGColor(color.hex)
                      }
                    />
                  </PopoverContent>
                </Popover>
                <Text ml={2}>{t("badgeGenerator.backgroundColor")}</Text>
              </Flex>
              <Flex align="center">
                <Popover>
                  <PopoverTrigger>
                    <Circle
                      size="30px"
                      backgroundColor={secondaryTextColor}
                      border="2px solid black"
                      mr={2}
                      cursor="pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent width="220px">
                    <SketchPicker
                      color={secondaryTextColor}
                      onChangeComplete={(color) =>
                        setSecondaryTextColor(color.hex)
                      }
                    />
                  </PopoverContent>
                </Popover>
                <Text ml={2}>{t("badgeGenerator.textColor")}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {panels === 3 && (
          <Flex
            direction="column"
            width="50%"
            pl={2}
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column" alignItems="flex-start">
              <Text fontSize="xl" mb={2} fontWeight="bold">
                {t("badgeGenerator.tertiary")}
              </Text>
              <Input
                placeholder={t("badgeGenerator.sampleText")}
                mb={2}
                value={tertiaryLabel}
                onChange={(e) => setTertiaryLabel(e.target.value)}
              />
              <Flex justifyContent="space-between" mt={2}>
                <Flex align="center" mr={4}>
                  <Popover>
                    <PopoverTrigger>
                      <Circle
                        size="30px"
                        backgroundColor={tertiaryBGColor}
                        border="2px solid black"
                        mr={2}
                        cursor="pointer"
                      />
                    </PopoverTrigger>
                    <PopoverContent width="220px">
                      <SketchPicker
                        color={tertiaryBGColor}
                        onChangeComplete={(color) =>
                          setTertiaryBGColor(color.hex)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <Text ml={2}>{t("badgeGenerator.backgroundColor")}</Text>
                </Flex>
                <Flex align="center">
                  <Popover>
                    <PopoverTrigger>
                      <Circle
                        size="30px"
                        backgroundColor={tertiaryTextColor}
                        border="2px solid black"
                        mr={2}
                        cursor="pointer"
                      />
                    </PopoverTrigger>
                    <PopoverContent width="220px">
                      <SketchPicker
                        color={tertiaryTextColor}
                        onChangeComplete={(color) =>
                          setTertiaryTextColor(color.hex)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <Text ml={2}>{t("badgeGenerator.textColor")}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Box>

      <Box
        width="70%"
        mt={4}
        p={4}
        borderRadius="md"
        shadow="lg"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg={bgColor}
      >
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          width={
            panels === 3
              ? primaryWidth + secondaryWidth + tertiaryWidth
              : primaryWidth + secondaryWidth
          }
          height="35"
          viewBox={`0 0 ${
            panels === 3
              ? primaryWidth + secondaryWidth + tertiaryWidth
              : primaryWidth + secondaryWidth
          } 35`}
        >
          <rect width={primaryWidth} height="35" fill={primaryBGColor} />
          <rect
            x={primaryWidth}
            width={secondaryWidth}
            height="35"
            fill={secondaryBGColor}
          />
          <text
            ref={primaryTextRef}
            x={primaryWidth / 2}
            y="17.5"
            fontSize="12"
            fontFamily="'Roboto', sans-serif"
            fill={primaryTextColor}
            textAnchor="middle"
            alignmentBaseline="middle"
            letterSpacing="2"
          >
            {(primaryLabel || "SAMPLE").toUpperCase()}
          </text>
          <text
            ref={secondaryTextRef}
            x={primaryWidth + secondaryWidth / 2}
            y="17.5"
            fontSize="12"
            fontFamily="'Montserrat', sans-serif"
            fill={secondaryTextColor}
            textAnchor="middle"
            fontWeight={900}
            alignmentBaseline="middle"
            letterSpacing="2"
          >
            {(secondaryLabel || "TEXT").toUpperCase()}
          </text>

          {panels === 3 && (
            <>
              <rect
                x={primaryWidth + secondaryWidth}
                width={tertiaryWidth}
                height="35"
                fill={tertiaryBGColor}
              />
              <text
                ref={tertiaryTextRef}
                x={primaryWidth + secondaryWidth + tertiaryWidth / 2}
                y="17.5"
                fontSize="12"
                fontFamily="'Roboto', sans-serif"
                fill={tertiaryTextColor}
                textAnchor="middle"
                fontWeight={500}
                alignmentBaseline="middle"
                letterSpacing="2"
              >
                {(tertiaryLabel || "LABEL").toUpperCase()}
              </text>
            </>
          )}
        </svg>
        <ButtonGroup isAttached spacing={4} mt={4}>
          <Button
            onClick={downloadSVG}
            data-action="download"
            isDisabled={isDownloadLoading}
            variant="outline"
            rightIcon={<Icon as={FaDownload} />}
          >
            {isDownloadLoading ? (
              <Spinner size="sm" />
            ) : (
              <>{t("badgeGenerator.downloadBadge")}</>
            )}
          </Button>
          <Button
            onClick={copyMarkdown}
            data-action="copy"
            isDisabled={isCopyLoading}
            variant="outline"
            rightIcon={<Icon as={FaCode} />}
          >
            {isCopyLoading ? (
              <Spinner size="sm" />
            ) : (
              <>{t("badgeGenerator.copyMarkdown")}</>
            )}
          </Button>
          <Button
            onClick={copyShareLink}
            data-action="share"
            isDisabled={isShareLoading}
            variant="outline"
            rightIcon={<Icon as={FaShareSquare} />}
          >
            {isShareLoading ? (
              <Spinner size="sm" />
            ) : (
              <>{t("badgeGenerator.share")}</>
            )}
          </Button>
        </ButtonGroup>
        <Text fontSize="2xs" mt={5}>
          {t("badgeGenerator.openSourceInfo")}
        </Text>
      </Box>
    </Flex>
  );
}

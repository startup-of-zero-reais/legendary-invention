import {
  Badge,
  Box,
  chakra,
  Flex,
  HStack,
  Text,
  useRangeSlider,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

type Props = {
  min: number;
  max: number;
  stepToNumber: number;
  stepToIndex: number;
  stepByNumber: number;
  defaultValue: [number, number];
  "aria-label": [string, string];
  minMaxValue: ([min, max]: [number, number]) => void;
};

const RangeSlider: React.FC<Props> = ({
  min,
  max,
  defaultValue,
  stepByNumber,
  stepToIndex,
  stepToNumber,
  minMaxValue,
  ...rest
}: Props) => {
  const {
    state,
    actions,
    getInnerTrackProps,
    getInputProps,
    getRootProps,
    getThumbProps,
    getTrackProps,
  } = useRangeSlider({ min, max, defaultValue, ...rest });

  const { onKeyDown: onThumbKeyDownFirstIndex, ...thumbPropsFirstIndex } =
    getThumbProps({
      index: 0,
    });

  const { onKeyDown: onThumbKeyDownSecondIndex, ...thumbPropsSecondIndex } =
    getThumbProps({
      index: 1,
    });

  const onKeyDownStepBy = (e: any, thumbIndex: number) => {
    if (e.code === "ArrowRight") actions.stepUp(thumbIndex, stepByNumber);
    else if (e.code === "ArrowLeft") actions.stepDown(thumbIndex, stepByNumber);
    else
      thumbIndex === 0
        ? onThumbKeyDownFirstIndex?.(e)
        : onThumbKeyDownSecondIndex?.(e);
  };

  useEffect(() => {
    minMaxValue([state.value[0], state.value[1]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.value]);

  return (
    <>
      <chakra.div
        mt={2}
        cursor="pointer"
        w={{ base: "96%", lg: "98%" }}
        ml={{ base: "2%", lg: "1%" }}
        {...getRootProps()}
      >
        <input {...getInputProps({ index: 0 })} hidden />
        <input {...getInputProps({ index: 1 })} hidden />

        <Box
          h="7px"
          bgColor="blue.100"
          borderRadius="full"
          {...getTrackProps()}
        >
          <Box
            h="7px"
            bgColor="blue.500"
            borderRadius="full"
            {...getInnerTrackProps()}
          />
        </Box>
        <Thumb
          thumbIndex={0}
          thumbProps={thumbPropsFirstIndex}
          onKeyDownStepBy={onKeyDownStepBy}
          bgColor="blue.500"
        />
        <Thumb
          thumbIndex={1}
          thumbProps={thumbPropsSecondIndex}
          onKeyDownStepBy={onKeyDownStepBy}
          bgColor="blue.500"
        />
      </chakra.div>
      <Flex justifyContent="space-between">
        <Text fontWeight="semibold" fontSize="12">
          {state.value[0].toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
        <Text fontWeight="semibold" fontSize="12">
          {state.value[1].toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </Flex>
    </>
  );
};

export default RangeSlider;

type PropsThumb = {
  thumbIndex: number;
  thumbProps: any;
  bgColor: string;
  onKeyDownStepBy: (
    e: React.KeyboardEvent<HTMLDivElement>,
    thumbIndex: number
  ) => void;
};

const Thumb = ({
  bgColor,
  thumbIndex,
  thumbProps,
  onKeyDownStepBy,
}: PropsThumb) => {
  return (
    <Box
      top="1%"
      boxSize={4}
      bgColor={bgColor}
      borderRadius="full"
      _focusVisible={{
        outline: "none",
      }}
      onKeyDown={(e) => onKeyDownStepBy(e, thumbIndex)}
      {...thumbProps}
    />
  );
};

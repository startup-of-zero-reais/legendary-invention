import {
  Radio,
  useRadioGroup,
  UseRadioGroupProps,
  Stack,
} from "@chakra-ui/react";

type Props = { options: string[] } & UseRadioGroupProps;

export default function CustomRadioGroup(props: Props) {
  const { options, ...rest } = props;

  const { getRootProps, getRadioProps, isDisabled } = useRadioGroup({
    ...rest,
  });

  const group = getRootProps();

  return (
    <Stack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <Radio key={value} {...radio}>
            {value}
          </Radio>
        );
      })}
    </Stack>
  );
}

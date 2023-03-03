import { Badge, Flex, Text, ThemeTypings } from "@chakra-ui/react";
import React from "react";

type Props = {
  techs: string[];
};

const Techs: React.FC<Props> = ({ techs }) => {
  return (
    <Flex
      w="full"
      flexDirection={"row"}
      alignItems={"baseline"}
      gap={2}
    >
      {techs.map((tech, key) => (
        <Badge py={0} px={1} key={key} colorScheme={getColor(tech)}>
          <Text fontWeight="medium" fontSize="12">
            {tech}
          </Text>
        </Badge>
      ))}
    </Flex>
  );
};

export default Techs;

type AvailableTechs =
 | 'Golang' 
 | 'React' 
 | 'Python'
 | 'React Native' 
 | 'Figma'
 | 'PHP'
 | 'Adobe XD'

const colorScheme = new Map<AvailableTechs, ThemeTypings["colorSchemes"]>([
  ['Golang', 'blue'],
  ['React', 'cyan'],
  ['Python', 'facebook'],
  ['React Native', 'purple'],
  ['Figma', 'red'],
  ['PHP', 'purple'],
  ['Adobe XD', 'pink'],
])

function getColor(tech: string) {
  return colorScheme.get(tech as any) || randomColor()
}

function randomColor() {
  const i = Math.floor(Math.random() * colorScheme.size)

  let counter = 0;
  for(const [_, color] of colorScheme) {
    if (i == counter) return color;
    counter++;
  }
}
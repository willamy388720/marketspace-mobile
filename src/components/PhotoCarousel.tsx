import { Dimensions } from "react-native";
import { HStack, Image, useTheme, VStack } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

import { PaginationItem } from "@components/PaginationItem";

const DATA = [
  {
    image:
      "https://img.freepik.com/free-photo/background-red-retro-model-tennis_1203-3993.jpg?w=826&t=st=1676140880~exp=1676141480~hmac=f3f2fecdc50c4488da7a482ed44187db0877f6bb12a822dc6a0b5c04772d161a",
  },
  {
    image:
      "https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg?w=826&t=st=1676140967~exp=1676141567~hmac=0c4ed522234f76a6e5381a127c770dfc44e5bd7da0a1882ec7f1ade6d7e24bf5",
  },
  {
    image:
      "https://img.freepik.com/free-psd/minimal-living-room-with-blue-sofa-carpet-interior-design-ideas_176382-1525.jpg?w=996&t=st=1676141019~exp=1676141619~hmac=9470cc5e118329a8472c0dea3192dc0bdf733c3c3eb1587cf8427ab3b5f9ca77",
  },
];

export function PhotoCarousel() {
  const { sizes } = useTheme();
  const progressValue = useSharedValue<number>(0);
  const width = Dimensions.get("window").width;

  return (
    <VStack width="full" height={72}>
      <Carousel
        width={width}
        height={sizes[72]}
        autoPlay={true}
        data={DATA}
        autoFillData
        scrollAnimationDuration={2000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({ item }) => (
          <Image
            flex={1}
            source={{ uri: item.image }}
            alt="Imagem do Produto"
            resizeMode="cover"
          />
        )}
      />
      {!!progressValue && (
        <HStack position="absolute" alignItems="center" bottom={1} px={1}>
          {DATA.map((_, index) => (
            <PaginationItem
              key={index}
              animValue={progressValue}
              index={index}
              length={DATA.length}
            />
          ))}
        </HStack>
      )}
    </VStack>
  );
}

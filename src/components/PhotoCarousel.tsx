import { Dimensions } from "react-native";
import { HStack, Image, useTheme, VStack } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

import { PaginationItem } from "@components/PaginationItem";
import { useProduct } from "@hooks/useProduct";
import { api } from "@services/api";

type Props = {
  product_id: string | null;
};

export function PhotoCarousel({ product_id }: Props) {
  const { sizes } = useTheme();
  const progressValue = useSharedValue<number>(0);
  const width = Dimensions.get("window").width;

  const { productPhotos, product } = useProduct();

  return (
    <VStack width="full" height={72}>
      <Carousel
        width={width}
        height={sizes[72]}
        autoPlay={true}
        data={product_id ? product.product_images : productPhotos}
        autoFillData
        scrollAnimationDuration={2000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({ item }) => (
          <Image
            flex={1}
            source={{
              uri: product_id
                ? `${api.defaults.baseURL}/images/${item.path}`
                : item.path,
            }}
            alt="Imagem do Produto"
            resizeMode="cover"
          />
        )}
      />
      {!!progressValue && (
        <HStack position="absolute" alignItems="center" bottom={1} px={1}>
          {productPhotos.map((_, index) => (
            <PaginationItem
              key={index}
              animValue={progressValue}
              index={index}
              length={productPhotos.length}
            />
          ))}
        </HStack>
      )}
    </VStack>
  );
}

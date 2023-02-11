import { useState } from "react";
import { FlatList, Text, VStack } from "native-base";

import { HeaderHome } from "@components/HeaderHome";
import { MyAdsButton } from "@components/MyAdsButton";
import { Input } from "@components/Input";
import { SearchAndFilter } from "@components/SearchAndFilter";
import { AdsDTO } from "@dtos/AdsDTO";
import { AdCard } from "@components/AdCard";

export function Home() {
  const [ads, setAds] = useState<AdsDTO[]>([
    {
      image:
        "https://img.freepik.com/free-photo/background-red-retro-model-tennis_1203-3993.jpg?w=826&t=st=1676140880~exp=1676141480~hmac=f3f2fecdc50c4488da7a482ed44187db0877f6bb12a822dc6a0b5c04772d161a",
      user: "https://img.freepik.com/free-photo/close-up-goats-farm_23-2148672981.jpg?w=996&t=st=1676140743~exp=1676141343~hmac=0d4348eff8342c655275cbff2b1fdc7e64e97552e46942b33e8a2d0390cd13da",
      title: "Tênis vermelho",
      type: "Usado",
      price: "59,90",
    },
    {
      image:
        "https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg?w=826&t=st=1676140967~exp=1676141567~hmac=0c4ed522234f76a6e5381a127c770dfc44e5bd7da0a1882ec7f1ade6d7e24bf5",
      user: "https://img.freepik.com/free-photo/close-up-goats-farm_23-2148672981.jpg?w=996&t=st=1676140743~exp=1676141343~hmac=0d4348eff8342c655275cbff2b1fdc7e64e97552e46942b33e8a2d0390cd13da",
      title: "Bicicleta",
      type: "Novo",
      price: "450,45",
    },
    {
      image:
        "https://img.freepik.com/free-psd/minimal-living-room-with-blue-sofa-carpet-interior-design-ideas_176382-1525.jpg?w=996&t=st=1676141019~exp=1676141619~hmac=9470cc5e118329a8472c0dea3192dc0bdf733c3c3eb1587cf8427ab3b5f9ca77",
      user: "https://img.freepik.com/free-photo/close-up-goats-farm_23-2148672981.jpg?w=996&t=st=1676140743~exp=1676141343~hmac=0d4348eff8342c655275cbff2b1fdc7e64e97552e46942b33e8a2d0390cd13da",
      title: "Sofa",
      type: "Usado",
      price: "1200,00",
    },
    {
      image:
        "https://img.freepik.com/free-photo/background-red-retro-model-tennis_1203-3993.jpg?w=826&t=st=1676140880~exp=1676141480~hmac=f3f2fecdc50c4488da7a482ed44187db0877f6bb12a822dc6a0b5c04772d161a",
      user: "https://img.freepik.com/free-photo/close-up-goats-farm_23-2148672981.jpg?w=996&t=st=1676140743~exp=1676141343~hmac=0d4348eff8342c655275cbff2b1fdc7e64e97552e46942b33e8a2d0390cd13da",
      title: "Tênis vermelho",
      type: "Novo",
      price: "59,90",
    },
    {
      image:
        "https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg?w=826&t=st=1676140967~exp=1676141567~hmac=0c4ed522234f76a6e5381a127c770dfc44e5bd7da0a1882ec7f1ade6d7e24bf5",
      user: "https://img.freepik.com/free-photo/close-up-goats-farm_23-2148672981.jpg?w=996&t=st=1676140743~exp=1676141343~hmac=0d4348eff8342c655275cbff2b1fdc7e64e97552e46942b33e8a2d0390cd13da",
      title: "Bicicleta",
      type: "Usado",
      price: "450,45",
    },
    {
      image:
        "https://img.freepik.com/free-psd/minimal-living-room-with-blue-sofa-carpet-interior-design-ideas_176382-1525.jpg?w=996&t=st=1676141019~exp=1676141619~hmac=9470cc5e118329a8472c0dea3192dc0bdf733c3c3eb1587cf8427ab3b5f9ca77",
      user: "https://img.freepik.com/free-photo/close-up-goats-farm_23-2148672981.jpg?w=996&t=st=1676140743~exp=1676141343~hmac=0d4348eff8342c655275cbff2b1fdc7e64e97552e46942b33e8a2d0390cd13da",
      title: "Sofa",
      type: "Novo",
      price: "1200,00",
    },
  ]);

  return (
    <VStack flex={1} px={6}>
      <HeaderHome />
      <VStack mt={8}>
        <Text fontSize="sm" color="gray.300" mb={3}>
          Seus produtos anunciados para venda
        </Text>
        <MyAdsButton />
      </VStack>

      <VStack mt={8} flex={1}>
        <Text fontSize="sm" color="gray.300" mb={3}>
          Compre produtos variados
        </Text>
        <Input
          placeholder="Buscar anúncio"
          returnKeyType="search"
          InputRightComponent={<SearchAndFilter />}
        />

        <FlatList
          data={ads}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item }) => <AdCard ads={item} />}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-between",
            marginBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          mt={6}
        />
      </VStack>
    </VStack>
  );
}

import { createContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { api } from "@services/api";

import { ProductDTO } from "@dtos/ProductDTO";
import { ProductImageDTO } from "@dtos/ProductImageDTO";

type ProuctContextProps = {
  product: ProductDTO;
  setProduct: (product: ProductDTO) => void;
  productPhotos: ProductImageDTO[];
  addProductPhoto: () => Promise<void>;
  removeProductPhoto: (index: number) => void;
  myProducts: ProductDTO[];
  fetchMyProducts: () => Promise<void>;
  setProductPhotos: (productPhotos: ProductImageDTO[]) => void;
  removedId: string[];
  setRemovedId: (removedId: string[]) => void;
};

export const ProductContext = createContext<ProuctContextProps>(
  {} as ProuctContextProps
);

type ProuctContextProviderProps = {
  children: React.ReactNode;
};

export function ProuctContextProvider({
  children,
}: ProuctContextProviderProps) {
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [myProducts, setMyProducts] = useState<ProductDTO[]>(
    [] as ProductDTO[]
  );
  const [productPhotos, setProductPhotos] = useState<ProductImageDTO[]>([]);
  const [removedId, setRemovedId] = useState<string[]>([]);

  async function addProductPhoto() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsMultipleSelection: productPhotos.length < 2,
        selectionLimit: 3 - productPhotos.length,
      });

      if (photoSelected.canceled) {
        return;
      }

      photoSelected.assets.map((photo) => {
        setProductPhotos((prevState) => [
          ...prevState,
          { path: photo.uri, type: photo.type } as ProductImageDTO,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  function removeProductPhoto(index: number) {
    const productPhotosCopy = [...productPhotos];
    setProductPhotos(productPhotosCopy.filter((_, i) => i !== index));
  }

  async function fetchMyProducts() {
    try {
      const { data } = await api.get("/users/products");
      setMyProducts(data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        productPhotos,
        addProductPhoto,
        removeProductPhoto,
        myProducts,
        fetchMyProducts,
        setProductPhotos,
        removedId,
        setRemovedId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

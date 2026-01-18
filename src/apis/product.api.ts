import axiosInstance from "@/lib/main.axios";
import suggestionAxiosInstance from "@/lib/suggestion.axios";
import { API_ENDPOINT } from "@/shared/constants/api.constant";
import type { ProductModel, SuggestionItemModel } from "@/shared/interface";
import type { AxiosError, AxiosResponse } from "axios";

export const getProduct = async (): Promise<ProductModel[]> => {
  try {
    const res: AxiosResponse<ProductModel[]> =
      await axiosInstance.get(API_ENDPOINT.PRODUCTS);
    return res.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const getSuggestions = async (
  query: string,
  signal?: AbortSignal
): Promise<SuggestionItemModel[]> => {
  try {
    const res: AxiosResponse<{ products: SuggestionItemModel[] }> =
      await suggestionAxiosInstance.get(
        API_ENDPOINT.SUGGESTIONS,
        {
          params: { q: query },
          signal,
        }
      );

    return res.data.products;
  } catch (error) {
    throw error as AxiosError;
  }
};
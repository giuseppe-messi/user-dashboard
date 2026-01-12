import { Params } from "../hooks/useFetch";

export const buildQueryString = (params?: Params) => {
  if (!params) return "";

  const validParams = Object.entries(params).filter(
    ([, value]) => value !== "" && value !== null && value !== undefined
  );

  const queryString = new URLSearchParams(
    validParams.map(([key, value]) => [key, String(value)])
  ).toString();

  return queryString ? `?${queryString}` : "";
};

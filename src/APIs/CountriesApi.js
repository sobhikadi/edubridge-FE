import axiosInstance from "./AxiosInstance";

const apiUrl = "/countries";

const CountriesApi = {
  getCountries: () => {
    return axiosInstance.get(apiUrl).then((result) => result.data.countries);
  },
};

export default CountriesApi;

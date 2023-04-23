import axiosClient from "./axiosClient";

const photoApi = {
  getPhoto(start: number, end: number) {
    const url = `photos?&_start=${start}&_end=${end}`;
    return axiosClient.get(url);
  },
};

export default photoApi;

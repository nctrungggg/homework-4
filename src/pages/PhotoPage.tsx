import { unwrapResult } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/button/Button";
import PhotoList from "../modules/photos/components/photoList/PhotoList";
import {
  disableButton,
  getPhoto,
  resetTitle,
  setPhotoList,
} from "../modules/photos/redux/PhotoSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { IPhotoParams } from "../types/photo";

const PhotoPage = () => {
  const dispatch = useDispatch();

  const { photoList } = useSelector((state: any) => state.photo);
  const { disableBtt } = useSelector((state: any) => state.photo);
  const { resetTitle: resetTt } = useSelector((state: any) => state.photo);

  const [page, setPage] = useState({ start: 0, end: 5 });
  const [reset, setReset] = useState(resetTt);
  const [currentPhotoList, setCurrentPhotoList] = useState(photoList);

  useEffect(() => {
    (async function () {
      const action = getPhoto(page);

      const resultAction = await dispatch<any>(action);
      unwrapResult(resultAction);

      const data = resultAction.payload;

      setCurrentPhotoList([...currentPhotoList, ...data]);
    })();
  }, [page]);

  const handleResetTitle = () => {
    setReset(!reset);

    dispatch(resetTitle(!reset));
    dispatch(disableButton(!disableBtt));
  };

  const fetchMoreData = useCallback(() => {
    setTimeout(() => {
      setPage({ start: page.start + 5, end: page.end + 5 });
    }, 1500);
  }, [page]);

  const handleChangeTitle = (title: string, id: number) => {
    const newCurrentPhotoList = currentPhotoList.map((photo: IPhotoParams) => {
      if (photo.id === id) {
        return { ...photo, title: title };
      }

      return photo;
    });

    setCurrentPhotoList([...newCurrentPhotoList]);
  };

  const handleConfirmTitle = () => {
    dispatch(setPhotoList(currentPhotoList));

    dispatch(disableButton(!disableBtt));
  };

  return (
    <div className="relative ">
      <div className=" bg-[#f7f7f7] box-shadow p-10 sticky top-0 z-10">
        <h1 className="text-3xl font-semibold text-center text-black">
          PHOTO PAGE
        </h1>
      </div>
      <div className="sticky top-[140px] left-[120px] flex gap-5 my-8 w-[220px]">
        <Button disableBtt={disableBtt} onClick={handleConfirmTitle}>
          Confirm
        </Button>
        <Button disableBtt={disableBtt} onClick={handleResetTitle}>
          Reset
        </Button>
      </div>

      <div className="w-[700px] m-auto">
        <InfiniteScroll
          dataLength={photoList.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4 className="text-xl p-4 ">Loading . . .</h4>}
          endMessage={<h4 className="text-lg">You have seen it all</h4>}
        >
          <PhotoList onChangeTitle={handleChangeTitle} photoList={photoList} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default PhotoPage;

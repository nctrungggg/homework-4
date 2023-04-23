import React, { memo } from "react";
import PhotoItem from "../photoItem/PhotoItem";
import { IPhotoParams } from "../../../../types/photo";

interface IPhotoListProps {
  photoList: IPhotoParams[];
  onChangeTitle: (title: string, id: number) => any;
}

const PhotoList = ({ photoList, onChangeTitle }: IPhotoListProps) => {
  return (
    <div>
      {photoList.map((photo, idx) => (
        <div key={idx}>
          <PhotoItem onChangeTitle={onChangeTitle} photo={photo} />
        </div>
      ))}
    </div>
  );
};

export default memo(PhotoList);

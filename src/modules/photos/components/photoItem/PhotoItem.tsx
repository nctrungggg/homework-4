import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableButton } from "../../redux/PhotoSlice";
import { IPhotoParams } from "../../../../types/photo";

interface IPhotoProps {
  photo: IPhotoParams;
  onChangeTitle: (title: string, id: number) => any;
}

const PhotoItem = ({ photo, onChangeTitle }: IPhotoProps) => {
  const dispatch = useDispatch();
  const { resetTitle: resetTt } = useSelector((state: any) => state.photo);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(photo.title);

  useEffect(() => {
    setTitle(photo.title);
  }, [resetTt]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const value = e.target.value;

    setTitle(value);
    onChangeTitle(value, id);
    dispatch(disableButton(false));
  };

  return (
    <div
      className="p-5 my-5 rounded-xl min-h-[120px] border border-[#c2c2c2]"
      style={{ background: photo.id % 2 === 0 ? "#e6e6e6" : "" }}
    >
      <div className="flex gap-5">
        <div className="w-[80px] h-full rounded-xl">
          <img
            className="w-full h-full rounded-xl"
            src="https://images.pexels.com/photos/1624076/pexels-photo-1624076.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt=""
          />
        </div>

        <div>
          {editing ? (
            <input
              type="text"
              className="w-full p-4 border outline-none border-cyan-700 bg-inherit rounded-xl"
              value={title}
              onChange={(e) => handleInputChange(e, photo.id)}
              onBlur={handleInputBlur}
            />
          ) : (
            <h2
              className="mb-3 text-lg transition-all duration-300 cursor-pointer font-semibold hover:border hover:p-4 hover:rounded-xl hover:border-cyan-700"
              onClick={handleEditClick}
            >
              {title}
            </h2>
          )}

          <p className="mb-2 text-sm text-slate-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
            officiis ea provident libero.
          </p>

          <p>{Date.now()}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(PhotoItem);

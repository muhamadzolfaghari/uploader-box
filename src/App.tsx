import React, { useEffect, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ErrorMessage from "./components/ErrorMessage";
import UploaderInputBox from "./components/UploaderInputBox";
import UploaderDetail from "./components/UploaderDetail";
import UploadIcon from "../src/components/uploadIcon";
interface Image {
  id: number;
  url: string;
  name: string;
  size: number;
}
function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handledrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const imageF = e.dataTransfer.files;
    if (imageF) {
      Array.from(imageF).forEach((item, index) => {
        const fileUrl = URL.createObjectURL(item);

        if (item.size > 2 * 1024 * 1024) {
          setErrorMessage("The files must be less than 2MB");
          return;
        } else {
          const newImage = {
            id: Date.now() + index,
            name: item.name,
            url: fileUrl,
            size: item.size,
          };
          const exist = images.some((img) => img.name === item.name);
          if (exist) {
            setErrorMessage("Image already exist");
          } else {
            setImages((prevImages) => [...prevImages, newImage]);
            setErrorMessage("");
          }
        }
      });
    }
  };

  const hanldeChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files;
    if (imageFile) {
      Array.from(imageFile).forEach((item, index) => {
        const fileUrl = URL.createObjectURL(item);

        if (item.size > 2 * 1024 * 1024) {
          setErrorMessage("The files must be less than 2MB");
          return;
        } else {
          const newImage = {
            id: Date.now() + index,
            name: item.name,
            url: fileUrl,
            size: item.size,
          };
          const exist = images.some((img) => img.name === item.name);
          if (exist) {
            setErrorMessage("Image already exist");
          } else {
            setImages((prevImages) => [...prevImages, newImage]);
            setErrorMessage("");
          }
        }
      });
    }
  };

  return (
    <>
      <div className="  flex items-center justify-center flex-col w-screen h-screen">
        <div className="flex items-center flex-col justify-center w-screen mb-7 ">
          <ErrorMessage message={errorMessage} />

          <div className="w-96 bg-white p-4 drop-shadow-xl rounded-xl">
            {/* <UploaderInputBox
              onChange={hanldeChangeInput}
              dropMessage={dragActive}
              handleDrap={handleDrag}
            /> */}

            <label
              onDrop={handleDrop}
              onDragOver={handledrag}
              htmlFor="uploader-image"
              className=" cursor-pointer bg-white p-4 border-2 flex-col border-dashed flex items-center justify-center rounded-xl  "
            >
              <input
                type="file"
                accept="image/*"
                multiple
                id="uploader-image"
                className="hidden md:none"
                onChange={hanldeChangeInput}
              />
              <div className="bg-slate-100 rounded-full p-4 mt-4 ">
                <UploadIcon
                  className="w-6 h-6 text-black-500"
                  strokeWidth={1.3}
                />
              </div>
              <button className="mt-5 text-[0.9rem] ">
                Choose a file or drag & drop it here
              </button>

              <p className=" text-gray-400 text-[0.9rem]">
                JPEG, PNG, PDG, formats, up to 2MB
              </p>
              <button className="text-[#54575C] rounded-[9px] border-[#CBD0DC]  border  p-1 px-4 mb-2 mt-5 text-[0.9rem] ">
                Browse File
              </button>
            </label>
            <UploaderDetail images={images} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

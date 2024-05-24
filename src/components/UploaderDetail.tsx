import { PropsWithChildren } from "react";
import { MdDeleteOutline } from "react-icons/md";
// import Image from "../types/ImageType";

interface Image {
  id: number;
  url: string;
  name: string;
  size: number;
}
interface Props {
  images: Image[];
  
}

export default function UploaderDetail(props: PropsWithChildren<Props>) {
  const { images,  } = props;
  return (
    <>
      <div
        className={`${images.length > 2 ? "overflow-y-auto" : ""} ${
          images.length > 2 ? "h-44" : ""
        } `}
      >
        {images &&
          images.map((item) => (
            <div
              key={item.id}
              className="  mt-3 bg-white rounded-xl drop-shadow-xl px-3 flex gap-3 flex-col  border py-3 "
            >
              <div className="flex gap-2 justify-between items-center ">
                <div className="flex gap-3">
                  <img
                    draggable="true"
                    src={item.url}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                  <div className="flex flex-col">
                    <p>
                      {images.length > 7
                        ? "item.jpg"
                        : `${item.name
                            .split("")
                            .slice(0, 6)
                            .join("")}${item.name.slice(-4)}`}
                    </p>
                    <div className=" bg-gray-200 h-2 rounded-full w-[230px] mt-2"></div>
                  </div>
                </div>
                <button>
                  <MdDeleteOutline size={"23px"} color="#808080" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

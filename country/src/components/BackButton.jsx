import { FaLongArrowAltLeft } from "react-icons/fa";

export default function BackButton() {
  return (
    <>
      <div className="flex border-2	w-32 justify-center items-center drop-shadow-md cursor-pointer">
        <div className=" text-2xl mr-3">
          <FaLongArrowAltLeft />
        </div>
        <p className="font-bold	text-xl">Back</p>
      </div>
    </>
  );
}

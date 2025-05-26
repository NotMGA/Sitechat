import React from "react";
type ActionsBoxProps = {
  image: string;
  title: string;
  description: string;
};
export default function ActionsBox({
  image,
  title,
  description,
}: ActionsBoxProps) {
  return (
    <div className="flex w-full mt-6 flex-col  gap-1 p-2 ">
      <div
        className="w-full  aspect-video bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <h2 className="text-xl font-medium">{title}</h2>
      <p className="text-lg font-normal text-[#9a704c]">{description}</p>
    </div>
  );
}

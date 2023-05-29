import React from "react";

function LessonComponent({ data }) {
  return (
    <div className="flex w-full h-fit flex-col ">
      <div className="flex justify-between">
        <div className="mb-2 w-full">
          <h2 className="mb-3 sm:mb-4 text-center text-2xl underline">
            {data.name}
          </h2>
          <p className="text-lg">
            {data.description}
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            molestiae reprehenderit aliquid delectus hic. Asperiores!
          </p>
        </div>
      </div>
      <div>
        <video className="w-full md:p-10 mt-6 px-6" controls>
          <source src="" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="pb-12">
        <div className="mt-8">
          <h1 className="mb-3 sm:mb-5 text-center">What you'll learn</h1>
        </div>
        <div className="mb-2">
          <ul>
            <li>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
                ipsa facere commodi, animi eveniet rem minima cum, ab recusandae
                quisquam quas nobis pariatur sapiente ipsum.
              </p>
            </li>
            <li>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Beatae, at.
              </p>
            </li>
            <li>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                assumenda, incidunt corrupti enim velit ad.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LessonComponent;

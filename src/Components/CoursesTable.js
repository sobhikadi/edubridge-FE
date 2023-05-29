import React, { useState } from "react";

const CoursesTable = () => {
  const [hoverRowIndex, setHoverRowIndex] = useState(null);

  const products = [
    {
      id: 1,
      title: "Apple MacBook Pro 17",
      Provider: "Silver",
      category: "Laptop PC",
      publishState: "Published",
      creationDate: "2019-01-01",
    },
    {
      id: 2,
      title: 'Apple MacBook Pro 17"',
      Provider: "Silver",
      category: "Laptop PC",
      publishState: "Published",
      creationDate: "2019-01-01",
    },

    {
      id: 3,
      title: 'Apple MacBook Pro 17"',
      Provider: "Silver",
      category: "Laptop PC",
      publishState: "Published",
      creationDate: "2019-01-01",
    },
  ];

  const handleDelete = (productName) => {
    // Placeholder function, replace with your own delete logic
    console.log(`Deleting ${productName}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 ">
      <h2 className="text-xl font-bold tracking-tight mb-4 text-slate-200">
        Courses
      </h2>
      <table className="w-full text-md text-left text-gray-400">
        <thead className="text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Provider
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Publish State
            </th>
            <th scope="col" className="px-6 py-3">
              Creation Date
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Edit Action
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Delete Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`${
                index === hoverRowIndex
                  ? "bg-gray-600"
                  : index % 2 === 0
                  ? "bg-gray-900"
                  : "bg-gray-800"
              } border-gray-700 border-b  `}
              onMouseEnter={() => setHoverRowIndex(index)}
              onMouseLeave={() => setHoverRowIndex(null)}
            >
              <td className="px-6 py-4">{product.id}</td>
              <td className="px-6 py-4">{product.title}</td>
              <td className="px-6 py-4">{product.Provider}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.publishState}</td>
              <td className="px-6 py-4">{product.creationDate}</td>
              <td className="px-6 py-4 text-center ">
                <a
                  href="#"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleDelete(product.name)}
                  className="font-medium text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;

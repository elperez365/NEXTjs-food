import React from "react";

const DetailMealPage = ({ params }) => {
  return (
    <div>
      <h1>DetailMealPage</h1>
      <p>slug: {params.slug}</p>
    </div>
  );
};

export default DetailMealPage;

import React, { useState } from "react";

export default function FilterMovies({
  movieFilterValue,
  handleOnInputChange,
}) {
  return (
    <div>
      <input
        placeholder="Movie Name"
        value={movieFilterValue}
        onChange={(e) => handleOnInputChange(e.target.value)}
      ></input>
    </div>
  );
}

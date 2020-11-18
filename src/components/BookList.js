import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const [selected, setSelected] = useState("");
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => {
          return (
            <li
              key={book.id}
              onClick={() => {
                setSelected(book.id);
              }}
            >
              <p>{book.name}</p>
            </li>
          );
        })}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;

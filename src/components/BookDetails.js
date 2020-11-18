import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries";

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });

  if (!bookId)
    return (
      <div className="book-details">
        <h1>No book selected...</h1>
      </div>
    );
  if (loading)
    return (
      <div className="book-details">
        <h1>Loading...</h1>
      </div>
    );
  if (error) return null;

  const { book } = data;

  return (
    <div className="book-details">
      <div>
        <h1>{book.name}</h1>
        <p>Genre: {book.genre}</p>
        <p>Author: {book.author.name}</p>
        <p>All books by this author:</p>
        <ul>
          {book.author.books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookDetails;

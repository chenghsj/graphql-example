import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries/queries";

function AddBook() {
  const [state, setState] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const { name, genre, authorId } = state;

  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: (data) => console.log(data),
    refetchQueries: [{ query: GET_BOOKS }],
  });

  if (error) return `Error! ${error.message}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !genre || !authorId) return;
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
    });
    setState({ name: "", genre: "", authorId: "" });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" value={name} name="name" onChange={handleChange} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select name="authorId" value={authorId} onChange={handleChange}>
            <option value="">Select Author</option>
            {loading ? (
              <option disabled>Loading Authors...</option>
            ) : (
              data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        </div>
        <button>+</button>
      </form>
    </div>
  );
}

export default AddBook;

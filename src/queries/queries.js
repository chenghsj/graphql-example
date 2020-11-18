import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

const GET_BOOK = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      id
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export { GET_BOOKS, GET_BOOK, GET_AUTHORS, ADD_BOOK };

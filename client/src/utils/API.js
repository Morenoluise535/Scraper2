import axios from "axios";

export default {
  // Gets all books
  search: function(query) {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+query+"&api-key=DGYyZkrMtQgJDfjEaLfY0wGYd3AtuQK8");
  },
  
  
  getArticles: function() {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=dogs&api-key=DGYyZkrMtQgJDfjEaLfY0wGYd3AtuQK8");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};

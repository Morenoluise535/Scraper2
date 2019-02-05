import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import SearchForm from "../../components/SearchForm"

class Articles extends Component {
  // Setting our component's initial state
  // state = {
  //   books: [],
  //   title: "",
  //   author: "",
  //   synopsis: ""
  // };

  // // When the component mounts, load all books and save them to this.state.books
  // componentDidMount() {
  //   this.loadBooks();
  // }

  // // Loads all books  and sets them to this.state.books
  // loadBooks = () => {
  //   API.getArticles()
  //     .then(res =>
  //       this.setState({ books: res.data.response.docs, title: "", author: "", synopsis: "" })
  //     )
  //     .then(console.log(this.state.books))
  //     .catch(err => console.log(err));
  // };

  // // Deletes a book from the database with a given id, then reloads books from the db
  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  // // Handles updating component state when the user types into the input field
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // // When the form is submitted, use the API.saveBook method to save the book data
  // // Then reload books from the database
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  state = {
    search: "",
    results: [],
    saved: []
  };

  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchArticle ("Dog");
  }

  searchArticle  = query => {
    API.search(query)
      .then(res => this.setState({ results: res.data.response.docs}))
      .then(console.log(this.state.results))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchArticle (this.state.search);
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search Article by topic</h1>
            </Jumbotron>
            <SearchForm
            search={this.state.search}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            />
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Articles</h1>
            </Jumbotron>
              <List>
                {this.state.results.map(result => {
                  return (
                    <ListItem key={result.id}>
                      <h1>{result.headline.print_headline}</h1>
                      <p>{result.lead_paragraph}</p>
                      <p>Publication Date: {result.pub_date}</p>
                      <a href={result.web_url}>Link</a>  
                    </ListItem>
                  );
                })}
              </List>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;

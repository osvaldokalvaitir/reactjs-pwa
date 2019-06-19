import React, { Component, Fragment } from "react";
import axios from "axios";

import { Header, Repositories } from "./styles";

class App extends Component {
  state = {
    newRepoInput: "",
    repositories: []
  };

  addRepository = async () => {
    if (!this.state.newRepoInput) return;

    const response = await axios.get(
      `https://api.github.com/repos/${this.state.newRepoInput}`
    );

    this.setState({
      newRepoInput: "",
      repositories: [...this.state.repositories, response.data]
    });
  };

  render() {
    return (
      <Fragment>
        <Header>
          <input
            placeholder="Adicionar repositório"
            onChange={e => this.setState({ newRepoInput: e.target.value })}
            value={this.state.newRepoInput}
          />

          <button onClick={this.addRepository}>Adicionar</button>
        </Header>

        <Repositories>
          {this.state.repositories.map(repository => (
            <li key={repository.id}>
              <img src={repository.owner.avatar_url} />
              <div>
                <stong>{repository.name}</stong>
                <p>{repository.description}</p>
                <a href={repository.html_url}>Acessar</a>
              </div>
            </li>
          ))}
        </Repositories>
      </Fragment>
    );
  }
}

export default App;

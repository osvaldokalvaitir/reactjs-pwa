import React, { Component, Fragment } from "react";
import axios from "axios";

import GlobalStyle from "./global";

import { Header, Repositories, Offline } from "./styles";

class App extends Component {
  state = {
    online: navigator.onLine,
    newRepoInput: "",
    repositories:
      JSON.parse(localStorage.getItem("@Rocketseat:repositories")) || []
  };

  componentDidMount() {
    window.addEventListener("online", this.handleNetworkChange);
    window.addEventListener("offline", this.handleNetworkChange);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleNetworkChange);
    window.removeEventListener("offline", this.handleNetworkChange);
  }

  handleNetworkChange = () => {
    this.setState({ online: navigator.onLine });
  };

  addRepository = async () => {
    if (!this.state.newRepoInput) return;

    if (!this.state.online) {
      alert("Você está offline, conecte-se para fazer essa ação!");
    }

    const response = await axios.get(
      `https://api.github.com/repos/${this.state.newRepoInput}`
    );

    this.setState({
      newRepoInput: "",
      repositories: [...this.state.repositories, response.data]
    });

    localStorage.setItem(
      "@Rocketseat:repositories",
      JSON.stringify(this.state.repositories)
    );
  };

  render() {
    return (
      <Fragment>
        <GlobalStyle />
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

        {!this.state.online && <Offline>Você está offline</Offline>}
      </Fragment>
    );
  }
}

export default App;

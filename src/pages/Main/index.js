import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    respositories: [],
    loading: false,
  };

  componentDidMount() {
    const respositoriesLocalStorage = localStorage.getItem('respositories');

    if (respositoriesLocalStorage) {
      this.setState({ respositories: JSON.parse(respositoriesLocalStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { respositories } = this.state;
    if (prevState.respositories !== respositories) {
      localStorage.setItem('respositories', JSON.stringify(respositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, respositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };
    this.setState({
      respositories: [...respositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, respositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositório
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adcionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size="14" />
            ) : (
              <FaPlus color="#fff" size="14" />
            )}
          </SubmitButton>
        </Form>
        <List>
          {respositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

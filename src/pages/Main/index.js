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
    error: false,
    messageError: '',
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
    this.setState({ newRepo: e.target.value, error: false, messageError: '' });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false, messageError: '' });

    try {
      const { newRepo, respositories } = this.state;

      if (newRepo === '') {
        throw {
          name: 'Warning',
          message: 'Precisa indicar um repositório',
        };
      }

      const duplicate = respositories.find(
        r => r.name.toLocaleLowerCase() === newRepo.toLocaleLowerCase()
      );

      if (duplicate) {
        throw {
          name: 'Warning',
          message: 'Repositório Duplicado',
        };
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        respositories: [...respositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (e) {
      const message =
        e.name !== 'Warning'
          ? 'A solicitação a api do github falhou'
          : e.message;
      this.setState({ error: true, messageError: `Erro: ${message}` });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, loading, respositories, error, messageError } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositório
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <div className="group">
            <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
              className={error ? 'error' : ''}
            />
            <SubmitButton load={loading}>
              {loading ? (
                <FaSpinner color="#fff" size="14" />
              ) : (
                <FaPlus color="#fff" size="14" />
              )}
            </SubmitButton>
          </div>
          <span className="error">{messageError}</span>
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

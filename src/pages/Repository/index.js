import React, { Component } from 'react';
import api from '../../services/api';
// import { Container } from './styles';

class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    /**
     * Não é interessante issues ser excutado depois do repository finalizar
     * a chamada, por isso vamos usar Promise.all que vai excutar as duas ao
     * mesmo tempo mas só vai pra proxima linha quando os dois finalizar as duas
     * */
    /* const repository = api.get(`/repos/${repoName}`);
    const issues = api.get(`/repos/${repoName}/issues`); */

    /** Na chamada do issues estamos passando como segundo parametro dentro
     * do get o objeto params isso possivel por causa do axios poderiamos passar
     * assim: */
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);
    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
    });
    console.log(issues);
  }

  render() {
    const { repository, issues, loading } = this.state;
    return <h1>Repository:</h1>;
  }
}
export default Repository;

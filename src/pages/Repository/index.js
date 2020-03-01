import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';
import { Loading, Owner, IssuesList, IssueFilter, PageActions } from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    filters: [
      { state: 'all', text: 'Todas', status: true },
      { state: 'open', text: 'Abertas', status: false },
      { state: 'closed', text: 'Fechadas', status: false },
    ],
    filterIndex: 0,
    loading: true,
    loadingList: false,
    page: 1,
    perPage: 10,
  };

  async componentDidMount() {
    const { perPage, filterIndex, filters } = this.state;
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
     * assim: issues?state='open'&per_page=5 */
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters[filterIndex].state,
          per_page: perPage,
        },
      }),
    ]);
    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
    });
  }

  handleFilter = async active => {
    const { filters } = this.state;
    await this.setState({
      filterIndex: active,
      page: 1,
      filters: filters.map((filter, index) => {
        filter.status = index === active;
        return filter;
      }),
    });
    this.loadIssues();
  };

  handlePageAction = async e => {
    const { page } = this.state;
    await this.setState({
      page: e === 'back' ? page - 1 : page + 1,
    });

    const issuesList = document.querySelector('ul').offsetTop;

    window.scrollTo(0, issuesList);
    this.loadIssues();
  };

  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page, perPage } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    this.setState({ loadingList: true });
    const reposne = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: `${filters[filterIndex].state}`,
        per_page: perPage,
        page,
      },
    });
    this.setState({ issues: reposne.data, loadingList: false });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      page,
      loadingList,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueFilter>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={String(index)}
              className={filter.status && 'active'}
              onClick={() => this.handleFilter(index)}
            >
              {filter.text}
            </button>
          ))}
        </IssueFilter>
        <IssuesList className={loadingList && 'loadingList'}>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>
        <PageActions>
          <button
            title="Anterior"
            type="button"
            onClick={() => this.handlePageAction('back')}
            disabled={page < 2}
          >
            <FaArrowLeft />
          </button>
          <span>Página {page}</span>

          <button
            title="Próximo"
            type="button"
            onClick={() => this.handlePageAction('next')}
            disabled={issues.length === 0}
          >
            <FaArrowRight />
          </button>
        </PageActions>
      </Container>
    );
  }
}
export default Repository;

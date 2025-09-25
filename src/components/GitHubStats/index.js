import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Spinner } from 'react-bootstrap';
import './style.css';

export default function GitHubStats({ username = 'adellkl', compact = false }) {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);

        // Fetch user stats
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();

        setStats(userData);
        setRepos(reposData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('GitHub API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchGitHubData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [username]);

  if (loading) {
    return (
      <div className="github-stats-loading">
        <Spinner animation="border" variant="primary" />
        <p>Chargement des données GitHub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-stats-error">
        <p>Erreur lors du chargement des données GitHub</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      React: '#61dafb',
      HTML: '#e34c26',
      CSS: '#1572b6',
      Python: '#3572a5',
      Java: '#b07219',
      PHP: '#4f5d95'
    };
    return colors[language] || '#6c757d';
  };

  if (compact) {
    return (
      <div className="github-stats-compact">
        {loading && (
          <div className="compact-loading">
            <Spinner animation="border" size="sm" variant="primary" />
            <span className="ms-2">Chargement...</span>
          </div>
        )}

        {error && (
          <div className="compact-error">
            <span>❌ Erreur GitHub</span>
          </div>
        )}

        {stats && !loading && (
          <div className="compact-content">
            <div className="compact-profile">
              <img
                src={stats.avatar_url}
                alt={`${stats.name} avatar`}
                className="compact-avatar"
              />
              <div className="compact-info">
                <h6 className="compact-name">{stats.name}</h6>
                <p className="compact-username">@{stats.login}</p>
              </div>
            </div>

            <div className="compact-metrics">
              <div className="compact-metric highlight-followers">
                <span className="metric-number followers-count">{stats.followers}</span>
                <span className="metric-label">👥 Followers</span>
              </div>
              <div className="compact-metric highlight-following">
                <span className="metric-number following-count ">{stats.following}</span>
                <span className="metric-label">👤 Following</span>
              </div>
              <div className="compact-metric">
                <span className="metric-number">{stats.public_repos}</span>
                <span className="metric-label">📂 Repos</span>
              </div>
            </div>



            {repos.length > 0 && (
              <div className="compact-repos">
                <div className="repos-header">
                  <span>📂 Derniers repositories ({repos.length}):</span>
                </div>
                <div className="repos-list">
                  {repos.slice(0, 6).map((repo) => (
                    <div key={repo.id} className="compact-repo">
                      <div className="repo-header-compact">
                        <h6 className="repo-title">
                          <span className="repo-icon">📁</span>
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                          </a>
                        </h6>
                        {repo.private ? (
                          <span className="repo-visibility private">🔒 Private</span>
                        ) : (
                          <span className="repo-visibility public">🌐 Public</span>
                        )}
                      </div>
                      <div className="repo-info">
                        {repo.description && (
                          <p className="repo-desc">{repo.description.slice(0, 80)}...</p>
                        )}
                      </div>
                      <div className="repo-meta">
                        {repo.language && (
                          <span className="repo-lang">
                            <span
                              className="lang-dot"
                              style={{ backgroundColor: getLanguageColor(repo.language) }}
                            ></span>
                            {repo.language}
                          </span>
                        )}
                        <div className="repo-stats-mini">
                          {repo.stargazers_count > 0 && (
                            <span>⭐ {repo.stargazers_count}</span>
                          )}
                          {repo.forks_count > 0 && (
                            <span>🍴 {repo.forks_count}</span>
                          )}
                        </div>
                        <span className="repo-updated">{formatDate(repo.updated_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="view-all-repos">
                  <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
                    🔗 Voir tous les repositories sur GitHub
                  </a>
                </div>
              </div>
            )}

            <div className="compact-activity">
              <div className="activity-dot"></div>
              <span>Actif récemment</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="github-stats-container">
      {loading && (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Chargement des données GitHub...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          <p>Erreur lors du chargement des données GitHub: {error}</p>
        </div>
      )}

      {stats && !loading && (
        <>
          <div className="github-profile">
            <div className="profile-header">
              <img
                src={stats.avatar_url}
                alt={`${stats.name} avatar`}
                className="github-avatar"
              />
              <div className="profile-info">
                <h4>{stats.name}</h4>
                <p className="username">@{stats.login}</p>
                <p className="bio">{stats.bio}</p>
                <div className="status-badge">
                  <span className="status-dot"></span>
                  En ligne
                </div>
              </div>
            </div>

            <div className="github-metrics">
              <div className="metric">
                <span className="metric-number">{stats.public_repos}</span>
                <span className="metric-label">Repositories</span>
              </div>
              <div className="metric">
                <span className="metric-number">{stats.followers}</span>
                <span className="metric-label">Followers</span>
              </div>
              <div className="metric">
                <span className="metric-number">{stats.following}</span>
                <span className="metric-label">Following</span>
              </div>
            </div>
          </div>

          {repos.length > 0 && (
            <div className="github-repos">
              <h5 className="repos-title">Repositories récents</h5>
              <Row>
                {repos.slice(0, 6).map((repo, index) => (
                  <Col md={6} lg={4} key={repo.id} className="mb-3">
                    <Card className="repo-card h-100">
                      <Card.Body>
                        <div className="repo-header">
                          <h6 className="repo-name">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                              {repo.name}
                            </a>
                          </h6>
                          <Badge variant="outline-secondary" className="repo-visibility">
                            {repo.private ? 'Private' : 'Public'}
                          </Badge>
                        </div>

                        {repo.description && (
                          <p className="repo-description">{repo.description}</p>
                        )}

                        <div className="repo-stats">
                          {repo.language && (
                            <span className="language">
                              <span
                                className="language-color"
                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                              ></span>
                              {repo.language}
                            </span>
                          )}

                          <div className="repo-metrics">
                            <span className="metric">
                              ⭐ {repo.stargazers_count}
                            </span>
                            <span className="metric">
                              🍴 {repo.forks_count}
                            </span>
                          </div>
                        </div>

                        <div className="repo-updated">
                          Mis à jour {formatDate(repo.updated_at)}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </>
      )}

      <div className="github-activity">
        <div className="activity-indicator">
          <div className="pulse-dot"></div>
          <span>Dernière activité : {formatDate(stats.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};


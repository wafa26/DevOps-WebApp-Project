# Changelog
All notable changes to this project will be documented in this file.


### Added
- Initial setup for Swagger API documentation.
- Added `/api/employees` routes.
- Implemented Redis caching for employee retrieval.
- NGINX as a server.
- REACT for frontend.
- NODE.js for backend.

### Changed
- Updated `docker-compose.yml` to use health checks for services.
- Modified frontend API URL to use environment variables with .env file.
- changed css in the frontend.
- Updated userWebApi with Prometheus metrics in app.js and installed with npm install prom-client.


### Fixed
- Fixed Swagger documentation issues (duplicate GET request and indentation issues).
- Corrected MongoDB and Redis connection errors in Docker.

## [1.0.0] - 2025-02-03
### Added
- First stable release.
- Employee management CRUD API (Create, Read, Update, Delete).
- Frontend integration with React and Material UI.

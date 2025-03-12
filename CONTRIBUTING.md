# Contributing to PubChem Diagrams

Thank you for considering contributing to PubChem Diagrams! This document outlines the process for contributing to the project and how to get started.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Describe the behavior you observed and what you expected to see
- Include screenshots if possible
- Include details about your configuration and environment

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful to most users
- Include any relevant examples or mockups

### Pull Requests

- Fill in the required template
- Follow the coding style used throughout the project
- Include appropriate tests
- Update documentation as needed
- End all files with a newline

## Development Process

### Setting Up the Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/pubchem-diagrams.git`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

### Code Style

- Use TypeScript for all JavaScript code
- Follow the existing code style in the project
- Use meaningful variable and function names
- Write comments for complex logic

### Testing

- Write tests for new features or bug fixes
- Run tests before submitting a pull request: `npm test`
- Ensure all tests pass

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

## Project Structure

```
pubchem-diagrams/
├── public/             # Static files
├── src/                # Source code
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── .github/            # GitHub templates
└── docs/               # Documentation
```

## License

By contributing to PubChem Diagrams, you agree that your contributions will be licensed under the project's [MIT License](LICENSE). 
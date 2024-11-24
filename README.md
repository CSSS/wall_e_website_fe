# ARCHIVED
website relocated to [new website front-end](https://github.com/CSSS/csss-site-frontend/pull/76)

# The `wall_e` Website (React frontend)

This repository holds the source code for the `wall_e` [website](https://walle.sfucsss.org)'s frontend.

## Local Development

### Installing Packages

Upon cloning this repository, please run `npm ci` to install the necessary packages.

NOTE: using `npm ci` instead of `npm install` prevents `package-lock.json` and `package.json` being updated.
This is preferred to prevent unnecessary updates to these files in changes.
If a package needs to be updated, please do so as a separate commit.

### Running Locally

You can run this frontend locally by running `npm run start`.

### Linting

You can check for linting errors by running `npm run lint`.

Currently, the following JS linting rules are in place:

- All lines must end with a semicolon
- Tabs must be used, not spaces

### Environment Variables

To be written.

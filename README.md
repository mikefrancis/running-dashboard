# running-dashboard

[![Build Status](https://travis-ci.org/mikefrancis/running-dashboard.svg?branch=master)](https://travis-ci.org/mikefrancis/running-dashboard) [![codecov](https://codecov.io/gh/mikefrancis/running-dashboard/branch/master/graph/badge.svg)](https://codecov.io/gh/mikefrancis/running-dashboard)

Running dashboard powered by Strava.

## Setup

Clone this repo:

```bash
git@github.com:mikefrancis/running-dashboard.git
cd running-dashboard
```

Install dependencies:

```bash
yarn install
```

Copy the example environment file ready to fill with your own credentials:

```bash
cp .env.example .env
```

## Credentials

*You only need to do this step once as the refresh token which Strava returns is long-lived.*

Set up a new [Strava app](https://www.strava.com/settings/api) and make a note of the **client ID and secret**. Use these to fill in `REACT_APP_STRAVA_KEY` and `REACT_APP_STRAVA_SECRET` in `.env`.

Next, grab an authorisation code for your app by visiting the following URL:

```bash
https://www.strava.com/oauth/authorize?client_id={{ CLIENT_ID }}&redirect_uri={{ REDIRECT_URL }}&response_type=code&scope=activity%3Aread_all
```

Using the `code` in the response, make a `POST` request to the following URL:

```bash
https://www.strava.com/oauth/token?client_id={{ CLIENT_ID }}&client_secret={{ CLIENT_SECRET }}&code={{ CODE }}&grant_type=authorization_code
```

Nearly there! Use the `refresh_token` from this response to populate `REACT_APP_STRAVA_REFRESH_TOKEN` in `.env`.

## Development

Start local development server:

```bash
yarn dev
```

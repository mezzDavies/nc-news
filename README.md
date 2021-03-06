# Northcoders NC News

## Decription

This is a front end application made as part of my time on the [Northcoders Bootcamp](https://northcoders.com).

It is a website (in a style similar to reddit) built with React. A hosted version can be found [here](https://nc-news-mezz-davies.netlify.app).

Although there is no authentication you are "logged in" as a user and as such some functionality of the website works accordingly (you are only able to delete comments asociated with that user, for example). Please have a click around the website and add a comment to an article, vote on an article etc.

It was created to complement a backend project that was also completed by myself on the same bootcamp:

- [Hosted Version](https://nc-news-mezz-davies.herokuapp.com/api/)
- [github](https://github.com/mezzDavies/northcoders-be-project)

## Run Website Locally

Follow these instructions to download, install and run the app locally.

From the directory you want to install the repo run:

```bash
git clone https://github.com/mezzDavies/nc-news.git
```

cd into the repo then install dependencies:

```bash
npm i
```

Finally start the app locally:

```bash
npm start
```

It should launch in your default browser.

## Minimum Requirements

Please ensure you have a minimum of

```bash
node.js v16
```

installed to run this app locally.

## Future Updates

Further ammendments are forthcoming, including:

- Pagination of articles and comments
- The ability for a user to vote on comments (not inc. their own)
- The ability for a user to post new articles and topics
- The ability for a user to delete articles

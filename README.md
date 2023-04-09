# HoardGames - Frontend

HoardGames is a web application that allows users to track their board game collection, rate and review their games, and search for new games to add to their collection. 
To use this frontend, you will also need to clone and run the [Hoardgames Backend](https://github.com/amekatze/hoardgames-backend) repository.

## Features

- Board Game Search
  - Users can search for board games using the BoardGameAtlas API.
  - Search results are displayed with the game title, image, player count, playtime, year published, and a link to the game's rules.
  - Users can add games to their collection from the search results.
- Collection Management
  - Users can view, edit, and delete games in their collection.
  - Each game in the collection displays its title, image, player count, playtime, year published, and rating.
  - Users can rate their games on a scale of 1 to 5 and add notes to each game.
  - Users can search their collection by game title.

## Technical Details

- This app is built using React on the frontend.
- Requests to the BoardGameAtlas API are made using the Fetch API.
- User interface is styled using CSS.

## Installation

To run this app on your local machine, follow these steps:

1. Clone the repository to your machine.
2. In the project directory, run `npm install` to install the dependencies.
3. Run `npm start` to start the app.
4. Open your web browser and go to http://localhost:3000 to view the app.

Note: You will need to obtain an API key from the BoardGameAtlas API to use the search functionality. Once you have an API key, create a `.env` file in the root directory of the project and add the following line, replacing `YOUR_API_KEY_HERE` with your actual API key:


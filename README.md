# Dice Matching Game
Single page React application game. This project was carried out with the addition of new features to a tenzies-game project (https://scrimba.com/playlist/pYkgpAP)

How to play?
 - Add a new player by clicking + in the lower box.
 - Click each die to freeze it at its current value between rolls.
 - Roll until all dice are the same.
 - See the result of the roll number and elapsed time in the lower box.
 - Press new start for a new game with the automatic timer start.

Game features?
 - Game results are recorded.
 - Player names are randomly created.
 - Stopwatch can be manually controlled.
 - Players can be removed from a list of results by clicking a garbage button.


## Setup

Install dependencies with `npm install` in both server and client folders.

## Running

```sh
npm start
```
## Screenshots

!["Start New Game"](https://github.com/mkim245/react-tenzies/blob/master/public/screenshots/start_game_with_new_player.PNG?raw=true)

!["Click the Same Dice"](https://github.com/mkim245/react-tenzies/blob/master/public/screenshots/select_the_same_dice_for_each_roll.PNG?raw=true)

!["End of Game"](https://github.com/mkim245/react-tenzies/blob/master/public/screenshots/finish_game.PNG?raw=true)

!["List of Game Result"](https://github.com/mkim245/react-tenzies/blob/master/public/screenshots/game_result.PNG?raw=true)


## Project Stack

JavaScript, React, Node, HTML

## Dependencies
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "nanoid": "^4.0.0",
    "react": "^18.2.0",
    "react-confetti": "^6.1.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-timer-hook": "^3.0.5",
    "unique-names-generator": "^4.7.1",
    "web-vitals": "^2.1.4"
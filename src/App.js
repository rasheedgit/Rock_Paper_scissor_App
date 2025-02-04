import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const buttonTestIds = {
  ROCK: 'rockButton',
  SCISSORS: 'scissorsButton',
  PAPER: 'paperButton',
}

class App extends Component {
  state = {
    score: 0,
    isAnswered: false,
    answer: 'PAPER',
    opponentAnswer: 'ROCK',
    resultString: '',
  }

  onGameButtonClick = id => {
    const {score} = this.state
    const randomNumber = Math.floor(Math.random() * 3)
    const opponentId = choicesList[randomNumber].id

    let result = ''
    let newScore = score

    if (id === opponentId) {
      result = 'IT IS DRAW'
    } else if (
      (id === 'ROCK' && opponentId === 'SCISSORS') ||
      (id === 'SCISSORS' && opponentId === 'PAPER') ||
      (id === 'PAPER' && opponentId === 'ROCK')
    ) {
      result = 'YOU WON'
      newScore += 1
    } else {
      result = 'YOU LOSE'
      newScore -= 1
    }

    this.setState({
      score: newScore,
      isAnswered: true,
      answer: id,
      opponentAnswer: opponentId,
      resultString: result,
    })
  }

  playAgainButton = () => {
    this.setState({isAnswered: false})
  }

  render() {
    const {score, isAnswered, answer, opponentAnswer, resultString} = this.state
    const selectedOption = choicesList.find(eachItem => eachItem.id === answer)
    const opponentOption = choicesList.find(
      eachItem => eachItem.id === opponentAnswer,
    )
    let resultClassName = 'draw'

    if (resultString === 'YOU WON') {
      resultClassName = 'success'
    } else if (resultString === 'YOU LOSE') {
      resultClassName = 'failure'
    }

    return (
      <div className="app-container">
        <div className="header-container">
          <div>
            <h1 className="titles">
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </h1>
          </div>
          <div className="score-container">
            <p className="score-title">Score</p>
            <p className="score">{score}</p>
          </div>
        </div>
        {!isAnswered && (
          <ul className="game-buttons-container">
            {choicesList.map(eachItem => (
              <li key={eachItem.id} className="game-button-item">
                <button
                  data-testid={buttonTestIds[eachItem.id]}
                  onClick={() => this.onGameButtonClick(eachItem.id)}
                  className="game-button"
                  type="button"
                >
                  <img
                    className="game-button-image"
                    src={eachItem.imageUrl}
                    alt={eachItem.id}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
        {isAnswered && (
          <div className="result-container">
            <div className="flex-column">
              <h1 className="result-title">YOU</h1>
              <img
                className="result-game-image"
                src={selectedOption.imageUrl}
                alt="your choice"
              />
            </div>
            <div className="flex-column">
              <h1 className="result-title">OPPONENT</h1>
              <img
                className="result-game-image"
                src={opponentOption.imageUrl}
                alt="opponent choice"
              />
            </div>
            <div className="result-button-container">
              <p className={`result ${resultClassName}`}>{resultString}</p>
              <button
                onClick={this.playAgainButton}
                className="play-again-button"
                type="button"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
        <Popup
          trigger={
            <button type="button" className="modal">
              RULES
            </button>
          }
          modal
        >
          {close => (
            <div className="modal-popup">
              <button
                onClick={close}
                className="modal-close-button"
                type="button"
              >
                <RiCloseLine />
              </button>
              <img
                className="rules-image"
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default App

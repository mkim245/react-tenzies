import React from 'react';

export default function Ranking(props) {
  const playerElements = props.players.map((player, index) => (
    <div key={player.id}>
      <div className="player-list">
        <h4 className="player-name">{player.name}</h4>
        <h4 className="player-score">{player.roll}</h4>
        <button
          className="delete-btn"
          onClick={(e) => props.deletePlayer(e, player.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ))

  return (
    <section className="rank-container">
      <div className="player-addition">
        <h3>Players</h3>
        <button className="new-player" onClick={props.newPlayer}>+</button>
      </div>
      {playerElements}
    </section>
  );
}
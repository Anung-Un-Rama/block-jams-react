import React, {Component} from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="Player-bar">
      <section id="buttons">
         <button id="previous" onClick={this.props.handlePrevClick}>
           <ion-icon name="skip-backward"></ion-icon>
         </button>
         <button id="play-pause" onClick={this.props.handleSongClick}>
            {this.props.isPlaying ? <ion-icon name='pause'></ion-icon> : <ion-icon name='play'></ion-icon>}
         </button>
         <button id="next" onClick={this.props.handleNextClick}>
           <ion-icon name="skip-forward"></ion-icon>
         </button>
       </section>
       <section id="time-control">
       <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
       <input
         type="range"
         className="seek-bar"
         value={(this.props.currentTime / this.props.duration) || 0}
         max="1"
         min="0"
         step="0.01"
         onChange={this.props.handleTimeChange}
       />
       <div className="total-time">{this.props.duration}</div>

       </section>
       <section id="volume-control">
        <button id="volume-lower" onClick={this.props.handleVolumeDownClick}>
          <ion-icon name="volume-low"></ion-icon>
        </button>
        <input
            type="range" className="seek-bar"
            value={(this.props.volume)}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleVolumeChange}
          />
          <button id="volume-raise" onClick={this.props.handleVolumeUpClick}>
            <ion-icon name="volume-high"></ion-icon>
          </button>
       </section>
      </section>
    );
  }
}

export default PlayerBar;

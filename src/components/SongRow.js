import React, { Component } from 'react';

class SongRow extends Component {
  constructor(props) {
    super(props);


    this.state = {
      hovering: false
    };

  }

  hoverOver = () => {
    this.setState({hovering : true});
  }

  hoverOff = () => {
    this.setState({hovering : false});
  }


  render() {
    let trackNumber;
    if (this.state.hovering && !this.props.selectedSong) {
      trackNumber = <ion-icon name="play"></ion-icon>;
    }
    else if (this.props.selectedSong && this.props.isPlaying) {
      trackNumber = <ion-icon name="pause"></ion-icon>;
    }
    else if (this.props.selectedSong && !this.props.isPlaying) {
      trackNumber = <ion-icon name="play"></ion-icon>;
    }
    else {
      trackNumber = this.props.trackNumber;
    }

    return(
      <tr className="song"
      onClick={() => this.props.onClick(this.props.song)}
      onMouseEnter={this.hoverOver}
      onMouseLeave={this.hoverOff} >
        <td>{trackNumber}</td>
        <td>{this.props.song.title}</td>
        <td>{this.props.song.duration}</td>
      </tr>

    );
  }
}


export default SongRow;

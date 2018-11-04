import React from 'react';

const Landing = () => (
  <section className="landing">
    <h1 className="hero-title">Turn the music up!</h1>


  <section className="selling-points">

      <div className="point">
        <div>
          <h2 className="point-title">Choose your music</h2>
          <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose? </p>
            <div className="choose">
              <img src="./assets/images/landing-images/Chooseyourmusic.jpg" alt="girl surrounded by question marks"></img>
            </div>
        </div>
      </div>

      <div className="point">
      <div>
        <h2 className="point-title">unlimited, streaming, ad free</h2>
        <p className="point-description">No arbitrary limits. No distractions</p>
          <div className="unlimited">
            <img src="./assets/images/landing-images/Unlimited.jpeg" alt="arms up in freedom"></img>
          </div>
      </div>
      </div>

      <div className="point">
        <div>
          <h2 className="point-title">Mobile endabled</h2>
          <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            <div className="phone">
              <img src="./assets/images/landing-images/Mobile.jpg" alt="cell phone"></img>
            </div>
        </div>
      </div>

    </section>
  </section>
 );

export default Landing;

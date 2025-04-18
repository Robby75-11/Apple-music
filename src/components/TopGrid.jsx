import React from "react";
import img1 from "../assets/1a.png";
import img2 from "../assets/1b.png";
import img3 from "../assets/2a.png";
import img4 from "../assets/2c.png";
import img5 from "../assets/2d.png";
import img6 from "../assets/2e.png";
import img7 from "../assets/2f.png";
import img8 from "../assets/2b.png";

const TopGrid = () => {
  return (
    <div className="container mt-4">
      {/* Prima riga: 2 immagini grandi */}
      <div className="row mb-3">
        <div className="col-md-6">
          <img src={img1} alt="cover 1" className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <img src={img2} alt="cover 2" className="img-fluid rounded" />
        </div>
      </div>

      {/* Seconda riga: 6 immagini piccole */}
      <div className="row text-center">
        {[img3, img4, img5, img6, img7, img8].map((img, i) => (
          <div className="col-2" key={i}>
            <img
              src={img}
              alt={`cover ${i + 3}`}
              className="img-fluid rounded mb-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopGrid;

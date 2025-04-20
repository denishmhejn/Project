import React from "react";
import "../css/AdDisplayRight.css";

const AdDisplayRight = () => {
  const ads = [
    { id: 1, title: 'Ad 1', description: 'Banners1' },
    { id: 2, title: 'Ad 2', description: 'Banners2' },
    { id: 3, title: 'Ad 3', description: 'Banners3' },
    { id: 4, title: 'Ad 4', description: 'Banners4' },
  ];

  return (
    <div className="ad-display-right-container">
      <div className="ad-display-right-track">
        {ads.map((ad) => (
          <div key={ad.id} className="ad-display-right-card">
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdDisplayRight;
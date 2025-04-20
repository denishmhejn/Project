import React from "react";
import "../css/AdLayout.css";



const AdLayout = () => {
  const ads = [
    { id: 1, title: 'Ad 1', description: 'Banners1' },
    { id: 2, title: 'Ad 2', description: 'Banners2' },
    { id: 3, title: 'Ad 3', description: 'Banners3' },
    { id: 4, title: 'Ad 4', description: 'Banners4' },
  ];

  return (
    <div className="ad-slider">
      <div className="ad-track">
        {/* Original Ads */}
        {ads.map((ad) => (
          <div key={ad.id} className="ad-card">
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
          </div>
        ))}
        {/* Duplicate the first ad to create a seamless loop */}
       
      </div>
   
    </div>
  );
};
export default AdLayout;
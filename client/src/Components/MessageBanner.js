import { useState } from 'react';

const MessageBanner = () => {
  const [isBannerHidden, setIsBannerHidden] = useState(false);

  // Sets the amount of time the banner is displayed for 2.5 seconds
  setTimeout(() => {
    setIsBannerHidden(true);
  }, 2500);

  return (
    <div hidden={isBannerHidden}>
      <div className="container text-center bg-green-100 text-green-900 rounded w-5/12 m-auto cursor-pointer my-4">
        <h3 className="text-xl font-bold">Message header</h3>
        <p>Message body will go here</p>
      </div>
    </div>
  );
};

export default MessageBanner;

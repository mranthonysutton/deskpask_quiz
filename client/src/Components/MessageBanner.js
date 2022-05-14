const MessageBanner = (props) => {
  const { showBanner } = props;

  return (
    <div hidden={showBanner}>
      <div className="container text-center bg-green-100 text-green-900 rounded w-5/12 m-auto cursor-pointer my-4">
        <h3 className="text-xl font-bold py-2">Message has been received</h3>
      </div>
    </div>
  );
};

export default MessageBanner;

const NewMessageForm = () => {
  const labelStyles = 'uppercase text-sm opacity-80 font-bold';

  return (
    <div className="flex items-center justify-center">
      <div className="w-full mx-auto">
        <h3 className="text-4xl text-center text-blue-400">Create Message</h3>
        <form className="flex flex-col border-red-800 w-2/3 mx-auto">
          <label htmlFor="name" className={labelStyles}>
            Name
          </label>
          <input type="text" name="name" className="mb-4" />
          <label htmlFor="message" className={labelStyles}>
            Message
          </label>
          <input type="text" name="message" className="mb-4" />
          <label htmlFor="scheduled" className={labelStyles}>
            When to run
          </label>
          <div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="schedule-radio"
                id="schedule-now"
                defaultChecked={true}
              />
              <label
                className="form-check-label inline-block text-gray-800 cursor-pointer"
                htmlFor="schedule-now"
              >
                Now
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="schedule-radio"
                id="schedule-later"
              />
              <label
                className="form-check-label inline-block text-gray-800 mb-4"
                htmlFor="schedule-later"
              >
                Later
              </label>
            </div>
          </div>
          <label htmlFor="date" className={labelStyles}>
            Date
          </label>
          <input type="date" className="mb-4" />
          <label htmlFor="time" className={labelStyles}>
            Time
          </label>
          <input type="time" className="mb-4" />
          <label htmlFor="interval" className={labelStyles}>
            Repeats
          </label>
          <div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="repeats-radio"
                id="repeats-false"
                defaultChecked={true}
              />
              <label
                className="form-check-label inline-block text-gray-800 cursor-pointer"
                htmlFor="repeats-false"
              >
                No
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="repeats-radio"
                id="repeats-true"
              />
              <label
                className="form-check-label inline-block text-gray-800 mb-4"
                htmlFor="repeats-true"
              >
                Yes
              </label>
            </div>
          </div>
          <label htmlFor="interval-duration" className={labelStyles}>
            How often
          </label>
          <input type="number" name="interval-duration" className="mb-4" />
          <select>
            <option value="">Minute(s)</option>
            <option value="">Hour(s)</option>
            <option value="">Day(s)</option>
          </select>
        </form>
        <div className="flex justify-center w-2/3 mx-auto">
          <button className="bg-blue-500 text-white py-2 w-40 rounded-md text-xl hover:bg-blue-800 duration-200 my-4 mx-8">
            Schedule task
          </button>
          <button className="bg-red-600 text-white py-2 w-40 rounded-md text-xl hover:bg-red-700 duration-200 my-4 mx-8">
            Cancel task
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMessageForm;

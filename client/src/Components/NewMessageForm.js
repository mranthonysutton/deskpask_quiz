import { useState } from 'react';

const NewMessageForm = () => {
  const labelStyles = 'uppercase text-sm opacity-80 font-bold';

  // Sets the default values of the form
  const defaultFormState = {
    name: '',
    message: '',
    scheduled: 0,
    date: '',
    time: '',
    repeats: 0,
    intervalLength: 1,
    intervalType: 'SECOND',
  };

  const [messageForm, setMessageForm] = useState(defaultFormState);

  const handleFormChange = (evt) => {
    setMessageForm({ ...messageForm, [evt.target.name]: evt.target.value });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(messageForm);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full mx-auto">
        <h3 className="text-4xl text-center text-blue-400">Create Message</h3>
        <form
          className="flex flex-col border-red-800 w-2/3 mx-auto"
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="name" className={labelStyles}>
            Name
          </label>
          <input
            type="text"
            name="name"
            className="mb-4"
            onChange={handleFormChange}
          />
          <label htmlFor="message" className={labelStyles}>
            Message
          </label>
          <input
            type="text"
            name="message"
            className="mb-4"
            onChange={handleFormChange}
          />
          <label htmlFor="scheduled" className={labelStyles}>
            When to run
          </label>
          <div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="scheduled"
                id="schedule-now"
                defaultChecked={true}
                value={0}
                onChange={handleFormChange}
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
                name="scheduled"
                id="schedule-later"
                value={1}
                onChange={handleFormChange}
              />
              <label
                className="form-check-label inline-block text-gray-800 mb-4"
                htmlFor="schedule-later"
              >
                Later
              </label>
            </div>
          </div>
          <div hidden={messageForm['scheduled'] == 0}>
            <div className="flex flex-col">
              <label htmlFor="date" className={labelStyles}>
                Date
              </label>
              <input
                name="date"
                type="date"
                className="mb-4"
                onChange={handleFormChange}
              />
              <label htmlFor="time" className={labelStyles}>
                Time
              </label>
              <input
                type="time"
                name="time"
                className="mb-4"
                onChange={handleFormChange}
              />
            </div>
          </div>
          <label htmlFor="interval" className={labelStyles}>
            Repeats
          </label>
          <div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="repeats"
                id="repeats-false"
                defaultChecked={true}
                value={0}
                onChange={handleFormChange}
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
                name="repeats"
                id="repeats-true"
                value={1}
                onChange={handleFormChange}
              />
              <label
                className="form-check-label inline-block text-gray-800 mb-4"
                htmlFor="repeats-true"
              >
                Yes
              </label>
            </div>
          </div>
          <div hidden={messageForm['repeats'] == 0}>
            <div className="flex flex-col">
              <label htmlFor="interval-duration" className={labelStyles}>
                How often
              </label>
              <div>
                <input
                  type="number"
                  name="intervalLength"
                  className="mb-4"
                  min={1}
                  defaultValue={1}
                  onChange={handleFormChange}
                />
                <select name="intervalType" onChange={handleFormChange}>
                  <option value="SECOND">Second(s)</option>
                  <option value="MINUTE">Minute(s)</option>
                  <option value="HOUR">Hour(s)</option>
                  <option value="DAY">Day(s)</option>
                  <option value="WEEK">Week(s)</option>
                  <option value="MONTH">Month(s)</option>
                  <option value="YEAR">Year(s)</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-center w-2/3 mx-auto">
          <button
            className="bg-blue-500 text-white py-2 w-40 rounded-md text-xl hover:bg-blue-800 duration-200 my-4 mx-8"
            onClick={handleFormSubmit}
          >
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

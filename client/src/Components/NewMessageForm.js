import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../Utils/useAxios';

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
  const navigate = useNavigate();

  const handleFormChange = (evt) => {
    var { name, value } = evt.target;

    // Converts the the value of scheduled, repeats, and intervalLength to an integer before storing in state
    if (
      name === 'scheduled' ||
      name === 'repeats' ||
      name === 'intervalLength'
    ) {
      value = parseInt(value);
      setMessageForm({ ...messageForm, [name]: parseInt(value) });
      return;
    }

    setMessageForm({ ...messageForm, [name]: value });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    Axios()
      .post('/message', messageForm)
      .then((response) => console.log(response))
      .catch((error) => console.error(error.message));

    setMessageForm({ ...defaultFormState });

    navigate('/');
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
            value={messageForm['name']}
            onChange={handleFormChange}
            required
          />
          <label htmlFor="message" className={labelStyles}>
            Message
          </label>
          <input
            type="text"
            name="message"
            className="mb-4"
            onChange={handleFormChange}
            value={messageForm['message']}
            required
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
                value={0}
                onChange={handleFormChange}
                checked={messageForm['scheduled'] === 0}
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
                checked={messageForm['scheduled'] === 1}
              />
              <label
                className="form-check-label inline-block text-gray-800 mb-4"
                htmlFor="schedule-later"
              >
                Later
              </label>
            </div>
          </div>
          <div hidden={messageForm['scheduled'] === 0}>
            <div className="flex flex-col">
              <label htmlFor="date" className={labelStyles}>
                Date
              </label>
              <input
                name="date"
                type="date"
                className="mb-4"
                onChange={handleFormChange}
                required={messageForm['scheduled'] === 1}
                value={messageForm['date']}
              />
              <label htmlFor="time" className={labelStyles}>
                Time
              </label>
              <input
                type="time"
                name="time"
                className="mb-4"
                onChange={handleFormChange}
                value={messageForm['time']}
                required={messageForm['scheduled'] === 1}
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
                value={0}
                onChange={handleFormChange}
                checked={messageForm['repeats'] === 0}
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
                checked={messageForm['repeats'] === 1}
              />
              <label
                className="form-check-label inline-block text-gray-800 mb-4"
                htmlFor="repeats-true"
              >
                Yes
              </label>
            </div>
          </div>
          <div hidden={messageForm['repeats'] === 0}>
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
                  onChange={handleFormChange}
                  value={messageForm['intervalLength']}
                />
                <select
                  name="intervalType"
                  onChange={handleFormChange}
                  value={messageForm['intervalType']}
                >
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
          <div className="flex justify-center w-2/3 mx-auto">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 w-40 rounded-md text-xl hover:bg-blue-800 duration-200 my-4 mx-8"
            >
              Schedule task
            </button>
            <Link to="/">
              <button className="bg-red-600 text-white py-2 w-40 rounded-md text-xl hover:bg-red-700 duration-200 my-4 mx-8">
                Cancel task
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMessageForm;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Form = () => {
  const [feedback, setFeedback] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  //Get Feedbacks collection from local storage, if it exists
  useEffect(() => {
    const localFeedbacks = localStorage.getItem("feedbacks");
    if (localFeedbacks) {
      setFeedbacks(JSON.parse(localFeedbacks));
    }
  }, []);

  //On submit, update collection with the new feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(feedback));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      setFeedbacks([...feedbacks, feedback]);
      setFeedback({});
      setShowSuccess(true);
    }
  }, [errors]);

  //Show success message and reset form
  const handleContinue = () => {
    var form = document.getElementById("main-form");
    form.reset();
    setShowSuccess(false);
  };

  //Update feedback fields on change
  function handleChange(e) {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  }

  //Validate radio inputs
  const validate = (values) => {
    const formErrors = {};

    if (!values.hostXp) {
      formErrors.hostXp = "* Please select an option.";
    }

    if (!values.beverageXp) {
      formErrors.beverageXp = "* Please select an option.";
    }

    if (!values.diningXp) {
      formErrors.diningXp = "* Please select an option.";
    }

    if (!values.cleanXp) {
      formErrors.cleanXp = "* Please select an option.";
    }

    return formErrors;
  };

  //On change of collection(i.e. on submit), save collection to local storage
  useEffect(() => {
    if (feedbacks.length !== 0)
      localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  return (
    <div className="form-container">
      <AnimatePresence exitBeforeEnter>
        {showSuccess && (
          <motion.div className="success-show"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      transition={{duration:0.25}}>
        {/* {showSuccess ? "success-show" : "success-hide"} */}
        <motion.div className="success-msg"
          initial={{ opacity: 0, y:'-10rem', x:-125 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{delay:0.25, duration:0.5}}>
          <p>Thank you for completing the information.</p>
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </motion.div>
      </motion.div>
      )}
      </AnimatePresence>
      

      <form
        className="form-wrapper"
        id="main-form"
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-column form-left">
          <div className="form-intro">
            <h2>Aromatic Bar</h2>
            <p>
              We are committed to providing you with the best dining experience
              possible, so we welcome your comments. Please fill out this
              questionnaire. Thank you.
            </p>
          </div>
          <div className="fields">
            <div className="field">
              <input
                type="text"
                name="name"
                id="name"
                value={feedback.name}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
              />
              <label htmlFor="name" className="label-name">
                <span className="label-text">
                  Name
                  <span className="error-indicator active-error-indicator">
                    {errors.name}
                  </span>
                </span>
              </label>
            </div>

            <div className="field">
              <input
                type="email"
                name="email"
                id="email"
                value={feedback.email}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
                pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
              />
              <label htmlFor="email" className="label-name">
                <span className="label-text">
                  Email <span className="error-indicator">*</span>
                </span>
              </label>
            </div>

            <div className="field">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={feedback.phone}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
                pattern="\+[0-9]{2,3}-[0-9]{10}"
              />
              <label htmlFor="phone" className="label-name">
                <span className="label-text">
                  Phone <span className="error-indicator">*</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-column form-right">
          <div className="radio-field">
            <h4>
              1 . Please rate the quality of the service you received from your
              host.
            </h4>
            <div className="buttons">
              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="hostXp"
                    value="Excellent"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Excellent</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="hostXp"
                    value="Good"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Good</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="hostXp"
                    value="Fair"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Fair</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="hostXp"
                    value="Bad"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Bad</span>
              </div>
            </div>
            <div className="radio-error">{errors.hostXp}</div>
          </div>

          <div className="radio-field">
            <h4>2 . Please rate the quality of your beverage.</h4>
            <div className="buttons">
              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="beverageXp"
                    value="Excellent"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Excellent</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="beverageXp"
                    value="Good"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Good</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="beverageXp"
                    value="Fair"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Fair</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="beverageXp"
                    value="Bad"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Bad</span>
              </div>
            </div>
            <div className="radio-error">{errors.beverageXp}</div>
          </div>

          <div className="radio-field">
            <h4>3 . Was our restaurant clean?</h4>
            <div className="buttons">
              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="cleanXp"
                    value="Excellent"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Excellent</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="cleanXp"
                    value="Good"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Good</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="cleanXp"
                    value="Fair"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Fair</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="cleanXp"
                    value="Bad"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Bad</span>
              </div>
            </div>

            <div className="radio-error">{errors.cleanXp}</div>
          </div>

          <div className="radio-field">
            <h4>4 . Please rate your overall dining experience.</h4>
            <div className="buttons">
              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="diningXp"
                    value="Excellent"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Excellent</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="diningXp"
                    value="Good"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Good</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="diningXp"
                    value="Fair"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Fair</span>
              </div>

              <div className="button">
                <label className="form-radio">
                  <input
                    type="radio"
                    name="diningXp"
                    value="Bad"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="radio-mark"></span>
                </label>
                <span>Bad</span>
              </div>
            </div>
            <div className="radio-error">{errors.diningXp}</div>
          </div>
          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

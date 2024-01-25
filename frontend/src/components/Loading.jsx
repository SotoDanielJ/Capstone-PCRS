import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import '../style/Loading.css'
import PropTypes from "prop-types";

const Loading = ({ loading }) => {
  return (
    <div className="loading">
      {loading && (
        <BeatLoader
          size={50}
          color={"white"}
          loading={loading}
          speedMultiplier={1}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
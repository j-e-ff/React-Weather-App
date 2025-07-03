import noResultIcon from "../assets/icons/no-result.svg";

const NoResultsDiv = () => {
  return (
    <div className="no-results">
      <img src={noResultIcon} alt="No Results Found" className="icon" />
      <h2 className="titl">Something went wrong</h2>
      <p className="message">
        Unable to retrieve the weather details. Ensure the city is valid
      </p>
    </div>
  );
};

export default NoResultsDiv;

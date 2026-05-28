import "./BusinessList.css";
import Business from "../Business/Business";
function BuisnessList({businesses}) {
  return (
    <div className="BuisnessList">
      {businesses.map((business, index) => {
        return <Business business={business} key={index}  />
      })}
    </div>
  );
}
export default BuisnessList;
import "./HomePage.css";
import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import BusinessList from "../components/BusinessList/BusinessList";
import Navigation from "../components/Navigation/Navigation";
import Subscription from "../components/Subscription/Subscription";
import Footer from "../components/Footer/Footer";
import searchBusinesses from "../util/yelp";

export default function HomePage() {
    const [businesses, setBusinesses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const searchYelp = async (term, location, sortBy) => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchBusinesses(term, location, sortBy);
            setBusinesses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="HomePage">
            <Navigation />
            <h1>PlateScout</h1>
            <SearchBar searchYelp={searchYelp} />
            {loading && <p className="HomePage-status">Loading…</p>}
            {error && <p className="HomePage-status HomePage-status--error">{error}</p>}
            {!loading && !error && <BusinessList businesses={businesses} />}
            <Subscription />
            <Footer />
        </div>
    );
}
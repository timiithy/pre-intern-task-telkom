const StatCard = ({ title, value }) => {
    return (
        <div className="card card-outline" style={{ minWidth: "220px" }}>
            <div className="card-content center-align">
                <span className="card-title">{title}</span>
                <h5>{value}</h5>
            </div>
        </div>
    );
};

export default StatCard;

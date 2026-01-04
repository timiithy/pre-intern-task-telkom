const RecentBorrowTable = ({ data = [] }) => {
    return (
        <div className="card-outline">
            <table className="highlight responsive-table">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Nama User</th>
                        <th>Judul Buku</th>
                        <th>Lama (Hari)</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="center-align">
                                Tidak ada data
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.user}</td>
                                <td>{item.book}</td>
                                <td>{item.duration}</td>
                                <td>
                                    <span
                                        className={`status-badge ${item.status === "Dipinjam"
                                                ? "active"
                                                : "done"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RecentBorrowTable;

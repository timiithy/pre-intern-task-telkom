const RecentBorrowTable = ({ data = [] }) => {
    return (
        <div className="card-outline">
            <div className="table-scroll">
                <table className="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Nama User</th>
                            <th>Judul Buku</th>
                            <th>Lama (Hari)</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="center-align">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id_peminjaman}>
                                    <td>{item.pengguna_detail?.nama || "-"}</td>
                                    <td>{item.buku_detail?.nama_buku || "-"}</td>
                                    <td>{item.durasi}</td>
                                    <td>
                                        <span
                                            className={`status-badge ${item.returned_at ? "done" : "active"
                                                }`}
                                        >
                                            {item.returned_at ? "Dikembalikan" : "Dipinjam"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentBorrowTable;

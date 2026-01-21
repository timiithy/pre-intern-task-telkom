const RecentBorrowTable = ({ data = [] }) => {
    // prepare data: try to sort by date field if present, otherwise assume server order
    const prepared = (() => {
        if (!data || data.length === 0) return [];
        const arr = [...data];
        const sample = arr[0];
        const dateField = sample?.tanggal_pinjam ? 'tanggal_pinjam' : (sample?.created_at ? 'created_at' : null);

        if (dateField) {
            arr.sort((a, b) => new Date(b[dateField]) - new Date(a[dateField]));
        }

        return arr.slice(0, 10);
    })();

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
                        {prepared.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="center-align">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            prepared.map((item) => (
                                <tr key={item.id_peminjaman}>
                                    <td>{item.pengguna_detail?.nama || "-"}</td>
                                    <td>{item.buku_detail?.nama_buku || "-"}</td>
                                    <td>{item.durasi}</td>
                                    <td>
                                        <span
                                            className={`status-badge ${item.status === "selesai" ? "done" : "active"}`}
                                        >
                                            {item.status === "selesai" ? "Selesai" : "Dipinjam"}
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

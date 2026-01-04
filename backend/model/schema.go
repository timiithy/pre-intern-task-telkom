package models

import (
	"time"

	"github.com/google/uuid"
)

type Buku struct {
	IDBuku   uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid();column:id_buku" json:"id_buku"`
	NamaBuku string    `gorm:"column:nama_buku" json:"nama_buku"`
}

func (Buku) TableName() string {
	return "buku"
}

type Pengguna struct {
	IDPengguna uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid();column:id_pengguna" json:"id_pengguna"`
	Nama       string    `gorm:"column:nama" json:"nama"`
}

func (Pengguna) TableName() string {
	return "pengguna"
}

type Peminjaman struct {
	IDPeminjaman uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid();column:id_peminjaman" json:"id_peminjaman"`
	Durasi       int16      `gorm:"type:smallint" json:"durasi"`
	IDPengguna   uuid.UUID  `gorm:"type:uuid;column:id_pengguna" json:"id_pengguna"`
	IDBuku       uuid.UUID  `gorm:"type:uuid;column:id_buku" json:"id_buku"`
	ReturnedAt   *time.Time `gorm:"column:returned_at" json:"returned_at,omitempty"`
	Pengguna     Pengguna   `gorm:"foreignKey:IDPengguna;references:IDPengguna" json:"pengguna_detail,omitempty"`
	Buku         Buku       `gorm:"foreignKey:IDBuku;references:IDBuku" json:"buku_detail,omitempty"`
}

func (Peminjaman) TableName() string {
	return "peminjaman"
}

type Dashboard struct {
	TotalBuku   int64 `json:"total_buku"`
	TotalUser   int64 `json:"total_user"`
	TotalPinjam int64 `json:"total_pinjam"`
}

type TopPengguna struct {
	IDPengguna  uuid.UUID `gorm:"column:id_pengguna" json:"id_pengguna"`
	Nama        string    `gorm:"column:nama" json:"nama"`
	TotalPinjam int64     `gorm:"column:total_pinjam" json:"total_pinjam"`
}

type TopBuku struct {
	IDBuku      uuid.UUID `gorm:"column:id_buku" json:"id_buku"`
	NamaBuku    string    `gorm:"column:nama_buku" json:"nama_buku"`
	TotalPinjam int64     `gorm:"column:total_pinjam" json:"total_pinjam"`
}

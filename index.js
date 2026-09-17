const readlineSync = require("readline-sync");
const fs = require("fs");

class StockManager {
    constructor() {
        this.DaftarBarang = [];
    }

    tampilkanBarang() {
        this.DaftarBarang.forEach(b => {
            let total = b.stok * b.harga;
            console.log(`${b.id}. ${b.nama.padEnd(20)} Stok: ${b.stok} Harga: ${b.harga} Total Nilai: ${total}`);
        });
    }

    tambahBarang(nama, stok, harga) {
        let newId = this.DaftarBarang.length + 1;
        this.DaftarBarang.push({ id: newId, nama, stok: Number(stok), harga: Number(harga) });
    }

    barangMasuk(id, jumlah) {
        const barang = this.DaftarBarang.find(item => item.id === id);

        if (barang) {
            barang.stok += jumlah;
            console.log(`Berhasil menambahkan stok ${barang.nama}. Stok sekarang: ${barang.stok}`);
        } else {
            console.log(`Barang dengan ID ${id} tidak ditemukan.`);
        }
    }

    barangKeuar(id, jumlah) {
        const barang = this.DaftarBarang.find(item => item.id === id);

        if (barang) {
            if (jumlah > barang.stok) {
                console.log(`Barang yang keluar lebih dari stok. Stok sekarang: ${barang.stok}`);
            } else {
                barang.stok -= jumlah;
                console.log(`Berhasil mengurangi stok ${barang.nama}. Stok sekarang: ${barang.stok}`);
            }
        } else {
            console.log(`Barang dengan ID ${id} tidak ditemukan.`);
        }
    }

    hapusBarang(id) {
        return this.DaftarBarang.filter(item => item.id !== id);
    }

    cekStokMenipis(batas = 10) {
        return this.DaftarBarang.filter(b => b.stok <= batas);
    }

    simpan(){
        fs.writeFileSync("stock.json", JSON.stringify(this.DaftarBarang, null, 2));
    }

    muat(){
        if (fs.existsSync("stock.json")){
            const data = fs.readFileSync("stock.json", "utf-8");
            this.DaftarBarang = JSON.parse(data);
        }
    }
}

const manager = new StockManager();

console.log("=== Manajemen Stok Barang ===");

manager.muat();

while (true) {
    console.log(
        "\n1. Lihat Stok \n2. Tambah Barang \n3. Barang Masuk \n4. Barang Keluar \n5. Hapus Barang \n6. Cek Stok Menipis \n7. Keluar",
    );
    const pilihan = Number(readlineSync.question("Pilih Menu: "));
    switch (pilihan) {
        case 1:
            try {
                manager.tampilkanBarang();
            } catch (error) {
                console.log("Terjadi Masalah Saat Menampilkan Data!");
                console.log("Pesan Error: ", error.message);
            }
            break;
        case 2:
            const nama = readlineSync.question("Masukan Nama Barang: ");
            let stok;
            while (true) {
                stok = Number(readlineSync.question("Masukan Stok: "));

                if (!isNaN(stok) && stok >= 0) {
                    break;
                }

                console.log("Stok tidak boleh minus atau berupa teks!\n");
            }
            let harga;
            while (true) {
                harga = Number(readlineSync.question("Masukan Harga: "));

                if (!isNaN(harga) && harga >= 0) {
                    break;
                }

                console.log("Harga tidak boleh minus atau berupa teks!");
            }
            try {
                manager.tambahBarang(nama, stok, harga);
            } catch (error) {
                console.log("Terjadi Masalah Saat Menambahkan Data!");
                console.log("Pesan Error: ", error.message);
            }
            console.log("Barang Berhasil ditambahkan");
            manager.simpan();
            break;
        case 3:
            manager.tampilkanBarang();
            let idMasuk;
            while (true) {
                idMasuk = Number(readlineSync.question("Masukan Id Barang Yang Masuk: "));
                if (isNaN(idMasuk)) {
                    console.log("ID harus berupa angka!");
                    continue;
                }
                const barang = manager.DaftarBarang.find(b => b.id === idMasuk);
                if (barang) {
                    break;
                }
                console.log("ID tidak ditemukan. Masukan ID yang valid.\n");
            }
            let jumlahmasuk;
            while (true) {
                jumlahmasuk = Number(readlineSync.question("Masukan Jumlah barang yang masuk: "));

                if (!isNaN(jumlahmasuk) && jumlahmasuk >= 0) {
                    break;
                }

                console.log("Jumlah yang dimasukan tidak boleh minus atau teks\n");
            }
            manager.barangMasuk(idMasuk, jumlahmasuk);
            console.log("barang berhasil masuk");
            manager.simpan();
            break;
        case 4:
            manager.tampilkanBarang();
            let idKeluar;
            while (true) {
                idKeluar = Number(readlineSync.question("Masukan Id Barang yang keluar: "));
                if (isNaN(idKeluar)) {
                    console.log("ID harus berupa angka!");
                    continue;
                }
                const barang = manager.DaftarBarang.find(b => b.id === idKeluar);
                if (barang) {
                    break;
                }
                console.log("ID tidak ditemukan. Masukan ID yang valid.\n");
            }
            let jumlahKeluar;
            while (true) {
                jumlahKeluar = Number(readlineSync.question("Masukan Jumlah Barang Yang keluar: "));

                if (!isNaN(jumlahKeluar) && jumlahKeluar >= 0) {
                    break;
                }

                console.log("Stock yang keluar tidak boleh minus atau kata\n");
            }
            manager.barangKeuar(idKeluar, jumlahKeluar);
            console.log("Barang berhasil keluar");
            manager.simpan();
            break;
        case 5:
            manager.tampilkanBarang();
            let idHapus;
            while (true) {
                idHapus = Number(readlineSync.question("Masukan Id barang yang ingin dihapus: "));

                if (isNaN(idHapus)) {
                    console.log("id harus berupa angka!");
                    continue;
                }

                const adaBarang = manager.DaftarBarang.find(b => b.id === idHapus);

                if (adaBarang) {
                    break;
                }

                console.log("Id Anda tidak ditemukan\n");
            }
            manager.hapusBarang(idHapus);
            console.log("Barang berhasil dihapus");
            manager.simpan();
            break;
        case 6:
            const menipis = manager.cekStokMenipis();
            if (menipis.length > 0) {
                console.log("Barang dengan stok menipis:");
                menipis.forEach(b => console.log(`${b.id}. ${b.nama} - Stok: ${b.stok}`));
            } else {
                console.log("Tidak ada barang dengan stok menipis.");
            }
            break;
        case 7:
            process.exit(0);
            break;
    }
}

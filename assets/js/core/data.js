// DATA LAYER — satu-satunya modul yang tahu dari mana data berasal.
// Kalau nanti pindah ke API/Supabase, cukup ganti isi fungsi ini.
let pending = null;

export function loadData(url = "data/portfolio.json") {
  if (!pending) {
    pending = fetch(url, { cache: "no-cache" }).then(res => {
      if (!res.ok) throw new Error(`Gagal memuat ${url} (HTTP ${res.status})`);
      return res.json();
    });
  }
  return pending;
}

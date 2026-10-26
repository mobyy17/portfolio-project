// DOMAIN LAYER — turunan data mentah yang dipakai lebih dari satu halaman.
// Tidak menyentuh DOM.

export function orgLists(data) {
  const o = data.organisasi;
  if (Array.isArray(o)) return { kuliah: o, sma: [] };
  return {
    kuliah: Array.isArray(o?.kuliah) ? o.kuliah : [],
    sma: Array.isArray(o?.sma) ? o.sma : [],
  };
}

// unik per nama: TypeScript muncul di FrontEnd & Bahasa tapi dihitung sekali
export const allSkills = data => {
  const seen = new Set();
  return (data.skill || []).flatMap(k => k.items || []).filter(s => !seen.has(s.nama) && seen.add(s.nama));
};

export const projects = data => (data.proyek || []).filter(p => p.judul);

export const achievements = data => (data.pendidikan || []).flatMap(p => p.prestasi || []);

export function stats(data) {
  const { kuliah, sma } = orgLists(data);
  return {
    ipk: data.profil?.ipk || "-",
    organisasi: kuliah.length + sma.length,
    skill: allSkills(data).length,
    proyek: projects(data).length,
    prestasi: achievements(data).length,
  };
}

import { t } from "./i18n.js";

// ringkasan per halaman untuk kartu "pintu" di Biodata
export function routeSummaries(data) {
  const s = stats(data);
  const { kuliah, sma } = orgLists(data);
  return {
    pendidikan: t("sum.pendidikan", { n: (data.pendidikan || []).length, a: s.prestasi }),
    organisasi: t("sum.organisasi", { k: kuliah.length, s: sma.length }),
    skill: t("sum.skill", { n: s.skill, c: (data.skill || []).length }),
    proyek: t("sum.proyek", { n: s.proyek }),
    kontak: t("sum.kontak", { n: 4 }), // halaman Kontak: Instagram, GitHub, LinkedIn, Email
    musik: t("sum.musik"),
  };
}

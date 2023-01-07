const { test, expect } = require("@playwright/test");
require("dotenv").config();
const allQuetions = 20;
const allMatkul = 8; // sesuaikan dengan matkul yang di ambil
// saran lebih baik tidak auto
const saranByMatkul = [
    'tugas yang di berikan kadang kesan seperti "ini buat apasi"', // matkul 1
    'tugas yang di berikan kadang kesan seperti "ini buat apasi"', // matkul 2
    "jangan lupa upload materi di spot bu, sama toleransi yang telat cuman 10 menit", // matkul 3
    "kejelasan tugas kurang jelas", // matkul 4
    "komunikasi adalah kunci utama, jadi fast respon ya bu", // matkul 5
    "best dosen semester ini", // matkul 6
    "over all enak cara mengajar", // matkul 7
    "kebanyakan luring untuk bobot kuliah yang bisa di daringkan", // matkul 8
];
test.describe("Auto", () => {
    for (let j = 0; j < allMatkul; j++) {
        test("Quetioner " + j, async ({ page }) => {
            await page.goto("http://sino2.upi.edu/evaluasi-pbm/kuisioner.php");
            await page.getByRole("button", { name: "Lanjut >" }).click();
            await page.waitForTimeout(1000);
            await page.locator('input[name="NIM"]').fill(process.env.SPOT_NIM);
            await page
                .locator('input[name="PASS"]')
                .fill(process.env.SPOT_PASSWORD);
            await page.getByRole("button", { name: "Lanjut >" }).click();
            await page.$('input[name="btnlanjut"]').then((el) => el.click());
            function qNumber(i, random) {
                if (i < 10) return `#K0${i}3${random}`;
                return `#K${i}3${random}`;
            }
            for (let i = 1; i <= allQuetions; i++) {
                // random from 1 to 3
                const random = Math.floor(Math.random() * 3) + 1;
                await page.$(qNumber(i, random)).then((el) => el.click());
            }
            await page
                .$('textarea[name="saran"]')
                .then((el) => el.fill(saranByMatkul[j]));
            await page.$('input[value="Submit"]').then((el) => el.click());
        });
    }
});

const { test, expect } = require("@playwright/test");
require("dotenv").config();
const allQuetions = 20;
const allMatkul = 8; // sesuaikan dengan matkul yang di ambil
// saran lebih baik tidak auto
const saranByMatkul = [
    // ngurut dari atas ke bawah di web kuesioner nya
    'Mantap, cara ngajarnya enak"', // matkul 1
    'Mantap, cara ngajarnya enak"', // matkul 2
    'Mantap, cara ngajarnya enak"', // matkul 3
    'Mantap, cara ngajarnya enak"', // matkul 4
    'Mantap, cara ngajarnya enak"', // matkul 5
    'Mantap, cara ngajarnya enak"', // matkul 6
    'Mantap, cara ngajarnya enak"', // matkul 7
    'Mantap, cara ngajarnya enak"', // matkul 8
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

# Automate-Testing-Exam

โปรเจกต์นี้เป็นชุดการทดสอบระบบอัตโนมัติ (Automated Testing) ที่พัฒนาขึ้นโดยใช้ **Playwright** และ **TypeScript** เพื่อทดสอบฟังก์ชันการทำงานของเว็บไซต์ [https://dev.app.agnoshealth.com/ai_dashboard/agnos/sign_up/]

## เทคโนโลยีที่ใช้ (Tech Stack)

* **Framework:** [Playwright](https://playwright.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Test Runner:** Playwright Test Runner

------------------------------------------------------------------------------------------------------

## ข้อกำหนดเบื้องต้น (Prerequisites)

ก่อนเริ่มใช้งาน ตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งสิ่งเหล่านี้แล้ว:
* [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน 18 ขึ้นไป)
* npm (มาพร้อมกับ Node.js)

--------------------------------------------------------------------------------------------------------------

## การเริ่มใช้งาน (Getting Started)

1. **Clone โปรเจกต์:**
   ```bash
   git clone [https://github.com/Baitong012/Automate-Testing-Exam.git](https://github.com/Baitong012/Automate-Testing-Exam.git)
   cd Automate-Testing-Exam

2. ติดตั้ง Dependencies:
    npm install

3.ติดตั้ง Playwright Browsers:
    npx playwright install

-------------------------------------------------------------------------------------

# การรันแบบทดสอบ (Running Tests)

คุณสามารถเลือกการรันได้หลายรูปแบบตามความต้องการ:

1. รันการทดสอบทั้งหมด (Headless mode):
    npm test

-------------------------------------------------------------------------------------

#รายงานผลการทดสอบ (Test Reports)

หลังจากรันการทดสอบเสร็จสิ้น คุณสามารถดูรายงานผลในรูปแบบ HTML ได้ด้วยคำสั่ง:
    npx playwright show-report

--------------------------------------------------------------------------------------

##โครงสร้างโฟลเดอร์

tests/: เก็บไฟล์บททดสอบทั้งหมด (.spec.ts)

playwright.config.ts: ไฟล์ตั้งค่าหลักของ Playwright (เช่น timeout, browser, baseURL)

package.json: รายการ dependencies และ scripts ของโปรเจกต์
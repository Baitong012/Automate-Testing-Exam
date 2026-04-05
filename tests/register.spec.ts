import { test, expect } from '@playwright/test';

test.describe('Sign Up - AGNOS', () => { //การตั้งชื่อ อีเว้นการทอดสอบการสมัครสมาชิก

  test.beforeEach(async ({ page }) => { //การระบุ url ทดสอบการสมัครสมาชิก
    await page.goto(
      'https://dev.app.agnoshealth.com/ai_dashboard/agnos/sign_up/'
    );
  });

  /**
   * ✅ HAPPY PATH
   * Password และ Confirm Password ตรงกัน
   * Expected: สมัครสำเร็จ และ redirect ไปหน้า login
   */
  test('สมัครสมาชิก - password ตรงกัน', async ({ page }) => {  //หัวข้อตัวเคสทอดสอบจริง โดยตั้งชื่อว่า สมัครสมาชิก
    await page.locator('#Email').fill('test@example.com'); //การระบุ email ที่ใช่ทดสอบการสมัครสมาชิก

    // Password
    await page
      .locator('div.css-1euqg25') //การระบุตัวไปที่ element ที่ต้องการทดสอบ
      .filter({ hasText: 'Password' }) //การระบุตัวไปที่ text ที่ต้องการทดสอบ
      .first() //การระบุเลือก Element ตัวแรกสุด
      .locator('input') //การระบุตัวไปที่ element ที่ต้องการทดสอบ
      .fill('Test1234$'); //การระบุตัวไปที่ value ที่ต้องการทดสอบ

    // Confirm Password
    await page
      .locator('div.css-1euqg25') //การระบุตัวไปที่ element ที่ต้องการทดสอบ
      .filter({ hasText: 'Confirm Password' }) //การระบุตัวไปที่ text ที่ต้องการทดสอบ
      .locator('input') //การระบุตัวไปที่ element ที่ต้องการทดสอบ
      .fill('Test1234$'); //การระบุตัวไปที่ value ที่ต้องการทดสอบ  

    const confirmBtn = page.getByRole('button', { name: /^Confirm$/i }); //การสร้างตัวแปรสำหรับการคลิกปุ่ม Confirm
    await expect(confirmBtn).toBeEnabled(); //การตรวจสอบว่าปุ่ม Confirm ทำงานได้

    await confirmBtn.click(); //การคลิกปุ่ม Confirm

    await expect(page).toHaveURL( //การตรวจสอบว่า URL เปลี่ยนไปหน้า login
      'https://dev.app.agnoshealth.com/ai_dashboard/login', //การระบุ URL ที่ต้องการทดสอบ
      { timeout: 10000 } //ให้เวลาระบบทำงานได้สูงสุด 10 วินาที (เผื่อกรณีเซิร์ฟเวอร์ตอบสนองช้า) ถ้าเกิน 10 วินาทีแล้ว URL ยังไม่เปลี่ยน เทสต์จะถือว่า "ไม่ผ่าน" (Failed) 
    );
  });

  /**
   * ❌ NEGATIVE CASE
   * Password และ Confirm Password ไม่ตรงกัน
   * Expected:
   * - ต้องแสดง error message แจ้งว่า password ไม่ตรงกัน
   *
   * หมายเหตุ:
   * - ไม่ตรวจสอบ disabled button ตาม requirement ล่าสุด
   */
  test('สมัครสมาชิก - confirm password ไม่ตรงกัน ต้องแสดง error และไม่ redirect', async ({ page }) => { 
    //หัวข้อตัวเคสทอดสอบจริง โดยตั้งชื่อว่า สมัครสมาชิก - confirm password ไม่ตรงกัน ต้องแสดง error และไม่ redirect
    // ✅ เก็บ URL หน้า Sign Up
    const signUpUrl = page.url(); 

    await page.locator('#Email').fill('test@example.com');

    // Password
    await page
      .locator('div.css-1euqg25')
      .filter({ hasText: 'Password' })
      .first()
      .locator('input')
      .fill('Test1234$');

    // Confirm Password (ไม่ตรง)
    await page
      .locator('div.css-1euqg25')
      .filter({ hasText: 'Confirm Password' })
      .locator('input')
      .fill('Test34$');

    // ✅ กด Submit
    await page.getByRole('button', { name: /^Confirm$/i }).click(); //ต้องกดปุ่ม Confirm ถ้าไม่กด ตัว error message จะไม่ปรากฏ

    // ✅ ตรวจสอบ error message (ยึด text จริง)
    const errorText = 'Confirm password does not match the password.'; //เป็นการระบุข้อความ error 
    const confirmPasswordError = page.getByText(errorText); //เป็นการเช็ค error message ว่ามีหรือไม่ 

    if (await confirmPasswordError.count() === 0) {
      throw new Error(
        `❌ Test Failed: ไม่พบ error message "${errorText}" หลังจากกด Confirm`
      );
    }

    await expect(confirmPasswordError).toBeVisible();

    // ✅ รอให้ครบเวลาที่ระบบมัก redirect
    await page.waitForTimeout(12000); //ให้เวลาระบบทำงานได้สูงสุด 12 วินาที (เผื่อกรณีเซิร์ฟเวอร์ตอบสนองช้า) ถ้าเกิน 12 วินาทีแล้ว URL ยังไม่เปลี่ยน เทสต์จะถือว่า "ไม่ผ่าน" (Failed) 

    // ✅ ตรวจสอบว่าไม่ควร redirect
    const currentUrl = page.url(); //เป็นการเช็ค URL ว่ามีหรือไม่ 

    if (currentUrl !== signUpUrl) { //ถ้า URL ไม่เปลี่ยน เทสต์จะถือว่า "ไม่ผ่าน" (Failed)
      throw new Error(
        [
          '❌ Test Failed: ระบบ redirect ทั้งที่ Confirm Password ไม่ตรงกับ Password',
          `Expected URL (should stay): ${signUpUrl}`,
          `Actual URL (redirected): ${currentUrl}`,
          'Expected behavior: แสดง error และต้องอยู่หน้า Sign Up เดิม'
        ].join('\n')
      );
    }
  });

  test('สมัครสมาชิก - password ไม่ตรงตามเงื่อนไข ต้องแสดง error message', async ({ page }) => {
    await page.locator('#Email').fill('test@example.com');

    // ❌ Password ไม่ตรง policy
    await page
      .locator('div.css-1euqg25')
      .filter({ hasText: 'Password' })
      .first()
      .locator('input')
      .fill('test1234');

    // Confirm Password ใส่เหมือนกัน เพื่อ isolate เฉพาะ password policy
    await page
      .locator('div.css-1euqg25')
      .filter({ hasText: 'Confirm Password' })
      .locator('input')
      .fill('test1234');

    // ✅ กด Submit
    await page.getByRole('button', { name: /^Confirm$/i }).click();

    // ✅ ตรวจสอบ error message (ยึด text จริง)
    const passwordPolicyErrorText =
      'The password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character.';

    const passwordError = page.getByText(passwordPolicyErrorText);

    // ✅ ทำให้ผล test อ่านเข้าใจง่าย ถ้าไม่เจอ error
    if (await passwordError.count() === 0) {
      throw new Error(
        '❌ Test Failed: ไม่พบ error message สำหรับ Password ที่ไม่ตรงตามเงื่อนไข (Password Policy)'
      );
    }

    await expect(passwordError).toBeVisible();
  });

  test('สมัครสมาชิก - email ผิด format ต้องแสดง error message หลัง submit', async ({ page }) => {
    // ❌ Email ผิด format
    await page.locator('#Email').fill('test');

    // กรอก password ให้ครบ
    await page
      .locator('div.css-1euqg25')
      .filter({ hasText: 'Password' })
      .first()
      .locator('input')
      .fill('Test1234$');

    await page
      .locator('div.css-1euqg25')
      .filter({ hasText: 'Confirm Password' })
      .locator('input')
      .fill('Test1234$');

    // ✅ กด Submit (Confirm) ก่อน
    const confirmBtn = page.getByRole('button', { name: /^Confirm$/i });
    await confirmBtn.click();

    // ✅ ตรวจสอบ error message โดยยึด text จริง
    const emailError = page.getByText(
      "The email should be in the format 'test@example.com'"
    );

    if (await emailError.count() === 0) {
      throw new Error(
        "❌ Test Failed: ไม่พบ error message หลังจากกด Confirm ด้วย Email format ไม่ถูกต้อง"
      );
    }

    await expect(emailError).toBeVisible();

  });

});
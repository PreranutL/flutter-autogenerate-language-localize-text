$(document).ready(function() {

    // generate output strings
    $("#submit").click(function() {
      let variableNames = $("#uiString").val();
      let engLocalizedValue = $("#engText").val();
      let thLocalizedValue = $("#thText").val();
      let uiStringOutput = "  static String get " + variableNames + " => LanguageLocalizations.getText('" + variableNames + "');";
      let engLocalizedValuesOutput = "'" + variableNames + "': '" + engLocalizedValue + "',";
      let engLocalizedValuesTestOutput = "expect(LanguageLocalizations.getText('" + variableNames + "'), '" + engLocalizedValue + "',);";
      let thLocalizedValuesOutput = "'" + variableNames + "': '" + thLocalizedValue + "',";
      let thLocalizedValuesTestOutput = "expect(LanguageLocalizations.getText('" + variableNames + "'), '" + thLocalizedValue + "',);";
      $("textarea#uiStringOutput").val(uiStringOutput);
      $("textarea#engLocalizedValuesOutput").val(engLocalizedValuesOutput);
      $("textarea#engLocalizedValuesTestOutput").val(engLocalizedValuesTestOutput);
      $("textarea#thLocalizedValuesOutput").val(thLocalizedValuesOutput);
      $("textarea#thLocalizedValuesTestOutput").val(thLocalizedValuesTestOutput);
    });

    // clear all fields
    $("#clear").click(function(){
        $('input[type=text]').each(function() {
            $(this).val('');
        });
        $('textarea').each(function() {
            $(this).val('');
        });
    });

    // localize_value.dart
    let localizeValueHeader = "/// Localized value for display with specific language \nclass LocalizedText {\n/// Map of localize and map of ui string key and string value \nstatic const localizedValues = <String, Map<String, String>>{ \n";
    let localizeValueEnd = "},\n};\n}";

    let object = JSON.parse('{"en":{"commonTitle":"EN","commonAppTitle":"This is in English Language.","commonAppContent":"Common Components (EN)","commonSignIn":"Sign in","commonRegistration":"registration","commonLogin":"login","commonPassword":"password","commonReConfirmPassword":"confirm password","commonPasswordFormat":"*********","commonPhoneNumber":"phone number","commonPhoneNumberHintText":"xxx-xxx-xxxx","commonForgotPassword":"forgot password","commonSms":"SMS","commonDone":"done","commonReportProblem":"have problem ","commonContactUs":"contact us","commonTermsAndConditions":"terms and conditions","commonConfirm":"confirm","commonAgreeToTermOfService":"I am agree to terms of condition and acknowledge to ","commonPrivacyAndPolicy":"privacy and policy","commonPersonalInformation":"personal information","commonMedicalRecords":"medical records","commonRequestOtp":"Request OTP","commonAlreadyHasAnAccount":"Have an account?","commonName":"Name Surname","commonNameHintText":"name","commonGender":"gender","commonAge":"age","commonEmail":"email","commonEmailFormat":"xxxxxx@gmail.com","commonNext":"next","commonWeight":"weight","commonHeight":"height","commonKilograms":"kg","commonCentimeters":"cm","commonAccept":"accept","commonNationality":"nationality","commonThai":"Thai","commonUSA":"American","commonTaiwanese":"Taiwanese","commonCongenitalDisease":"congenital disease","commonDiabetes":"Diabetes","commonCVD":"Cardio Vascular Disease","commonHTN":"Hypertension","commonFemale":"female","commonMale":"male","commonAllergen":"allergen","commonPeanuts":"Peanuts","commonDust":"Dust","commonLactose":"Lactose","commonCrustacean":"Crustacean","commonYourHealthInfo":"Personal Health Information","commonBirthDate":"Birthdate","commonAgeString":"{{age}} years old","commonNoCongenitalDisease":"No congenital disease","commonNotDiagnose":"No diagnostic data","commonDot":".","commonDegreeCelsius":"°C","commonEditProfile":"Edit Profile","commonSave":"Save","commonNamePrefix":"name prefix","commonMister":"Mr.","commonMrs":"Mrs.","commonMiss":"Miss","commonFirstname":"first name","commonLastName":"last name","commonInsurance":"insurance","commonEdit":"edit","commonDelete":"delete","commonCancel":"cancel","commonBank":"Bank Name","commonKBank":"Kasikorn Thai","commonSCB":"SCB","commonBBL":"Bangkok Bank","commonBankAccountNumber":"Bank account No.","commonBankAccountName":"Bank account name","commonAIA":"AIA","commonAXA":"Krungthai AXA","commonFWD":"FWD","commonAllianz":"Allianz","tabletMedicine":"tablet","liquidMedicine":"liquid","capsuleMedicine":"capsule","commonMilligram":"milligram","commonMilliliter":"milliliter","commonNameOnCard":"Name on card","commonCardNumber":"Card number","commonExpirationDate":"Expiry date","commonDownload":"Download","commonPrescription":"Prescription","commonOrder":"Order","commonDefaultMethod":"Default","commonAllergicReactions":"allergic reactions"},"th":{"commonTitle":"TH","commonAppTitle":"This is in Thai Language.","commonAppContent":"Common Components (TH)","commonSignIn":"เข้าสู่ระบบ","commonRegistration":"ลงทะเบียน","commonLogin":"เข้าสู่ระบบ","commonPassword":"รหัสผ่าน","commonReConfirmPassword":"ยืนยันรหัสผ่าน","commonPasswordFormat":"*********","commonPhoneNumber":"โทรศัพท์","commonPhoneNumberHintText":"xxx-xxx-xxxx","commonForgotPassword":"ลืมรหัสผ่าน","commonSms":"รหัส SMS 4 หลัก","commonDone":"เสร็จสิ้น","commonReportProblem":"มีปัญหาการใช้งาน","commonContactUs":" ติดต่อเรา","commonTermsAndConditions":"ข้อกำหนดการใช้บริการ","commonConfirm":"ยืนยัน","commonAgreeToTermOfService":"ข้าพเจ้ายอมรับข้อกำหนดการใช้บริการ และ รับทราบถึง","commonPrivacyAndPolicy":"นโยบายความเป็นส่วนตัว","commonPersonalInformation":"ข้อมูลส่วนบุคคล","commonMedicalRecords":"ข้อมูลสุขภาพ","commonRequestOtp":"ขอรหัส OTP","commonAlreadyHasAnAccount":"มีบัญชีผู้ใช้อยู่แล้ว","commonName":"ชื่อ นามสกุล","commonNameHintText":"ชื่อ","commonGender":"เพศโดยกำเนิด","commonAge":"อายุ","commonEmail":"อีเมล","commonEmailFormat":"xxxxxx@gmail.com","commonNext":"ถัดไป","commonWeight":"น้ำหนัก","commonHeight":"ส่วนสูง","commonKilograms":"กก.","commonCentimeters":"ซม.","commonAccept":"ตกลง","commonNationality":"สัญชาติ","commonThai":"ไทย","commonUSA":"อเมริกา","commonTaiwanese":"ไต้หวัน","commonCongenitalDisease":"โรคประจำตัว","commonDiabetes":"โรคเบาหวาน","commonCVD":"โรคหัวใจ","commonHTN":"โรคความดันโลหิตสูง","commonFemale":"หญิง","commonMale":"ชาย","commonAllergen":"สารก่อภูมิแพ้","commonPeanuts":"ถั่ว","commonDust":"ฝุ่น","commonLactose":"น้ำตาลแลกโทส","commonCrustacean":"สัตว์น้ำมีเปลือก","commonYourHealthInfo":"ข้อมูลสุขภาพของท่าน","commonBirthDate":"วัน เดือน ปี เกิด","commonAgeString":"{{age}} ปี","commonNoCongenitalDisease":"ไม่มีโรคประจำตัว","commonNotDiagnose":"ยังไม่วิเคราะห์อาการ","commonDot":".","commonDegreeCelsius":"°C","commonEditProfile":"แก้ไขโปรไฟล์","commonSave":"บันทึก","commonNamePrefix":"คำนำหน้าชื่อ","commonMister":"นาย","commonMrs":"นาง","commonMiss":"นางสาว","commonFirstname":"ชื่อ","commonLastName":"นามสกุล","commonInsurance":"ประกัน","commonEdit":"แก้ไข","commonDelete":"ลบ","commonCancel":"ยกเลิก","commonBank":"ธนาคาร","commonKBank":"ธนาคารกสิกรไทย","commonSCB":"ธนาคารไทยพาณิชย์","commonBBL":"ธนาคารกรุงเทพ","commonBankAccountNumber":"หมายเลขบัญชี","commonBankAccountName":"ชื่อบัญชี","commonAIA":"AIA","commonAXA":"Krungthai AXA","commonFWD":"FWD","commonAllianz":"Allianz","tabletMedicine":"ชนิดเม็ด","liquidMedicine":"ชนิดน้ำ","capsuleMedicine":"ชนิดแคปซูล","commonMilligram":"มิลลิกรัม","commonMilliliter":"มิลลิลิตร","commonNameOnCard":"ชื่อบนบัตร","commonCardNumber":"เลขบัตร","commonExpirationDate":"วันหมดอายุ","commonDownload":"ดาวน์โหลด","commonPrescription":"ใบสั่งยา","commonOrder":"สั่งซื้อ","commonDefaultMethod":"ค่าเริ่มต้น","commonAllergicReactions":"อาการแพ้"}}');

    let output = [];
    for (const key in object) {
        console.log(`${key}\n`);
        for(const innerKey in object[key])
        {
            //console.log(`${innerKey} : ${object[key][innerKey]}`);
            let cellValue = {"variable_name" : innerKey, "thai" :  object['th'][innerKey],"en": object['en'][innerKey]};
            console.log(cellValue);
            output.push(cellValue);
        }


    }

    console.log(output);
    console.log(typeof(output));

    if (typeof XLSX == 'undefined') XLSX = require('xlsx');

    /* make the worksheet */
    var ws = XLSX.utils.json_to_sheet(output);

    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "localize value");

    /* generate an XLSX file */
    XLSX.writeFile(wb,"localize_value.xlsx");

    //console.log(object);
    // ui_strings.dart

    // localize_value_test.dart

    



  });

  // common {"en":{"commonTitle":"EN","commonAppTitle":"This is in English Language.","commonAppContent":"Common Components (EN)","commonSignIn":"Sign in","commonRegistration":"registration","commonLogin":"login","commonPassword":"password","commonReConfirmPassword":"confirm password","commonPasswordFormat":"*********","commonPhoneNumber":"phone number","commonPhoneNumberHintText":"xxx-xxx-xxxx","commonForgotPassword":"forgot password","commonSms":"SMS","commonDone":"done","commonReportProblem":"have problem ","commonContactUs":"contact us","commonTermsAndConditions":"terms and conditions","commonConfirm":"confirm","commonAgreeToTermOfService":"I am agree to terms of condition and acknowledge to ","commonPrivacyAndPolicy":"privacy and policy","commonPersonalInformation":"personal information","commonMedicalRecords":"medical records","commonRequestOtp":"Request OTP","commonAlreadyHasAnAccount":"Have an account?","commonName":"Name Surname","commonNameHintText":"name","commonGender":"gender","commonAge":"age","commonEmail":"email","commonEmailFormat":"xxxxxx@gmail.com","commonNext":"next","commonWeight":"weight","commonHeight":"height","commonKilograms":"kg","commonCentimeters":"cm","commonAccept":"accept","commonNationality":"nationality","commonThai":"Thai","commonUSA":"American","commonTaiwanese":"Taiwanese","commonCongenitalDisease":"congenital disease","commonDiabetes":"Diabetes","commonCVD":"Cardio Vascular Disease","commonHTN":"Hypertension","commonFemale":"female","commonMale":"male","commonAllergen":"allergen","commonPeanuts":"Peanuts","commonDust":"Dust","commonLactose":"Lactose","commonCrustacean":"Crustacean","commonYourHealthInfo":"Personal Health Information","commonBirthDate":"Birthdate","commonAgeString":"{{age}} years old","commonNoCongenitalDisease":"No congenital disease","commonNotDiagnose":"No diagnostic data","commonDot":".","commonDegreeCelsius":"°C","commonEditProfile":"Edit Profile","commonSave":"Save","commonNamePrefix":"name prefix","commonMister":"Mr.","commonMrs":"Mrs.","commonMiss":"Miss","commonFirstname":"first name","commonLastName":"last name","commonInsurance":"insurance","commonEdit":"edit","commonDelete":"delete","commonCancel":"cancel","commonBank":"Bank Name","commonKBank":"Kasikorn Thai","commonSCB":"SCB","commonBBL":"Bangkok Bank","commonBankAccountNumber":"Bank account No.","commonBankAccountName":"Bank account name","commonAIA":"AIA","commonAXA":"Krungthai AXA","commonFWD":"FWD","commonAllianz":"Allianz","tabletMedicine":"tablet","liquidMedicine":"liquid","capsuleMedicine":"capsule","commonMilligram":"milligram","commonMilliliter":"milliliter","commonNameOnCard":"Name on card","commonCardNumber":"Card number","commonExpirationDate":"Expiry date","commonDownload":"Download","commonPrescription":"Prescription","commonOrder":"Order","commonDefaultMethod":"Default","commonAllergicReactions":"allergic reactions"},"th":{"commonTitle":"TH","commonAppTitle":"This is in Thai Language.","commonAppContent":"Common Components (TH)","commonSignIn":"เข้าสู่ระบบ","commonRegistration":"ลงทะเบียน","commonLogin":"เข้าสู่ระบบ","commonPassword":"รหัสผ่าน","commonReConfirmPassword":"ยืนยันรหัสผ่าน","commonPasswordFormat":"*********","commonPhoneNumber":"โทรศัพท์","commonPhoneNumberHintText":"xxx-xxx-xxxx","commonForgotPassword":"ลืมรหัสผ่าน","commonSms":"รหัส SMS 4 หลัก","commonDone":"เสร็จสิ้น","commonReportProblem":"มีปัญหาการใช้งาน","commonContactUs":" ติดต่อเรา","commonTermsAndConditions":"ข้อกำหนดการใช้บริการ","commonConfirm":"ยืนยัน","commonAgreeToTermOfService":"ข้าพเจ้ายอมรับข้อกำหนดการใช้บริการ และ รับทราบถึง","commonPrivacyAndPolicy":"นโยบายความเป็นส่วนตัว","commonPersonalInformation":"ข้อมูลส่วนบุคคล","commonMedicalRecords":"ข้อมูลสุขภาพ","commonRequestOtp":"ขอรหัส OTP","commonAlreadyHasAnAccount":"มีบัญชีผู้ใช้อยู่แล้ว","commonName":"ชื่อ นามสกุล","commonNameHintText":"ชื่อ","commonGender":"เพศโดยกำเนิด","commonAge":"อายุ","commonEmail":"อีเมล","commonEmailFormat":"xxxxxx@gmail.com","commonNext":"ถัดไป","commonWeight":"น้ำหนัก","commonHeight":"ส่วนสูง","commonKilograms":"กก.","commonCentimeters":"ซม.","commonAccept":"ตกลง","commonNationality":"สัญชาติ","commonThai":"ไทย","commonUSA":"อเมริกา","commonTaiwanese":"ไต้หวัน","commonCongenitalDisease":"โรคประจำตัว","commonDiabetes":"โรคเบาหวาน","commonCVD":"โรคหัวใจ","commonHTN":"โรคความดันโลหิตสูง","commonFemale":"หญิง","commonMale":"ชาย","commonAllergen":"สารก่อภูมิแพ้","commonPeanuts":"ถั่ว","commonDust":"ฝุ่น","commonLactose":"น้ำตาลแลกโทส","commonCrustacean":"สัตว์น้ำมีเปลือก","commonYourHealthInfo":"ข้อมูลสุขภาพของท่าน","commonBirthDate":"วัน เดือน ปี เกิด","commonAgeString":"{{age}} ปี","commonNoCongenitalDisease":"ไม่มีโรคประจำตัว","commonNotDiagnose":"ยังไม่วิเคราะห์อาการ","commonDot":".","commonDegreeCelsius":"°C","commonEditProfile":"แก้ไขโปรไฟล์","commonSave":"บันทึก","commonNamePrefix":"คำนำหน้าชื่อ","commonMister":"นาย","commonMrs":"นาง","commonMiss":"นางสาว","commonFirstname":"ชื่อ","commonLastName":"นามสกุล","commonInsurance":"ประกัน","commonEdit":"แก้ไข","commonDelete":"ลบ","commonCancel":"ยกเลิก","commonBank":"ธนาคาร","commonKBank":"ธนาคารกสิกรไทย","commonSCB":"ธนาคารไทยพาณิชย์","commonBBL":"ธนาคารกรุงเทพ","commonBankAccountNumber":"หมายเลขบัญชี","commonBankAccountName":"ชื่อบัญชี","commonAIA":"AIA","commonAXA":"Krungthai AXA","commonFWD":"FWD","commonAllianz":"Allianz","tabletMedicine":"ชนิดเม็ด","liquidMedicine":"ชนิดน้ำ","capsuleMedicine":"ชนิดแคปซูล","commonMilligram":"มิลลิกรัม","commonMilliliter":"มิลลิลิตร","commonNameOnCard":"ชื่อบนบัตร","commonCardNumber":"เลขบัตร","commonExpirationDate":"วันหมดอายุ","commonDownload":"ดาวน์โหลด","commonPrescription":"ใบสั่งยา","commonOrder":"สั่งซื้อ","commonDefaultMethod":"ค่าเริ่มต้น","commonAllergicReactions":"อาการแพ้"}}
  // dart code
  // print(JsonEncoder().convert(localizedValues));
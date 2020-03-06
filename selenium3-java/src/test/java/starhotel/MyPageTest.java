package starhotel;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static starhotel.Utils.BASE_URL;

import java.time.LocalDate;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.openqa.selenium.WebDriver;
import starhotel.pages.LoginPage;
import starhotel.pages.SignupPage;
import starhotel.pages.SignupPage.Rank;

@TestMethodOrder(OrderAnnotation.class)
@DisplayName("マイページテスト")
class MyPageTest {

  private static WebDriver driver;

  @BeforeAll
  static void initAll() {
    driver = Utils.createWebDriver();
  }

  @AfterEach
  void tearDown() {
    driver.manage().deleteAllCookies();
  }

  @AfterAll
  static void tearDownAll() {
    driver.quit();
  }

  @Test
  @Order(1)
  @DisplayName("定義済みユーザの情報が表示されること_ichiro")
  void testMyPageExistUserOne() {
    driver.get(BASE_URL + "/login.html");

    var loginPage = new LoginPage(driver);
    var myPage = loginPage.doLogin("ichiro@example.com", "password");

    assertAll("マイページ表示項目",
        () -> assertEquals("ichiro@example.com", myPage.getEmail()),
        () -> assertEquals("山田一郎", myPage.getUsername()),
        () -> assertEquals("プレミアム会員", myPage.getRank()),
        () -> assertEquals("東京都豊島区池袋", myPage.getAddress()),
        () -> assertEquals("01234567891", myPage.getTel()),
        () -> assertEquals("男性", myPage.getGender()),
        () -> assertEquals("未登録", myPage.getBirthday()),
        () -> assertEquals("受け取る", myPage.getNotification())
    );
  }

  @Test
  @Order(2)
  @DisplayName("定義済みユーザの情報が表示されること_sakura")
  void testMyPageExistUserTwo() {
    driver.get(BASE_URL + "/login.html");

    var loginPage = new LoginPage(driver);
    var myPage = loginPage.doLogin("sakura@example.com", "pass1234");

    assertAll("マイページ表示項目",
        () -> assertEquals("sakura@example.com", myPage.getEmail()),
        () -> assertEquals("松本さくら", myPage.getUsername()),
        () -> assertEquals("一般会員", myPage.getRank()),
        () -> assertEquals("神奈川県横浜市鶴見区大黒ふ頭", myPage.getAddress()),
        () -> assertEquals("未登録", myPage.getTel()),
        () -> assertEquals("女性", myPage.getGender()),
        () -> assertEquals("2000-04-01", myPage.getBirthday()),
        () -> assertEquals("受け取らない", myPage.getNotification())
    );
  }

  @Test
  @Order(3)
  @DisplayName("定義済みユーザの情報が表示されること_jun")
  void testMyPageExistUserThree() {
    driver.get(BASE_URL + "/login.html");

    var loginPage = new LoginPage(driver);
    var myPage = loginPage.doLogin("jun@example.com", "pa55w0rd!");

    assertAll("マイページ表示項目",
        () -> assertEquals("jun@example.com", myPage.getEmail()),
        () -> assertEquals("林潤", myPage.getUsername()),
        () -> assertEquals("プレミアム会員", myPage.getRank()),
        () -> assertEquals("大阪府大阪市北区梅田", myPage.getAddress()),
        () -> assertEquals("01212341234", myPage.getTel()),
        () -> assertEquals("その他", myPage.getGender()),
        () -> assertEquals("1988-12-17", myPage.getBirthday()),
        () -> assertEquals("受け取らない", myPage.getNotification())
    );
  }

  @Test
  @Order(4)
  @DisplayName("定義済みユーザの情報が表示されること_yoshiki")
  void testMyPageExistUserFour() {
    driver.get(BASE_URL + "/login.html");

    var loginPage = new LoginPage(driver);
    var myPage = loginPage.doLogin("yoshiki@example.com", "pass-pass");

    assertAll("マイページ表示項目",
        () -> assertEquals("yoshiki@example.com", myPage.getEmail()),
        () -> assertEquals("木村良樹", myPage.getUsername()),
        () -> assertEquals("一般会員", myPage.getRank()),
        () -> assertEquals("未登録", myPage.getAddress()),
        () -> assertEquals("01298765432", myPage.getTel()),
        () -> assertEquals("未登録", myPage.getGender()),
        () -> assertEquals("1992-08-31", myPage.getBirthday()),
        () -> assertEquals("受け取る", myPage.getNotification())
    );
  }

  @Test
  @Order(5)
  @DisplayName("新規登録したユーザの情報が表示されること")
  void testMyPageNewUser() {
    driver.get(BASE_URL + "/signup.html");

    var signupPage = new SignupPage(driver);
    signupPage.setEmail("new-user@gmail.com");
    signupPage.setPassword("11111111");
    signupPage.setPasswordConfirmation("11111111");
    signupPage.setUsername("田中花子");
    signupPage.selectRank(Rank.NORMAL);
    signupPage.setAddress("神奈川県横浜市港区");
    signupPage.setTel("09876543211");
    signupPage.selectGender("女性");
    signupPage.setBirthday(LocalDate.parse("2000-01-01"));
    signupPage.checkNotification(false);
    var myPage = signupPage.goToMyPage();

    assertAll("マイページ表示項目",
        () -> assertEquals("new-user@gmail.com", myPage.getEmail()),
        () -> assertEquals("田中花子", myPage.getUsername()),
        () -> assertEquals("一般会員", myPage.getRank()),
        () -> assertEquals("神奈川県横浜市港区", myPage.getAddress()),
        () -> assertEquals("09876543211", myPage.getTel()),
        () -> assertEquals("女性", myPage.getGender()),
        () -> assertEquals("2000-01-01", myPage.getBirthday()),
        () -> assertEquals("受け取らない", myPage.getNotification())
    );
  }

}
//** SERVER CONFIG 
const webdriver = require('selenium-webdriver');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const driver = new webdriver.Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build();

describe('Trendyol test', function () {
    it("Hedef URL 'ye girilir", async () => {
        await driver.get('http://www.trendyol.com')
    })
    it("Hedef ürün aratılır. En uygun fiyatlısı bulunur. Sepete eklenir.", async () => {
        var hedefUrun = "Iphone 14 Kılıf"
        var filtre = "En düşük fiyat"
        await driver.sleep(1500)
        // modal-close
        await driver.findElement(By.className("modal-close")).click()
        await driver.findElement(By.className("N4M8bfaJ")).click()
        await driver.findElement(By.className("V8wbcUhU")).sendKeys(hedefUrun, Key.ENTER)
        await driver.sleep(500)
        var filtreSelectBox = await driver.findElement(By.className("selected-order"))
        await driver.executeScript("arguments[0].click();", filtreSelectBox)
        await driver.sleep(500)
        var hedefFiltre = await driver.findElement(By.xpath(`//span[contains(text(),'${filtre}')]`))
        await driver.executeScript("arguments[0].click();", hedefFiltre)
        await driver.sleep(2500)
        var ilkElement = await driver.findElement(By.xpath("//div[1]/div[1]/div[1]/a[1]/div[1]/div[2]/div[2]"))
        await driver.executeScript("arguments[0].click();", ilkElement)
        await driver.sleep(2000)
        // var parent = await driver.getWindowHandle();
        var windows = await driver.getAllWindowHandles();
        await driver.switchTo().window(windows[1]); // Window handle yeni sekmeye geçtiği için
        await driver.findElement(By.className("add-to-basket")).click()
        await driver.sleep(2000)
    })
    it("Driver kapanır", async () => {
        await driver.quit()
    })
})


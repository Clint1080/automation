
const {By, Builder, Capabilities} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()



beforeAll(async () => {
  await (
    await driver
  ).get("http://localhost:5500/movieList/index.html");
});

afterAll(async () => {
  await (await driver).quit();
});

describe("Movie list tests", () => {
    
    test('Should add a movie to the page', async () => {
        let addMovieInput = await driver.findElement(By.name('q'))
        await addMovieInput.sendKeys('The Matrix\n')
        await driver.sleep(1000)
        
        addMovieInput = await driver.findElement(By.name('q'))
        await addMovieInput.clear()
        await addMovieInput.sendKeys('Speed Racer\n')
        await driver.sleep(1000)
    })

    test('Should cross off a movie', async () => {
        let crossOffMovie = await (await driver).findElement(By.xpath('//ul/li/span'))
        await crossOffMovie.click()
        await driver.sleep(1000)
    })

    test('Should delete a movie by title', async () => {
        let deleteMovie = await (
          await driver
        ).findElement(By.xpath(`//*[@id="TheMatrix"]`));
        await deleteMovie.click()
        await driver.sleep(1000)
    })

    // This one only works because we are adding two movies and then deleting one. So there is only one ul li span to select.  If we added more movies we would need to be more specific
    test('Should return the correct movie title', async () => {
        let checkTitle = await (await driver).findElement(By.xpath('//ul/li/span')).getAttribute('innerText')
        expect(checkTitle).toBe('Speed Racer')
        await driver.sleep(1000)
    })
})


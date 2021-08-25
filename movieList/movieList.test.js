
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
        await driver.sleep(3000)
        
        addMovieInput = await driver.findElement(By.name('q'))
        await addMovieInput.clear()
        await addMovieInput.sendKeys('Speed Racer\n')
        await driver.sleep(3000)
    })

    test('Should cross off a movie', async () => {
        let crossOffMovie = await (await driver).findElement(By.name('q'))
    })

})


import { addWeather } from '../js/formatter'

describe("addWeather function", () => {
  test("check that it is a function", () => {
    expect(typeof addWeather).toBe("function")
  })
})
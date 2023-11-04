import { describe, test, expect } from "vitest"

import { getStar, setStar } from "../src/components/Star"

const test_id = "test_id"

describe("local storage operations", () => {
  test("getting item from local storage initially works fine", () => {
    const result = getStar(test_id)
    expect(result).toBeFalsy()
    expect(localStorage.getItem("starred")).toBeNull()
  })

  test("set an item to local storage works fine", () => {
    setStar(test_id, true)
    expect(localStorage.getItem("starred")).toEqual(`{"test_id":true}`)
  })
})

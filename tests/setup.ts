import { afterEach } from "vitest"
import { cleanup, configure } from "@testing-library/react"
// import matchers from "@testing-library/jest-dom/matchers"
// import * as matchers from "vitest-dom/matchers"

import "vitest-dom/extend-expect"

// import "@testing-library/jest-dom/vitest/"

// to match dhis2 ui library
configure({ testIdAttribute: "data-test" })

// expect.extend(matchers)

afterEach(() => {
  cleanup()
})

import React from "react"
import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"

import App from "../src/App"
import AppContextHolder from "../src/AppContext"
import { DASHBOARDS } from "../src/mocks/"

const TestApp = () => (
  <AppContextHolder>
    <App />
  </AppContextHolder>
)

const server = setupServer(
  http.get(
    "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json",
    ({ request, params, cookies }) => {
      return HttpResponse.json(DASHBOARDS)
    }
  )
)

// mock server enpoints
// server.events.on("request:start", ({ request }) => {
//   console.log("MSW intercepted:", request.method, request.url)
// })

// server.events.on("response:mocked", ({ request, requestId, response }) => {
//   console.log(
//     "%s %s received %s %s",
//     request.method,
//     request.url,
//     response.status,
//     response.statusText
//   )
// })

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("App", () => {
  test("heading is shown fine", async () => {
    render(<TestApp />)
    // wait for the mock request to complete
    await waitFor(() => {
      const appHeading = screen.getByTestId("app-heading")
      expect(appHeading).toBeInTheDocument()
    })
  })
})

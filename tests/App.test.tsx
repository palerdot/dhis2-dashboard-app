import React from "react"
import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest"
import {
  act,
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"

import App from "../src/App"
import AppContextHolder from "../src/AppContext"
import { DASHBOARDS, getDashboardData } from "../src/mocks/"

const TestApp = () => (
  <AppContextHolder>
    <App />
  </AppContextHolder>
)

const server = setupServer()
server.use(
  http.get(
    "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json",
    ({ request, params, cookies }) => {
      return HttpResponse.json(DASHBOARDS)
    }
  ),
  // first dashboard content
  http.get(
    "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/nghVC4wtyzi.json",
    // @ts-ignore
    () => {
      return HttpResponse.json(getDashboardData("nghVC4wtyzi"))
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
    await waitFor(async () => {
      const appHeading = screen.getByTestId("app-heading")
      expect(appHeading).toBeInTheDocument()

      // we should have the 5 dashboards
      // loop through id and verify if there are 5 dashboards
      DASHBOARDS.dashboards.forEach(({ id }) => {
        const dashboard = screen.getByTestId(`dashboard-${id}`)
        expect(dashboard).toBeInTheDocument()
      })

      const contents = await screen.getAllByTestId("dashboard-content")
      // only one dashboard content should be visible
      expect(contents).toHaveLength(1)

      // verify open dashboard items
      let viz_items = await screen.getAllByTestId("viz-item")
      let map_items = await screen.getAllByTestId("map-item")
      let text_items = await screen.getAllByTestId("text-item")

      const active_dashboard = getDashboardData(DASHBOARDS.dashboards[0].id)

      // all items are displayed
      expect(active_dashboard.dashboardItems.length).toEqual(
        viz_items.length + map_items.length + text_items.length
      )
    })

    // this should open the select options
    const filter = screen.getByTestId("select-filter")
    const input = within(filter).getByTestId("dhis2-uicore-select-input")
    // fire the click event on the select
    await act(async () => {
      await fireEvent.click(input)
    })

    const viz_option = await screen.getByTestId("select-option-viz")
    expect(viz_option).toBeInTheDocument()

    // click visualization filter
    await act(async () => {
      await fireEvent.click(viz_option)
    })

    let viz_items = await screen.queryAllByTestId("viz-item")
    let map_items = await screen.queryAllByTestId("map-item")
    let text_items = await screen.queryAllByTestId("text-item")

    // only viz items present
    expect(viz_items.length).toEqual(8)
    // other items are hidden
    expect(map_items.length).toEqual(0)
    expect(text_items.length).toEqual(0)
  })
})

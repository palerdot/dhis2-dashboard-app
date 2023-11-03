import { useState, useEffect, useContext } from "react"
import { CircularLoader } from "@dhis2/ui"

import { AppContext } from "../../AppContext"
import Dashboard from "../../components/Dashboard"
import SelectFilter from "../../components/SelectFilter"

export type IDashBoard = {
  displayName: string
  id: string
  starred: boolean
}

function HomeScreen() {
  const { activeDashboard, setActiveDashboard } = useContext(AppContext)
  const [dashboards, setDashboards] = useState<Array<IDashBoard>>()

  // fetch dashboards on load
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json"
    )
      .then(response => {
        return response.json()
      })
      .then(payload => {
        const dashboards = payload.dashboards
        setDashboards(dashboards)
        // set first dashboard as active
        setActiveDashboard(dashboards[0]?.id)
        // construct starred details
        let starred: { [key: string]: string } = {}
        dashboards.forEach((d: any) => {
          starred[d.id] = d.starred
        })
        // set initial value only for the first time app loads
        const isFirstTime = localStorage.getItem("starred") === null
        if (isFirstTime) {
          localStorage.setItem("starred", JSON.stringify(starred))
        }
      })
  }, [setDashboards, setActiveDashboard])

  if (dashboards === undefined) {
    return (
      <div className="flex items-center justify-center w-full">
        <CircularLoader />
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4 w-2/3 mx-auto">
      <div className="flex flex-row space-between my-4">
        <div className="text-xl font-medium" data-test="app-heading">
          {"Dashboards"}
        </div>
        <div className="w-64 ml-auto">
          <SelectFilter />
        </div>
      </div>
      {dashboards.map(dashboard => (
        <Dashboard
          key={dashboard.id}
          {...dashboard}
          onClick={() => {
            // if this is the active dashboard, close it
            // if not active dashboard, make this as active
            setActiveDashboard(
              activeDashboard === dashboard.id ? undefined : dashboard.id
            )
          }}
          isOpen={activeDashboard === dashboard.id}
        />
      ))}
    </div>
  )
}

export default HomeScreen

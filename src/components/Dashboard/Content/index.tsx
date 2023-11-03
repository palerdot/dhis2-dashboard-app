import { useContext } from "react"
import {
  IconVisualizationColumn24,
  IconWorld24,
  IconFileDocument24,
} from "@dhis2/ui"

import { AppContext, Filter } from "../../../AppContext"

export type IContent = {
  id: string
  displayName: string
  dashboardItems: Array<DashboardItem>
}

type DashboardItem = VizItem | MapItem | TextItem

type VizItem = {
  id: string
  type: "VISUALIZATION"
  visualization: {
    id: string
    name: string
  }
}

type MapItem = {
  id: string
  type: "MAP"
  map: {
    id: string
    name: string
  }
}

type TextItem = {
  id: string
  type: "TEXT"
  text: string
}

function Content({ dashboardItems }: IContent) {
  return (
    <div className="flex flex-col w-full">
      {dashboardItems.map(item => (
        <DashboardItem key={item.id} {...item} />
      ))}
    </div>
  )
}

export default Content

function DashboardItem(item: DashboardItem) {
  const { filter } = useContext(AppContext)
  const rowClass = "flex-row items-start my-1 space-x-2 text-left text-sm"
  // visualization type
  const isViz = item.type === "VISUALIZATION"
  if (isViz) {
    const showViz = filter === Filter.All || filter === Filter.Viz
    return (
      <div className={` ${showViz ? "flex" : "hidden"} ${rowClass}`}>
        <div>
          <IconVisualizationColumn24 />
        </div>
        <div>{item.visualization.name}</div>
      </div>
    )
  }

  // map type
  const isMap = item.type === "MAP"
  if (isMap) {
    const showMap = filter === Filter.All || filter === Filter.Map
    return (
      <div className={` ${showMap ? "flex" : "hidden"} ${rowClass}`}>
        <div>
          <IconWorld24 />
        </div>
        <div>{item.map.name}</div>
      </div>
    )
  }

  // text type
  const isText = item.type === "TEXT"
  if (isText) {
    const showText = filter === Filter.All || filter === Filter.Text
    return (
      <div className={` ${showText ? "flex" : "hidden"} ${rowClass}`}>
        <div>
          <IconFileDocument24 />
        </div>
        <div>{item.text}</div>
      </div>
    )
  }

  return null
}

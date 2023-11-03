import { useState, useEffect } from "react"
import {
  Card,
  CircularLoader,
  IconChevronUp24,
  IconChevronDown24,
} from "@dhis2/ui"

import { IDashBoard } from "../../pages/HomeScreen"
import Content, { IContent } from "./Content"
import Star from "../Star"

interface Props extends IDashBoard {
  onClick: () => void
  isOpen: boolean
}

function Dashboard({ id, displayName, onClick, isOpen }: Props) {
  // content is not loaded by default; it is only loaded when the user opens the dashboard/card
  const [content, setContent] = useState<IContent | undefined>()

  useEffect(() => {
    // load content from api if the dashboard is open and if content is not loaded
    if (isOpen === true && content === undefined) {
      fetch(
        `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${id}.json`
      )
        .then(res => res.json())
        .then(payload => {
          const { id, displayName, dashboardItems } = payload
          setContent({
            id,
            displayName,
            dashboardItems,
          })
        })
    }
  }, [id, isOpen, content, setContent])

  return (
    <Card className="flex flex-col">
      <div
        className="flex flex-row items-center space-between cursor-pointer p-4 font-medium text-xl hover:bg-slate-50"
        onClick={onClick}
      >
        <div>{displayName}</div>
        <div className="ml-auto flex flex-row space-x-4">
          <Star id={id} />
          {isOpen ? <IconChevronUp24 /> : <IconChevronDown24 />}
        </div>
      </div>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col h-auto p-4 items-center`}
      >
        {content === undefined ? <CircularLoader /> : <Content {...content} />}
      </div>
    </Card>
  )
}

export default Dashboard

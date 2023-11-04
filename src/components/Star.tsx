import { useState } from "react"
import { IconStar24, IconStarFilled24 } from "@dhis2/ui"

function Star({ id }: { id: string }) {
  const [starred, setStarred] = useState(getStar(id))

  return (
    <div
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()

        const status = !starred
        setStarred(status)
        setStar(id, status)
      }}
    >
      {starred ? <IconStarFilled24 /> : <IconStar24 />}
    </div>
  )
}

export default Star

// helper function to get/set starred details to localstorage
export function getStar(id: string): boolean {
  const starred = localStorage.getItem("starred")

  if (!starred) {
    return false
  }

  const parsed = JSON.parse(starred)
  return parsed[id]
}

export function setStar(id: string, status: boolean) {
  const starred = localStorage.getItem("starred")
  const parsed = starred ? JSON.parse(starred) : {}

  parsed[id] = status

  localStorage.setItem("starred", JSON.stringify(parsed))
}

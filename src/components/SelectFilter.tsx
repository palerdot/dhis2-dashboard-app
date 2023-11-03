import { useContext } from "react"
import { SingleSelect, SingleSelectOption } from "@dhis2/ui"

import { AppContext, Filter } from "../AppContext"

function SelectFilter() {
  const { filter, setFilter } = useContext(AppContext)

  return (
    <SingleSelect
      className="select"
      selected={filter}
      onChange={(value: { selected: Filter }) => {
        setFilter(value.selected)
      }}
    >
      <SingleSelectOption
        label={"All Items"}
        value={Filter.All}
        active={filter === Filter.All}
      />
      <SingleSelectOption
        label={"Visualization"}
        value={Filter.Viz}
        active={filter === Filter.Viz}
      />
      <SingleSelectOption
        label={"Map"}
        value={Filter.Map}
        active={filter === Filter.Map}
      />
      <SingleSelectOption
        label={"Text"}
        value={Filter.Text}
        active={filter === Filter.Text}
      />
    </SingleSelect>
  )
}

export default SelectFilter

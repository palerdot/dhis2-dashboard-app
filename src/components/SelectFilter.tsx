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
      dataTest={"select-filter"}
    >
      <SingleSelectOption
        label={"All Items"}
        value={Filter.All}
        active={filter === Filter.All}
        dataTest={"select-option-all"}
      />
      <SingleSelectOption
        label={"Visualization"}
        value={Filter.Viz}
        active={filter === Filter.Viz}
        dataTest={"select-option-viz"}
      />
      <SingleSelectOption
        label={"Map"}
        value={Filter.Map}
        active={filter === Filter.Map}
        dataTest={"select-option-map"}
      />
      <SingleSelectOption
        label={"Text"}
        value={Filter.Text}
        active={filter === Filter.Text}
        dataTest={"select-option-text"}
      />
    </SingleSelect>
  )
}

export default SelectFilter

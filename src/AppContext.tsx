import { createContext, useState } from "react"

export enum Filter {
  All = "all",
  Viz = "visualization",
  Map = "map",
  Text = "text",
}

type ContextValue = {
  filter: Filter
  setFilter: (filter: Filter) => void

  activeDashboard?: string
  setActiveDashboard: (id?: string) => void
}

const defaultValue: ContextValue = {
  filter: Filter.All,
  setFilter: () => {},

  activeDashboard: undefined,
  setActiveDashboard: () => {},
}

type Props = {
  children: React.ReactElement
}

export const AppContext = createContext(defaultValue)

function AppContextHolder({ children }: Props) {
  const [filter, setFilter] = useState<Filter>(Filter.All)
  const [activeDashboard, setActiveDashboard] = useState<string | undefined>()

  return (
    <AppContext.Provider
      value={{
        filter,
        setFilter,
        activeDashboard,
        setActiveDashboard,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextHolder

# DHIS2 dashboard app

The dashboard app is bootstrapped with `vite` `react-ts` template.

Stack
- React + Typescript
- Tailwind for styling
- dhis2 UI library for ui components
- vitest + @testing-library/react + msw  for testing

### Installation

```shell
pnpm install
# run the local server
pnpm run dev
```

### Code

Some pointers on the code

- Dashboard data is loaded only once when the user **first** opens the dashboard. This makes sure dashboards that are not open does not fetch data from the api. Subsequent open/close actions on dashboard does not repeatedly call the apis.
- star data is locally persisted on local storage
- When filters are applied items are hidden instead of removing from dom to prevent rerenders when filters change.


### Testing

Tests are present in `tests` folder and tested with `vitest + @testing-library/react + msw  for testing`.

`App.test.tsx` file tests the following

- App is loaded fine and dashboard api data is loaded and all 5 dashboards are shown
- Only one dashboard content is shown
- Visible dashboard lists all the items with the default `All` filter
- When filter is changed to `visualization` items, only visualization items are visible, and map/text items are not shown/hidden.

`index.test.ts` has tests for local storage interfaces.


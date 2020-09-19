import React from "react";
import { TextField, useMediaQuery, useTheme } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import LocationsData from "../data/city.list.min.json";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import { useTypedSelector } from "../../allReducers";
import { Location } from "../types";

// Crazy Local Location Selector using Provided Locations from OpenWeatherMap. Had to use React-Window to Help render the insanely...
// ...large amount of data, there is most likely a way better way to do this, however leaving as if for now as is outside of scope, ...
// Locations should definetly be stored in a back end and there is potentionally some API that has these.

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + 8,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactNode) => {
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * 8}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

interface LocationSelectorProps {
  setLocation: (location: Location) => void;
}

// Makes use of the Material Design AutoComplete Dropdown https://material-ui.com/components/autocomplete/

export default function LocationSelector({ setLocation }: LocationSelectorProps) {
  const locationData = LocationsData as Location[];
  const currentLocation = useTypedSelector((store) => store.weather.currentLocation);

  const onLocationChange = (value: Location | null) => {
    if (value !== null) {
      setLocation(value);
    }
  };

  return (
    <div>
      <Autocomplete
        value={currentLocation}
        getOptionSelected={(option, value) => option.id === value.id}
        onChange={(event, value, reason) => onLocationChange(value)}
        options={locationData as Location[]}
        ListboxComponent={
          ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>
        }
        getOptionLabel={(option) => `${option.name}, ${option.country}`}
        renderOption={(option) => (
          <React.Fragment>{`${option.name}, ${option.country}`}</React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a Location"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  );
}

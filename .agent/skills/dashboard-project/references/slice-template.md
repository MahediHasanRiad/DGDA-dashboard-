# Redux Slice Template

Copy-paste this to create a new Redux Toolkit slice.

## File: `src/store/<feature>Slice.ts`

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface YourFeatureState {
  // define your state shape here
  value: string | null;
}

const initialState: YourFeatureState = {
  value: null,
};

const yourFeatureSlice = createSlice({
  name: "yourFeature",
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    clearValue(state) {
      state.value = null;
    },
  },
});

export const { setValue, clearValue } = yourFeatureSlice.actions;
export default yourFeatureSlice.reducer;
```

## Register in `src/store/store.ts`

```ts
import yourFeatureReducer from "./yourFeatureSlice";

export const store = configureStore({
  reducer: {
    // ...existing reducers
    yourFeature: yourFeatureReducer,
  },
});
```

## Typed usage in a component

```tsx
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { setValue } from "@/store/yourFeatureSlice";

const dispatch = useDispatch<AppDispatch>();
const value = useSelector((state: RootState) => state.yourFeature.value);
```

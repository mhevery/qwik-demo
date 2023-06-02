/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { Slider } from "@mui/material";

export default qwikify$(Slider, { eagerness: "hover" });

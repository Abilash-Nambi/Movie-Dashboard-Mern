import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { GENRE_API_URL } from "../constants/const";
import axios from "axios";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  setSelectedGenre,
  selectedGenre,
  fetchFilteredMovies,
}) {
  const theme = useTheme();

  const [allGenre, setAllGenres] = React.useState([]);
  console.log("🚀 + MultipleSelectChip + allGenre:", selectedGenre);

  React.useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await axios.get(GENRE_API_URL);
      setAllGenres(res.data.data);
    } catch (error) {
      console.log("🚀 + fetchGenres + error:", error);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedGenre(typeof value === "string" ? value.split(",") : value);
    //fetchFilteredMovies();
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Select Genre</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedGenre}
          onChange={(e) => handleChange(e)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {allGenre.map((name) => (
            <MenuItem
              key={name._id}
              value={name.title}
              style={getStyles(name, selectedGenre, theme)}
            >
              {name.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
